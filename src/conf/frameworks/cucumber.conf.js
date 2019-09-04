'use strict'

exports.config = {

  cucumberOpts: {
    backtrace: true,
    colors: true,
    dryRun: false,
    failFast: true,
    format: [
      'pretty'
    ],
    ignoreUndefinedDefinitions: false,
    require: [
      './node_modules/defra-wdio-core/src/step-definitions',
      './src/step-definitions/**/*.js'
    ],
    snippets: false,
    strict: true,
    timeout: 300000
  },

  specs: [
    './src/features/**/*.feature'
  ]
}
