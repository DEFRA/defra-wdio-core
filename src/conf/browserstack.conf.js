'use strict'

const browserstackUser = process.env.BROWSERSTACK_USER
const browserstackAccesskey = process.env.BROWSERSTACK_ACCESSKEY

if (!browserstackUser || !browserstackAccesskey) {
  throw new Error('Environment variable BROWSERSTACK_USER, or BROWSERSTACK_ACCESSKEY not set')
}

const common = require('./common.conf').config
const browsers = require('../conf/gds-standards/browsers')
const user = process.env.USER
const os = require('os').hostname()
const timestamp = new Date().toISOString().substring(0, 16)

const browserstack = {

  /* WDIO Options */

  capabilities: browsers.map(e => {
    e['project'] = common.browserstackProject || `Set 'browserstackProject' in 'custom.conf.js'`
    e['build'] = `${user}@${os} ${timestamp}`.replace(/[^A-Za-z0-9 :._@]/g, '_')
    e['local'] = true
    e['debug'] = true
    e['networkLogs'] = true
    e['acceptSslCerts'] = true
    return e
  }),

  services: ['browserstack'],

  /* BrowserStack Options */

  browserstackLocal: true,

  browserstackOpts: {
    logFile: './logs/local.log'
  },

  user: browserstackUser,

  key: browserstackAccesskey
}

exports.config = Object.assign(common, browserstack)
