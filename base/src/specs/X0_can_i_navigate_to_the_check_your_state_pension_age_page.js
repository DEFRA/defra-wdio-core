'use strict'

/* eslint-env mocha */

const { core } = require('defra-wdio-core')

describe(`Can I navigate to the 'Check your State Pension age' page?`, () => {
  it(`it has a page title "Working, jobs and pensions - GOV.UK"`, () => {
    core.visit('https://www.gov.uk/')
    core.clickLink('Working, jobs and pensions')
    core.hasTitle('Working, jobs and pensions - GOV.UK')
  })
})
