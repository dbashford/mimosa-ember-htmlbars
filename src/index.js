"use strict";

var fs = require( "fs" )
  , path = require( "path" )
  , logger = null
  , config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    logger = mimosaConfig.log;
    return mimosaConfig.emberHtmlbars.extensions;
  };

var regularBoilerplate =
  "if (!Ember.HTMLBars) {\n" +
  "  throw new Error(\"HTMLBars library has not been passed in successfully\");\n" +
  "}\n\n" +
  "var templates = {};\n";

var prefix = function ( mimosaConfig ) {

  if ( mimosaConfig.template.wrapType === "amd" ) {
    logger.debug( "Building HTMLBars template file wrapper" );
    var jsDir = path.join( mimosaConfig.watch.sourceDir, mimosaConfig.watch.javascriptDir )
      , possibleHelperPaths = []
      , helperPaths
      , defineString
      , defines = []
      , params = [];

    // build list of possible paths for helper files
    mimosaConfig.extensions.javascript.forEach( function( ext ) {
      mimosaConfig.emberHtmlbars.helpers.forEach( function( helperFile ) {
        possibleHelperPaths.push( path.join( jsDir, helperFile + "." + ext ) );
      });
    });

    // filter down to just those that exist
    helperPaths = possibleHelperPaths.filter( function ( p) {
      return fs.existsSync( p );
    });

    // set up initial define dependency array and the array export parameters
    defines.push( "'" + mimosaConfig.emberHtmlbars.emberPath + "'" );
    params.push( "Ember" );

    // build proper define strings for each helper path
    helperPaths.forEach( function( helperPath ) {
      var helperDefine = helperPath.replace( mimosaConfig.watch.sourceDir, "" )
        .replace( /\\/g, "/" )
        .replace( /^\/?\w+\/|\.\w+$/g, "" );
      defines.push( "'" + helperDefine + "'" );
    });

    defineString = defines.join( "," );

    if ( logger.isDebug() ) {
      logger.debug( "Define string for HTMLBars templates [[ " + defineString + " ]]" );
    }

    return "define([" + defineString + "], function (" + (params.join(",")) + "){\n  " + regularBoilerplate;
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "var Ember = require('" + mimosaConfig.emberHtmlbars.emberPath + "');\n" + regularBoilerplate;
    }
  }

  return regularBoilerplate;
};

var suffix = function ( mimosaConfig ) {
  if ( mimosaConfig.template.wrapType === "amd" ) {
    return "return templates; });";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "\nmodule.exports = templates;";
    }
  }

  return "";
};

var compile = function ( mimosaConfig, file, cb) {
  var output, error;

  try {
    output = "Ember.TEMPLATES['" + file.templateName + "'] = Ember.HTMLBars.template(" + mimosaConfig.emberHtmlbars.lib.compileSpec( file.inputFileText ) + ");";
    output = output.replace( /var dom = env.dom/g, "env = processEnv(env);var dom = env.dom" );
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
};

module.exports = {
  name: "emberHtmlbars",
  compilerType: "template",
  clientLibrary: path.join( __dirname, "client", "htmlbars.js" ),
  compile: compile,
  suffix: suffix,
  prefix: prefix,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
