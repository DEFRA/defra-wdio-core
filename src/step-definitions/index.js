'use strict'

const { defineStep } = require('cucumber')
const Core = require('../../src/pages')
const core = new Core()

defineStep('I click the {string} button *', text => core.clickButton(text))

defineStep('I click the {string} link *', text => core.clickLink(text))

defineStep('I enter {string} in the {string} with the {string} of {string} *', (text, type, attribute, content) => core.enter(type, text, attribute, content))

defineStep('I select the {string} option {string} *', (text, option) => core.selectByLabel(text, option))

defineStep('I select the answer {string} *', text => core.clickLabel(text))

defineStep('I select the dob {string} *', text => core.selectDob(text))

defineStep('I visit the url {string} *', text => core.visit(text))

defineStep('it has {string} on the page *', text => core.hasText(text))

defineStep('it has a page title {string} *', text => core.hasTitle(text))

defineStep('it has a/an {string} element with text {string} *', (type, text) => core.hasElement(type, text))
