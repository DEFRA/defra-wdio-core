'use strict'

/* eslint-env mocha */

const { page } = require('defra-wdio-core')

describe(`Can I navigate to the 'Check your State Pension age' page?`, () => {
  it(`it has a page title "Working, jobs and pensions - GOV.UK"`, () => {
    page.visit('https://www.gov.uk')
    page.clickLink('Working, jobs and pensions')
    page.hasTitle('Working, jobs and pensions - GOV.UK')
  })
})
