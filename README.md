mimosa-ember-htmlbars
===========

## Overview

This module compiles [HTMLBars](https://github.com/tildeio/htmlbars) for use in Ember applications.

Looking for a great place to start with HTMLBars, Ember and Mimosa?  Check out [MimosaEmberHTMLBars starter project] ](https://github.com/dbashford/MimosaEmberHTMLBarsSkeleton).

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'ember-htmlbars'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will compile HTMLBars files during `mimosa watch` and `mimosa build`.

This module utilizes all of the built-in template behavior that comes with Mimosa's basic template compiler.  See the [mimosa website](http://mimosa.io/compilers.html#mt) for more information about how templates are treated or check out the various [`template` configuration options](http://mimosa.io/configuration.html#templates).

## Default Config

```javascript
emberHtmlbars: {
  lib: undefined,
  extensions: ["hbs", "htmlbars"],
  helpers:["app/template/htmlbars-helpers"],
  features:{}
}
```

* `lib`: You may want to use this module but may want a specific version of the ember-template-compiler. By default this module comes [with its own compiler library](https://github.com/dbashford/mimosa-ember-htmlbars/blob/master/src/vendor/ember/ember-template-compiler.js) (see the version of ember it comes from at the top of the file), and this module will be updated as time passes to include newer versions of the the compiler. Using the `lib` property you can provide a specific version of the ember-template-compiler if the one being used by this module isn't to your liking. The compiler can be found [here](https://github.com/components/ember). To provide a specific version, you must bring it into your application and refer to it in your configuration. For instance: `lib: require('./lib/ember-template-compiler')`.
* `extensions`: an array of strings, the extensions of your HTMLBars files.
* `helpers`: an array of strings, the paths from `watch.javascriptDir` to the files containing HTMLBars helper/partial registrations
* `features`: an object, the list of feature flags you have enabled for your application. If you are using the [ember-env module](https://github.com/dbashford/mimosa-ember-env) the settings you have there will be used, otherwise the settings provided here will be used.

## Creating runtime library

* Install and build htmlbars
* `npm install -g esperanto`
* Run esperanto: `esperanto -b -i htmlbars-runtime.js -o htmlbars-runtime-bundle.js --strict`
* `htmlbars-runtime-bundle.js` is your new AMD compliant browser HTMLBars library.
* (Possible bug with esperanto) Change the last 4 export lines to look like this:
```javascript
__export('hooks', function () { return hooks__default; });
__export('helpers', function () { return helpers__default; });
```

## Thanks!

Much love to the folks behind both HTMLBars/Ember/Ember CLI for being reference material for getting this all together.