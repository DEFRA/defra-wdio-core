'use strict'

const { defineStep } = require('cucumber')
const { page } = require('defra-wdio-core')
const example = require('../pages/example')

defineStep('I visit the url {string} !', text => page.visit(text))

defineStep('it has a/an {string} element with text {string} !', (type, text) => example.hasElement(type, text))
