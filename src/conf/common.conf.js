'use strict'

const custom = require('../../../../src/js/custom.conf').config

let framework

if (custom.framework === 'cucumber') {
  framework = require('./frameworks/cucumber.conf').config
} else if (custom.framework === 'mocha') {
  framework = require('./frameworks/mocha.conf').config
} else {
  throw new Error(`Set 'framework' in 'custom.conf.js' to either 'cucumber' or 'mocha'`)
}

const hooks = require('../../../../src/js/hooks.conf').config

const fse = require('fs-extra')
fse.ensureDirSync(process.env.PWD + '/logs/error-screenshots')

const timestamp = new Date().toISOString().substring(0, 19)

const common = {

  /* WebDriver Options */

  logLevel: 'error',

  /* WDIO Options */

  maxInstances: 1,

  baseUrl: 'http://localhost',

  reporters: [
    'spec',
    ['junit', {
      outputDir: './logs/junit',
      outputFileFormat: options => `wdio.${timestamp}.${options.capabilities.browserName.toLowerCase()}.xml`
    }]],

  debug: true
}

exports.config = Object.assign(common, framework, hooks, custom)
