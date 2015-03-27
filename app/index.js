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

      this.log(this.projectName);
      this.log(this.appname);

      if (this.usesFoundation) {
        this.usesjQuery = true;
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { usesjQuery: this.usesjQuery, projectName: this.projectName }
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
        { projectName: this.projectName }
      );

      this.fs.copyTpl(
        this.templatePath('js/_scripts.js'),
        this.destinationPath('src/js/scripts.js'),
        { usesjQuery: this.usesjQuery }
      );

      this.fs.copy(
        this.templatePath('scss/'),
        this.destinationPath('src/scss/')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
