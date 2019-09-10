'use strict'

const { defineStep } = require('cucumber')
const { core } = require('defra-wdio-core')
const page = require('../pages/example')

defineStep('I visit the url {string} !', text => core.visit(text))

defineStep('it has a/an {string} element with text {string} !', (type, text) => page.hasElement(type, text))
