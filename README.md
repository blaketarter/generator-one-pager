# Generator One Pager [![Build Status](https://secure.travis-ci.org/blaketarter/generator-one-pager.png?branch=master)](https://travis-ci.org/blaketarter/generator-one-pager)

A [Yeoman](http://yeoman.io) generator for quickly scaffolding a static one page website. Useful for things like landing pages and coming soon pages.


## Dependencies
* [Yeoman](http://yeoman.io): `npm install -g yo`
* [Grunt](http://gruntjs.com/): `npm install -g grunt-cli`

## Installation
To install and use this generator simply run `npm install -g generator-one-pager`.

## Usage
Running this generator is as easy as typing `yo one-pager`.

It has plenty of options to get the build to your taste, but all versions use [Jade](http://jade-lang.com/) as the html templating engine.

#### Included

These libraries/extensions/tasks are included in every build.

* [Modernizr](http://modernizr.com/)
* [SCSS](http://sass-lang.com/)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Normalize.css](https://necolas.github.io/normalize.css/)
* [Jade](http://jade-lang.com/)
* [Imagemin](https://github.com/imagemin/imagemin)
* [JSHint](http://jshint.com/)
* [Livereload](http://livereload.com/)

#### Options

The options which can be turned on or off are:

* Using [Compass](http://compass-style.org/)
* Using [Foundation](http://foundation.zurb.com/)
* Using [jQuery](https://jquery.com/)
* Using [Outdated Browser](http://outdatedbrowser.com/)
* Using [Google Analytics](http://www.google.com/analytics/)

#### Project Structure

The Structure of this app is a a little opinionated to my current workflow but currently looks like this:

```
one-pager
|-- dist
|-- src
|   |-- index.jade
|   |-- images
|       |-- yo.png
|   |-- js
|       |-- scripts.js
|   |-- partials
|       |-- _header.jade
|   |-- scss
|       |-- components
|           |-- _footer.scss
|           |-- _global.scss
|           |-- _manifest.scss
|           |-- _navbar.scss
|           |-- _typography.scss
|           |-- _variables.scss
|       |-- pages
|           |-- index
|               |-- _content.scss
|               |-- _manifest.scss
|           |-- _manifest.scss
|       |-- vendor
|           |-- _manifest.scss
|           |-- _normalize.scss
|       |-- styles.scss
```

#### Gruntfile
So far the only grunt command is `grunt default` or simply `grunt`, which builds it out then starts and connects to port `:9001` then watches for changes.

#### SCSS Structure
Currently one-pager is set up to use the manifest pattern, where every section of the scss structure is broken up semantically and all can be imported at once by simply importing the manifest file in every directory.

## Note
This is the first generator I've built and as such mistakes are expected, any feedback would be appreciated.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
