class PurchaseManager {
    constructor() {
        this.baseRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
        };
        this.allowedCardNetworks = ["AMEX", "DISCOVER","NUBANK", "INTERAC", "ELO", "JCB", "MASTERCARD", "VISA"];
        this.allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
        this.tokenizationSpecification = {
            type: "PAYMENT_GATEWAY",
            parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleGatewayMerchantId",
            },
        };
        this.libraryLoaded = Boolean(window.google?.payments?.api);
        this.readinessPromise = null;
    }

    getBaseCardPaymentMethod() {
        return {
            type: "CARD",
            parameters: {
                allowedAuthMethods: this.allowedCardAuthMethods,
                allowedCardNetworks: this.allowedCardNetworks,
            },
        };
    }

    getCardPaymentMethod() {
        return Object.assign({}, this.getBaseCardPaymentMethod(), {
            tokenizationSpecification: this.tokenizationSpecification,
        });
    }

    getPaymentsClient() {
        if (!this.paymentsClient && window.google?.payments?.api) {
            this.paymentsClient = new google.payments.api.PaymentsClient({
                environment: "TEST",
            });
        }

        return this.paymentsClient;
    }

    async ensureReadiness() {
        if (!this.libraryLoaded) {
            return false;
        }

        if (!this.readinessPromise) {
            const paymentsClient = this.getPaymentsClient();
            if (!paymentsClient) {
                return false;
            }

            this.readinessPromise = paymentsClient
                .isReadyToPay(
                    Object.assign({}, this.baseRequest, {
                        allowedPaymentMethods: [this.getBaseCardPaymentMethod()],
                    })
                )
                .then((response) => Boolean(response.result))
                .catch((error) => {
                    console.error("Erro ao validar Google Pay:", error);
                    return false;
                });
        }

        return this.readinessPromise;
    }

    buildPaymentDataRequest(pokemon) {
        return Object.assign({}, this.baseRequest, {
            allowedPaymentMethods: [this.getCardPaymentMethod()],
            merchantInfo: {
                merchantName: "Pokedex Grunt Store",
            },
            transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: Number(pokemon.price || 0).toFixed(2),
                currencyCode: "BRL",
                countryCode: "BR",
            },
            emailRequired: true,
        });
    }

    async renderPurchaseButton(pokemon, modalContent) {
        const container = modalContent?.querySelector("[data-google-pay-container]");
        const statusElement = modalContent?.querySelector("[data-purchase-status]");
        if (!container || !statusElement) {
            return;
        }

        container.innerHTML = "";
        container.dataset.pokemonId = String(pokemon.id);
        statusElement.className = "purchase-status";
        statusElement.textContent = this.libraryLoaded
            ? "Validando disponibilidade do Google Pay..."
            : "Google Pay carregando para checkout de teste...";

        if (!this.libraryLoaded) {
            return;
        }

        const isAvailable = await this.ensureReadiness();
        if (!container.isConnected) {
            return;
        }

        if (!isAvailable) {
            statusElement.textContent = "Google Pay não está disponível neste navegador ou perfil para este teste.";
            return;
        }

        const button = this.getPaymentsClient().createButton({
            allowedPaymentMethods: [this.getBaseCardPaymentMethod()],
            buttonType: "buy",
            buttonColor: "black",
            buttonRadius: 8,
            onClick: () => this.startCheckout(pokemon, statusElement),
        });

        container.appendChild(button);
        statusElement.textContent = "Checkout pronto para teste.";
    }

    async startCheckout(pokemon, statusElement) {
        const paymentsClient = this.getPaymentsClient();
        if (!paymentsClient) {
            statusElement.className = "purchase-status error";
            statusElement.textContent = "Google Pay ainda não foi inicializado.";
            return;
        }

        try {
            statusElement.className = "purchase-status";
            statusElement.textContent = `Abrindo checkout de ${this.capitalizeFirst(pokemon.name)}...`;

            const paymentData = await paymentsClient.loadPaymentData(
                this.buildPaymentDataRequest(pokemon)
            );

            this.persistPurchase(pokemon, paymentData);
            statusElement.className = "purchase-status success";
            statusElement.textContent = this.buildSuccessMessage(pokemon, paymentData);
        } catch (error) {
            if (error?.statusCode === "CANCELED") {
                statusElement.className = "purchase-status";
                statusElement.textContent = "Checkout cancelado pelo usuário.";
                return;
            }

            console.error("Erro ao abrir checkout Google Pay:", error);
            statusElement.className = "purchase-status error";
            statusElement.textContent = "Não foi possível concluir o teste de compra com Google Pay.";
        }
    }

    persistPurchase(pokemon, paymentData) {
        const purchases = JSON.parse(localStorage.getItem("pokedex-purchases") || "[]");
        const paymentInfo = paymentData?.paymentMethodData?.info || {};

        purchases.unshift({
            pokemonId: pokemon.id,
            pokemonName: pokemon.name,
            price: pokemon.price,
            purchasedAt: new Date().toISOString(),
            cardNetwork: paymentInfo.cardNetwork || "Google Pay",
            cardDetails: paymentInfo.cardDetails || "teste",
        });

        localStorage.setItem("pokedex-purchases", JSON.stringify(purchases.slice(0, 20)));
    }

    buildSuccessMessage(pokemon, paymentData) {
        const paymentInfo = paymentData?.paymentMethodData?.info || {};
        const cardLabel = paymentInfo.cardNetwork && paymentInfo.cardDetails
            ? `${paymentInfo.cardNetwork} final ${paymentInfo.cardDetails}`
            : "Google Pay TEST";

        return `${this.capitalizeFirst(pokemon.name)} comprado por ${this.formatPrice(pokemon.price)} com ${cardLabel}.`;
    }

    formatPrice(price) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price || 0);
    }

    capitalizeFirst(value = "") {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    handleGooglePayLoaded() {
        this.libraryLoaded = true;

        const modalContent = document.getElementById("modal-content");
        const pokemonId = Number(modalContent?.dataset.purchasePokemonId || 0);
        const pokemon = window.pokemonManager?.findPokemonById?.(pokemonId);

        if (pokemon && modalContent) {
            this.renderPurchaseButton(pokemon, modalContent);
        }
    }
}

window.onGooglePayLoaded = () => {
    if (window.purchaseManager) {
        window.purchaseManager.handleGooglePayLoaded();
    }
};