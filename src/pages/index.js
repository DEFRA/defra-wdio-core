'use strict'

const assert = require('assert')
const ordinal = require('ordinal')
const { infoMsg, warningMsg } = require('../js/messages')

class Core {
  _attibutesBuilder (attributes) {
    const a = []
    for (let i = 0; i < attributes.length; i += 2) a.push(`[${attributes[i]}='${attributes[i + 1]}']`)
    return a.join('')
  }

  _checkUrlChange (a, b, expectChange) {
    if (expectChange && a === b) {
      throw new Error('Url did not change.')
    }
    if (!expectChange && a !== b) {
      throw new Error(`Url changed from '${a}' to '${b}'`)
    }
  }

  screenshot (location = './logs/error-screenshots/', prefix = 'error') {
    const timestamp = new Date().toISOString().substring(0, 19)
    const browserName = browser.capabilities.browserName.toLowerCase()
    browser.saveScreenshot(`${location}${prefix}.${timestamp}.${browserName}.png`)
  }

  wait (milliseconds) {
    browser.pause(milliseconds)
  }

  get (selector, text = null, milliseconds = 0, log = true, index = 0) {
    this.wait(milliseconds)

    const sText = `'${selector}' `
    const eText = !text ? '' : `=${text}`
    const wText = !text ? '' : `with text '${text}' `
    const waitforTimeout = browser.options.waitforTimeout

    let a

    try {
      browser.waitUntil(() => {
        a = $$(`${selector}${eText}`)
        return !!a.length
      }, waitforTimeout, `${sText}${wText}not found.`)
    } catch (error) {
      this.screenshot()
      throw error
    }

    if (log && a.length > 1) infoMsg(`Info`, `${a.length} ${sText}elements ${wText}found.`)

    if (!a[index]) {
      this.screenshot()
      throw new Error(`Could not find ${ordinal(index + 1)} ${sText}${wText}`)
    } else {
      return a[index]
    }
  }

  set (selector, text) {
    this.get(selector).setValue(text)
  }

  enter (type, text, ...attributes) {
    this.set(`${type}${this._attibutesBuilder(attributes)}`, text)
  }

  visit (text, expectChange = true, milliseconds = 0) {
    this.wait(milliseconds)

    const a = browser.getUrl()
    browser.url(text)
    const b = browser.getUrl()
    this._checkUrlChange(a, b, expectChange)

    if (text !== b) {
      warningMsg('WARNING', `Url redirected from '${text}' to '${b}'`)
    }
  }

  click (type, text = null, expectChange = false, ...attributes) {
    const a = browser.getUrl()
    this.get(`${type}${this._attibutesBuilder(attributes)}`, text).click()
    const b = browser.getUrl()
    this._checkUrlChange(a, b, expectChange)
  }

  clickButton (text, expectChange = true) {
    this.click('button', text, expectChange)
  }

  clickLabel (text) {
    this.click('label', text)
  }

  clickLink (text, expectChange = true) {
    this.click('a', text, expectChange)
  }

  select (option, ...attributes) {
    this.get(`select${this._attibutesBuilder(attributes)}`).selectByVisibleText(option)
  }

  selectByLabel (text, option) {
    this.get('label*', text).$('select').selectByVisibleText(option)
  }

  selectDob (text) {
    const a = text.split(' ')
    this.selectByLabel('Day', a[0])
    this.selectByLabel('Month', a[1])
    this.selectByLabel('Year', a[2])
  }

  hasTitle (text, milliseconds = 500) {
    const a = this.get('title', null, milliseconds).getTitle()
    assert.strictEqual(a, text)
  }

  hasText (text, milliseconds = 500) {
    const a = this.get('*', null, milliseconds, false).getHTML().includes(text)
    if (!a) this.screenshot()
    assert.strictEqual(a, true, `Element with content '${text}' not found.`)
  }

  hasElement (type, text, milliseconds = 500, ...attributes) {
    const a = this.get(`${type}${this._attibutesBuilder(attributes)}`, text, milliseconds).getText()
    assert.strictEqual(a, text)
  }
}

module.exports = Core
