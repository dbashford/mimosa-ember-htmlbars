"use strict";

exports.defaults = function() {
  return {
    emberHtmlbars: {
      extensions: ["hbs", "htmlbars"],
      helpers:["app/template/htmlbars-helpers"],
      emberPath: "vendor/ember"
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  emberHtmlbars:              # config settings for the HTMLBars compiler module\n" +
         "    lib: undefined         # use this property to provide a specific version of HTMLBars\n" +
         "    extensions: [\"hbs\", \"htmlbars\"]  # default extensions for HTMLBars files\n" +
         "    helpers:[\"app/template/htmlbars-helpers\"]  # the paths from watch.javascriptDir to\n" +
         "                           # the files containing HTMLBars helper/partial registrations\n" +
         "    emberPath: \"vendor/ember\"  # AMD path of the Ember library, this is used as a\n" +
         "                           # dependency in the compiled templates.\n";
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "emberHtmlbars config", config.emberHtmlbars ) ) {

    if ( !config.emberHtmlbars.lib ) {
      config.emberHtmlbars.lib = require( "htmlbars" );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "emberHtmlbars.extensions", config.emberHtmlbars.extensions ) ) {
      if (config.emberHtmlbars.extensions.length === 0) {
        errors.push( "emberHtmlbars.extensions cannot be an empty array");
      }
    }

    validators.ifExistsIsArrayOfStrings( errors, "emberHtmlbars.helpers", config.emberHtmlbars.helpers );
    validators.ifExistsIsString( errors, "emberHtmlbars.emberPath", config.emberHtmlbars.emberPath );
  }

  return errors;
};
