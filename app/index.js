'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'So you want a ' + chalk.red('one pager?')
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What\'s your project\'s name?',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'usesCompass',
        message: 'Would you like to use Compass?',
        default: true
      },
      {
        type: 'confirm',
        name: 'usesFoundation',
        message: 'Would you like to use Foundation?',
        default: true
      },
      {
        type: 'confirm',
        name: 'usesjQuery',
        message: 'Would you like to use jQuery?',
        default: true
      },
      {
        type: 'confirm',
        name: 'usesOutdatedBrowser',
        message: 'Would you like to use Outdated Browser?',
        default: true
      },
      {
        type: 'confirm',
        name: 'usesGoogleAnalytics',
        message: 'Would you like to use Google Analytics?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.usesCompass = props.usesCompass;
      this.usesFoundation = props.usesFoundation;
      this.usesjQuery = props.usesjQuery;
      this.usesOutdatedBrowser = props.usesOutdatedBrowser;
      this.usesGoogleAnalytics = props.usesGoogleAnalytics;

      if (this.usesFoundation) {
        this.usesjQuery = true;
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { projectName: this.projectName }
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { usesjQuery: this.usesjQuery, projectName: this.projectName, usesOutdatedBrowser: this.usesOutdatedBrowser, usesFoundation: this.usesFoundation }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copyTpl(
        this.templatePath('jade/_index.jade'),
        this.destinationPath('src/index.jade'),
        { usesjQuery: this.usesjQuery, usesOutdatedBrowser: this.usesOutdatedBrowser, usesGoogleAnalytics: this.usesGoogleAnalytics }
      );

      this.fs.copyTpl(
        this.templatePath('jade/_header.jade'),
        this.destinationPath('src/partials/_header.jade'),
        { projectName: this.projectName, usesOutdatedBrowser: this.usesOutdatedBrowser }
      );

      this.fs.copyTpl(
        this.templatePath('jade/_footer.jade'),
        this.destinationPath('src/partials/_footer.jade'),
        { usesjQuery: this.usesjQuery, usesOutdatedBrowser: this.usesOutdatedBrowser, usesGoogleAnalytics: this.usesGoogleAnalytics, usesFoundation: this.usesFoundation }
      );

      this.fs.copyTpl(
        this.templatePath('js/_scripts.js'),
        this.destinationPath('src/js/scripts.js'),
        { usesjQuery: this.usesjQuery, usesFoundation: this.usesFoundation }
      );

      this.fs.copy(
        this.templatePath('scss/'),
        this.destinationPath('src/scss/')
      );

      this.fs.copyTpl(
        this.templatePath('scss/vendor/_manifest.scss'),
        this.destinationPath('src/scss/vendor/_manifest.scss'),
        { usesFoundation: this.usesFoundation }
      );

      this.fs.copy(
        this.templatePath('images/'),
        this.destinationPath('src/images/')
      );
    },

    gruntFile: function () {
      var gruntConfig = {

        sass: {
          dist: {
            options: {
              style: 'compressed',
              quiet: false
            },
            files: {
              '<%= dist %>/css/styles.css': '<%= src %>/scss/styles.scss'
            }
          }
        },

        autoprefixer: {
          options: {
            browsers: ['> 1%', 'last 2 versions', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1'],
            remove: false
          },
          dist: {
            src: '<%= dist %>/css/styles.css',
          }
        },

        jade: {
          compile: {
            options: {
              pretty: true,
              data: {
                debug: false
              }
            },
            files: [{
              expand: true,
              cwd: '<%= src %>/',
              src: ['*.jade', '!_*.jade'],
              ext: '.html',
              dest: '<%= dist %>/'
            }]
          }
        },

        jshint: {
          options: {
            jshintrc: '.jshintrc'
          },
          all: [
            'Gruntfile.js',
            '<%= src %>/js/**/*.js'
          ]
        },

        copy: {
          dist: {
            files: [{
              expand: true,
              flatten: true,
              cwd:'./',
              src: ['bower_components/jquery/dist/jquery.js', 'bower_components/modernizer/modernizr.js', 'bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.js', 'bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.css', 'bower_components/foundation/js/foundation.min.js', 'bower_components/html5shiv/dist/html5shiv.min.js'],
              dest: '<%= dist %>/vendor/'
            }]
          },
        },

        imagemin: {
          target: {
            files: [{
              expand: true,
              cwd: '<%= src %>/images/',
              src: ['**/*.{jpg,gif,svg,jpeg,png}'],
              dest: '<%= dist %>/images/'
            }]
          }
        },

        uglify: {
          options: {
            preserveComments: 'some',
            mangle: false
          },
          dist: {
            files: {
              '<%= dist %>/js/scripts.js': ['<%= src %>/js/scripts.js']
            }
          }
        },

        watch: {
          grunt: {
            files: ['Gruntfile.js'],
            tasks: ['sass', 'jshint']
          },
          sass: {
            files: '<%= src %>/scss/**/*.scss',
            tasks: ['sass', 'autoprefixer']
          },
          jade: {
            files: '<%= src %>/**/*.jade',
            tasks: ['jade']
          },
          js: {
            files: '<%= src %>/js/**/*.js',
            tasks: ['jshint', 'uglify']
          },
          livereload: {
            files: ['<%= src %>/**/*.jade', '!<%= src %>/bower_components/**', '<%= src %>/js/**/*.js', '<%= src %>/scss/**/*.scss', '<%= src %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
            options: {
              livereload: true
            }
          }
        },

        connect: {
          dist: {
            options: {
              port: 9001,
              base: '<%= dist %>/',
              open: true,
              keepalive: false,
              livereload: true,
              hostname: '127.0.0.1'
            }
          }
        },

        defaultTask: ['jade', 'sass', 'autoprefixer', 'imagemin', 'jshint', 'uglify', 'copy', 'connect', 'watch'],
        buildTask: ['jade', 'sass', 'autoprefixer', 'imagemin', 'jshint', 'uglify', 'copy']
      };

      gruntConfig.sass.dist.options.compass = this.usesCompass;

      if (this.usesFoundation) {
        gruntConfig.sass.dist.options.loadPath = '<%= src %>/bower_components/foundation/scss';
      }

      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );

      this.gruntfile.insertConfig('sass', JSON.stringify(gruntConfig.sass));
      this.gruntfile.insertConfig('autoprefixer', JSON.stringify(gruntConfig.autoprefixer));
      this.gruntfile.insertConfig('jade', JSON.stringify(gruntConfig.jade));
      this.gruntfile.insertConfig('jshint', JSON.stringify(gruntConfig.jshint));
      this.gruntfile.insertConfig('copy', JSON.stringify(gruntConfig.copy));
      this.gruntfile.insertConfig('imagemin', JSON.stringify(gruntConfig.imagemin));
      this.gruntfile.insertConfig('uglify', JSON.stringify(gruntConfig.uglify));
      this.gruntfile.insertConfig('watch', JSON.stringify(gruntConfig.watch));
      this.gruntfile.insertConfig('connect', JSON.stringify(gruntConfig.connect));

      this.gruntfile.registerTask('default', gruntConfig.defaultTask);
      this.gruntfile.registerTask('default', gruntConfig.buildTask);
    },

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
