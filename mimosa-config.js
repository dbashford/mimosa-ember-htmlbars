exports.config = {
  modules: [
    "eslint",
    "copy",
    "bower"
  ],
  vendor: {
    javascripts:"vendor"
  },
  watch: {
    sourceDir: "src",
    compiledDir: "lib",
    javascriptDir: null,
    exclude: ["client/htmlbars.js"]
  },
  eslint: {
    options: {
      rules: {
        "global-strict": 0,
        "no-underscore-dangle": 0
      },
      env: {
        node: true
      }
    }
  },
  bower: {
    copy: {
      exclude:[/jquery/],
      mainOverrides: {
        ember: ["ember-template-compiler.js"]
      }
    }
  }
}
