Play Silhouette Angular Seed Project
=====================================

The Play Silhouette Angular Seed project shows how [Silhouette](https://github.com/mohiva/play-silhouette) can be used
to create a SPA with [AngularJS](https://angularjs.org/)/[Satellizer](https://github.com/sahat/satellizer) and Play
scaffolded by [yeoman](https://github.com/tuplejump/play-yeoman). It's a starting point which can be extended to fit
your needs.

## Example

You can find a running example of this template under the following URL: https://play-silhouette-angular-seed.herokuapp.com/

## Features

* Sign Up
* Sign In (Credentials)
* JWT authentication
* Social Auth (Facebook, Google+, Twitter)
* Dependency Injection with Guice
* Publishing Events
* Avatar service

## Documentation

Consulate the [Silhouette documentation](http://docs.silhouette.mohiva.com/) for more information. If you need help with the integration of Silhouette into your project, don't hesitate and ask questions in our [mailing list](https://groups.google.com/forum/#!forum/play-silhouette) or on [Stack Overflow](http://stackoverflow.com/questions/tagged/playframework).

## Getting started

1. Make sure u have [Ruby](https://www.ruby-lang.org/de/) and [node.js](http://nodejs.org/) installed.

  Then you must install the node packages [yo](http://yeoman.io), [grunt](http://gruntjs.com/) and [bower](http://bower.io/):

  ```
  npm install -g yo grunt grunt-cli bower
  ```

  And the ruby packages [sass](http://sass-lang.com/) and [compass](http://compass-style.org/):

  ```
  gem install sass compass
  ```

  Alternative you can use Bundler to install the ruby packages:

  ```
  bundle install -j4 --path .bundle
  ```

2. Start sbt and run the following:

  ```
  $ update

  $ npm install

  $ bower install

  $ grunt build

  $ run
  ```

## Activator

See https://typesafe.com/activator/template/play-silhouette-angular-seed

# License

The code is licensed under [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0).
