'use strict'

/* eslint-env mocha */

const { page } = require('defra-wdio-core')

describe(`Can I search for 'pensions', and navigate from there?`, () => {
  it(`it has a page title "Check your State Pension age - GOV.UK"`, () => {
    page.visit('https://www.gov.uk')
    page.formField('search', 'pensions', 0)
    page.clickButton('Search')
    page.clickLink('Check your State Pension age')
    page.hasTitle('Check your State Pension age - GOV.UK')
  })
})
