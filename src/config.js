"use strict";

exports.defaults = function() {
  return {
    emberHtmlbars: {
      extensions: ["hbs", "htmlbars"],
      helpers: ["app/template/htmlbars-helpers"],
      emberPath: "vendor/ember",
      features: {}
    }
  };
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "emberHtmlbars config", config.emberHtmlbars ) ) {

    if ( !config.emberHtmlbars.lib ) {
      config.emberHtmlbars.lib = require( "./vendor/ember/ember-template-compiler" );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "emberHtmlbars.extensions", config.emberHtmlbars.extensions ) ) {
      if (config.emberHtmlbars.extensions.length === 0) {
        errors.push( "emberHtmlbars.extensions cannot be an empty array");
      }
    }

    validators.ifExistsIsArrayOfStrings( errors, "emberHtmlbars.helpers", config.emberHtmlbars.helpers );
    validators.ifExistsIsString( errors, "emberHtmlbars.emberPath", config.emberHtmlbars.emberPath );

    if ( validators.ifExistsIsObject( errors, "emberHtmlbars config", config.emberHtmlbars.features ) ) {
      if ( !Object.keys( config.emberHtmlbars.features ).length ) {
        // look for ember-env module and use those features if there
        if ( config.emberEnv && config.emberEnv.env && config.emberEnv.env.FEATURES ) {
          config.emberHtmlbars.features = config.emberEnv.env.FEATURES;
        }
      }

      for (var feature in config.emberHtmlbars.features) {
        config.emberHtmlbars.lib._Ember.FEATURES[feature] = config.emberHtmlbars.features[feature];
      }
    }
  }

  return errors;
};
