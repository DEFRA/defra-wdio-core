'use strict'

/* eslint-env mocha */

const { core } = require('defra-wdio-core')

describe(`Can I search for 'pensions', and navigate from there?`, () => {
  it(`it has a page title "Check your State Pension age - GOV.UK"`, () => {
    core.visit('https://www.gov.uk/')
    core.enter('input', 'pensions', 'title', 'Search')
    core.clickButtonByText('Search')
    core.clickLinkByText('Check your State Pension age')
    core.hasTitle('Check your State Pension age - GOV.UK')
  })
})
