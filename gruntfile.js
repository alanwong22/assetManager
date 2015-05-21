module.exports = function(grunt) {
//http-server /Users/Station22/Desktop/workspace/Angular-Sorting

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('./.bowerrc'),
    // Project settings
    config: {
        // Path to source files
        app: 'app'
    },
    concat: {
      libs: {
        src: [
          '<%= bower.directory %>/angular/angular.min.js',
          '<%= bower.directory %>/angular-route/angular-route.min.js',
          '<%= bower.directory %>/jquery/dist/jquery.min.js',
          '<%= bower.directory %>/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
          '<%= bower.directory %>/velocity/velocity.min.js',
          '<%= bower.directory %>/velocity/velocity.ui.min.js'
        ],
        dest: 'app/js/lib.js'
      },
      core: {
        src: [
          'app/js/app.js',
          'app/js/*/*.js'
        ],
        dest: 'app/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        src: 'app/js/<%= pkg.name %>.js',
        dest: 'app/js/<%= pkg.name %>.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app/css/styles.css' : 'app/scss/styles.scss'
        }
        // files: [{
        //   expand: true,
        //   cwd: 'scss',
        //   src: ['<%= config.app %>/**/*.scss'],
        //   dest: 'styles',
        //   ext: '.css'
        // }]
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              '<%= config.app %>/{,*/}*.html',
              '.tmp/styles/{,*/}*.css',
              '<%= config.app %>/images/{,*/}*'
          ]
      },
      scripts: {
        files: [
          '<%= config.app %>/js/app.js',
          '<%= config.app %>/js/*/*.js'
        ],
        tasks: ['concat:core'],
        options: {
          livereload: true   //reloads the browser
        }
      },
      css: {
       files: [
        '<%= config.app %>/scss/*.scss',
        '<%= config.app %>/scss/**/*.scss'
       ],
       tasks: ['sass'],
        options: {
          livereload: true   //reloads the browser
        }
      }
    },
    // The actual grunt server settings
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            hostname: 'localhost'
        },
        livereload: {
            options: {
                // OPEN NEW WINDOW ON INIT
                livereload: true,
                open: true,
                base: '<%= config.app %>'
            }
        },
    }
  });

  

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat:libs']);
  grunt.registerTask('build', ['concat:libs', 'uglify']);
  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'
      ]);
  });

};