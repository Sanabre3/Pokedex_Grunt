module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // =====================
    // LESS - CORRIGIDO
    // =====================
    less: {
      dev: {
        options: {
          paths: ["src/styles"], // Adicionar paths
          compress: false,
          sourceMap: true,
          sourceMapFilename: "dev/styles/main.css.map"
        },
        files: {
          "dev/styles/main.css": "src/styles/main.less",
        },
      },
      dist: {
        options: { 
          compress: true,
          paths: ["src/styles"]
        },
        files: {
          "dist/styles/main.min.css": "src/styles/main.less",
        },
      },
    },

    // =====================
    // COPY JS
    // =====================
    copy: {
      dev: {
        expand: true,
        cwd: "src/scripts/",
        src: "**/*.js",
        dest: "dev/scripts/",
      },
      dist: {
        expand: true,
        cwd: "src/scripts/",
        src: "**/*.js",
        dest: "dist/scripts/",
      },
    },

    // =====================
    // HTML REPLACEMENT
    // =====================
    replace: {
      dev: {
        options: {
          prefix: '@@',
          patterns: [
            { match: 'ENDERECO_DO_CSS', replacement: 'styles/main.css' },
            { match: 'ENDERECO_DO_JS_API', replacement: 'scripts/api.js' },
            { match: 'ENDERECO_DO_JS_POKEMON', replacement: 'scripts/pokemon.js' },
            { match: 'ENDERECO_DO_JS_FAVORITES', replacement: 'scripts/favorites.js' },
            { match: 'ENDERECO_DO_JS_PURCHASE', replacement: 'scripts/purchase.js' },
            { match: 'ENDERECO_DO_JS_MAIN', replacement: 'scripts/main.js' }
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['index.html'],
            dest: 'dev/'
          }
        ]
      },
      dist: {
        options: {
          prefix: '@@',
          patterns: [
            { match: 'ENDERECO_DO_CSS', replacement: 'styles/main.min.css' },
            { match: 'ENDERECO_DO_JS_API', replacement: 'scripts/api.min.js' },
            { match: 'ENDERECO_DO_JS_POKEMON', replacement: 'scripts/pokemon.min.js' },
            { match: 'ENDERECO_DO_JS_FAVORITES', replacement: 'scripts/favorites.min.js' },
            { match: 'ENDERECO_DO_JS_PURCHASE', replacement: 'scripts/purchase.min.js' },
            { match: 'ENDERECO_DO_JS_MAIN', replacement: 'scripts/main.min.js' }
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'prebuild',
            src: ['index.html'],
            dest: 'dist/'
          }
        ]
      }
    },

    // =====================
    // BUILD DIST
    // =====================
    uglify: {
      dist: {
        files: {
          "dist/scripts/api.min.js": ["dist/scripts/api.js"],
          "dist/scripts/pokemon.min.js": ["dist/scripts/pokemon.js"],
          "dist/scripts/favorites.min.js": ["dist/scripts/favorites.js"],
          "dist/scripts/purchase.min.js": ["dist/scripts/purchase.js"],
          "dist/scripts/main.min.js": ["dist/scripts/main.js"],
        },
      },
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "prebuild/index.html": "src/index.html",
        },
      },
    },

    clean: ["prebuild"],

    // =====================
    // WATCH - MELHORADO
    // =====================
    watch: {
      styles: {
        files: ["src/styles/**/*.less"],
        tasks: ["less:dev"],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ["src/scripts/**/*.js"],
        tasks: ["copy:dev"],
      },
      html: {
        files: ["src/index.html"],
        tasks: ["replace:dev"],
      },
    },

    // =====================
    // CONNECT - SERVIDOR LOCAL
    // =====================
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dev',
          open: true,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");

  // TASKS ORGANIZADAS
  grunt.registerTask("default", ["build:dev", "connect", "watch"]);
  grunt.registerTask("dev", ["build:dev", "watch"]);
  grunt.registerTask("serve", ["build:dev", "connect", "watch"]);
  
  grunt.registerTask("build:dev", [
    "less:dev",
    "copy:dev", 
    "replace:dev"
  ]);

  grunt.registerTask("build", [
    "less:dist",
    "copy:dist",
    "htmlmin:dist",
    "replace:dist",
    "uglify",
    "clean",
  ]);
};