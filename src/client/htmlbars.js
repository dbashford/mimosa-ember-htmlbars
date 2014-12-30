define(['exports'], function (exports) {

  'use strict';

  function hooks__block(env, morph, context, path, params, hash, template, inverse) {
    var options = {
      morph: morph,
      template: template,
      inverse: inverse
    };

    var helper = hooks__lookupHelper(env, context, path);
    var value = helper.call(context, params, hash, options, env);

    morph.setContent(value);
  }

  function hooks__inline(env, morph, context, path, params, hash) {
    var helper = hooks__lookupHelper(env, context, path);
    var value = helper.call(context, params, hash, { morph: morph }, env);

    morph.setContent(value);
  }

  function hooks__content(env, morph, context, path) {
    var helper = hooks__lookupHelper(env, context, path);

    var value;
    if (helper) {
      value = helper.call(context, [], {}, { morph: morph }, env);
    } else {
      value = hooks__get(env, context, path);
    }

    morph.setContent(value);
  }

  function hooks__element(env, domElement, context, path, params, hash) {
    var helper = hooks__lookupHelper(env, context, path);
    if (helper) {
      helper.call(context, params, hash, { element: domElement }, env);
    }
  }

  function hooks__attribute(env, attrMorph, domElement, name, value) {
    attrMorph.setContent(value);
  }

  function hooks__subexpr(env, context, helperName, params, hash) {
    var helper = hooks__lookupHelper(env, context, helperName);
    if (helper) {
      return helper.call(context, params, hash, {}, env);
    } else {
      return hooks__get(env, context, helperName);
    }
  }

  function hooks__get(env, context, path) {
    if (path === '') {
      return context;
    }

    var keys = path.split('.');
    var value = context;
    for (var i = 0; i < keys.length; i++) {
      if (value) {
        value = value[keys[i]];
      } else {
        break;
      }
    }
    return value;
  }

  function hooks__set(env, context, name, value) {
    context[name] = value;
  }

  function hooks__component(env, morph, context, tagName, attrs, template) {
    var helper = hooks__lookupHelper(env, context, tagName);

    var value;
    if (helper) {
      var options = {
        morph: morph,
        template: template
      };

      value = helper.call(context, [], attrs, options, env);
    } else {
      value = hooks__componentFallback(env, morph, context, tagName, attrs, template);
    }

    morph.setContent(value);
  }

  function hooks__concat(env, params) {
    var value = "";
    for (var i = 0, l = params.length; i < l; i++) {
      value += params[i];
    }
    return value;
  }

  function hooks__componentFallback(env, morph, context, tagName, attrs, template) {
    var element = env.dom.createElement(tagName);
    for (var name in attrs) {
      element.setAttribute(name, attrs[name]);
    }
    element.appendChild(template.render(context, env, morph.contextualElement));
    return element;
  }

  function hooks__lookupHelper(env, context, helperName) {
    return env.helpers[helperName];
  }

  var hooks__default = {
    content: hooks__content,
    block: hooks__block,
    inline: hooks__inline,
    component: hooks__component,
    element: hooks__element,
    attribute: hooks__attribute,
    subexpr: hooks__subexpr,
    concat: hooks__concat,
    get: hooks__get,
    set: hooks__set
  };

  function helpers__partial(params, hash, options, env) {
    var template = env.partials[params[0]];
    return template.render(this, env, options.morph.contextualElement);
  }

  var helpers__default = {
    partial: helpers__partial
  };





  (function (__export) {
    __export('hooks', function () { return hooks__default; });
    __export('helpers', function () { return helpers__default; });
  }(function (prop, get) {
    Object.defineProperty(exports, prop, {
      enumerable: true,
      get: get
    });
  }));

});