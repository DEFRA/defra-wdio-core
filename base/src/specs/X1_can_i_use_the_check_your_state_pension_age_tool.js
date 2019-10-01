'use strict'

/* eslint-env mocha */

const { core } = require('defra-wdio-core')
const page = require('../pages/example')

describe(`Can I use the 'Check your State Pension age' tool?`, () => {
  it(`it has "You’ll reach State Pension age on 29 September 2051." on the page`, () => {
    page.visit('state-pension-age')
    core.clickLinkByText('Start now')
    core.clickLabelByText('State Pension age - including Pension Credit qualifying age')
    core.clickButtonByText('Next step')

    /** DO THIS **/

    // core.selectByLabel('Day', '29')
    // core.selectByLabel('Month', 'September')
    // core.selectByLabel('Year', '1983')

    /** OR DO THIS **/

    core.selectDob('29 September 1983')

    core.clickButtonByText('Next step')
    core.clickLabelByText('Man')
    core.clickButtonByText('Next step')

    /** DO THIS **/

    // core.hasText('You’ll reach State Pension age on 29 September 2051.')

    /** OR DO THIS **/

    page.hasElement('h2', 'You’ll reach State Pension age on 29 September 2051.')
  })
})
