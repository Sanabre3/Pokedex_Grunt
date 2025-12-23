module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // =====================
    // LESS
    // =====================
    less: {
      dev: {
        files: {
          "dev/styles/main.css": "src/styles/main.less",
        },
      },
      dist: {
        options: { compress: true },
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
    // HTML DEV (GERA dev/index.html SEMPRE)
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
    // WATCH
    // =====================
    watch: {
      styles: {
        files: ["src/styles/**/*.less"],
        tasks: ["less:dev"],
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
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // DEV: SEMPRE GERA dev/index.html
  grunt.registerTask("default", [
    "less:dev",
    "copy:dev",
    "replace:dev",
    "watch",
  ]);

  // BUILD
  grunt.registerTask("build", [
    "less:dist",
    "copy:dist",
    "htmlmin:dist",
    "replace:dist",
    "uglify",
    "clean",
  ]);
};
