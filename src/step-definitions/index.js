'use strict'

const { defineStep } = require('cucumber')
const Page = require('../../src/pages')
const page = new Page()

defineStep('I visit the url {string} *', text => page.visit(text))

defineStep('I click the {string} button *', text => page.clickButton(text))

defineStep('I click the {string} link *', text => page.clickLink(text))

defineStep('I select the answer {string} *', text => page.selectAnswer(text))

defineStep('I select the {string} option {string} *', (text, option) => page.selectOption(text, option))

defineStep('I select the dob {string} *', text => page.selectDob(text))

defineStep('I enter {string} in the email field *', text => page.formField('email', text))

defineStep('I enter {string} in the password field *', text => page.formField('password', text))

defineStep('I enter {string} in the search field *', text => page.formField('search', text))

defineStep('I enter {string} in the text field *', text => page.formField('text', text))

defineStep('I enter {string} in the text area *', text => page.textArea(text))

defineStep('I click the {string} {string} link *', (index, text) => page.clickLink(text, parseInt(index) - 1))

defineStep('I click the {string} {string} button *', (index, text) => page.clickButton(text, parseInt(index) - 1))

defineStep('I select the {string} answer {string} *', (index, text) => page.selectAnswer(text, parseInt(index) - 1))

defineStep('I select the {string} {string} option {string} *', (index, text, option) => page.selectOption(text, option, parseInt(index) - 1))

defineStep('I enter {string} in the {string} email field *', (text, index) => page.formField('email', text, parseInt(index) - 1))

defineStep('I enter {string} in the {string} password field *', (text, index) => page.formField('password', text, parseInt(index) - 1))

defineStep('I enter {string} in the {string} search field *', (text, index) => page.formField('search', text, parseInt(index) - 1))

defineStep('I enter {string} in the {string} text field *', (text, index) => page.formField('text', text, parseInt(index) - 1))

defineStep('I enter {string} in the {string} text area *', (text, index) => page.textArea(text, parseInt(index) - 1))

defineStep('it has a page title {string} *', text => page.hasTitle(text))

defineStep('it has {string} on the page *', text => page.hasText(text))

defineStep('it has a/an {string} element with text {string} *', (type, text) => page.hasElement(type, text))
