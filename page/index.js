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
      'So you want a ' + chalk.red('new page?')
    ));

    var prompts = [
      {
        type: 'input',
        name: 'pageName',
        message: 'What\'s the page\'s name?',
        default: 'new'
      }
    ];

    this.prompt(prompts, function (props) {
      this.pageName = props.pageName;

      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function () {
      var oldManifest;

      this.fs.copyTpl(
        this.templatePath('jade/_page.jade'),
        this.destinationPath('src/' + this.pageName + '.jade'),
        { usesjQuery: this.usesjQuery, usesOutdatedBrowser: this.usesOutdatedBrowser, usesGoogleAnalytics: this.usesGoogleAnalytics }
      );

      this.fs.copy(
        this.templatePath('scss/pages/page'),
        this.destinationPath('src/scss/pages/' + this.pageName + '/')
      );

      oldManifest = this.fs.read('src/scss/pages/_manifest.scss');
      
      this.fs.delete('src/scss/pages/_manifest.scss');

      this.fs.write('src/scss/pages/_manifest.scss', oldManifest + '\n@import \'' + this.pageName + '/manifest\';');
    },
  }
});
