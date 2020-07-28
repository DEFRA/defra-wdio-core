'use strict'

const local = {

  /* WDIO Options */

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--no-sandbox']
      }
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['--headless']
      }
    }
  ],

  services: ['selenium-standalone'],

  seleniumLogs: './logs/selenium'
}

const common = require('./common.conf').config

exports.config = Object.assign(common, local)
