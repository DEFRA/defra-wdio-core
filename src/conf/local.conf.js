'use strict'

const local = {

  /* WDIO Options */

  capabilities: [
    { browserName: 'chrome' },
    { browserName: 'firefox' }
  ],

  services: ['selenium-standalone'],

  seleniumLogs: './logs/selenium'
}

const common = require('./common.conf').config

exports.config = Object.assign(common, local)
