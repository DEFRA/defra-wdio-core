'use strict'

/* eslint-env mocha */

const { page } = require('defra-wdio-core')
const example = require('../pages/example')

describe(`Can I use the 'Check your State Pension age' tool?`, () => {
  it(`it has "You’ll reach State Pension age on 29 September 2051." on the page`, () => {
    example.visit('state-pension-age')
    page.clickLink('Start now')
    page.selectAnswer('State Pension age - including Pension Credit qualifying age')
    page.clickButton('Next step')

    /** DO THIS **/

    // page.selectOption('Day', '29')
    // page.selectOption('Month', 'September')
    // page.selectOption('Year', '1983')

    /** OR DO THIS **/

    page.selectDob('29 September 1983')

    page.clickButton('Next step')
    page.selectAnswer('Man')
    page.clickButton('Next step')

    /** DO THIS **/

    // page.hasText('You’ll reach State Pension age on 29 September 2051.')

    /** OR DO THIS **/

    example.hasElement('h2', 'You’ll reach State Pension age on 29 September 2051.')
  })
})
