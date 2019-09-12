'use strict'

const assert = require('assert')
const ordinal = require('ordinal')

const { infoMsg, warningMsg } = require('../js/messages')

class Core {
  _attibutesBuilder (a) {
    const attributes = []
    for (let i = 0; i < a.length; i += 2) attributes.push(`[${a[i]}='${a[i + 1]}']`)
    return attributes.join('')
  }

  _checkUrl (a) {
    const waitforTimeout = browser.options.waitforTimeout
    let b
    try {
      browser.waitUntil(() => {
        b = browser.getUrl()
        return b.includes(a)
      }, waitforTimeout, `Expected Url ${b} to include ${a}`)
    } catch (error) {
      this.screenshot()
      throw error
    }
  }

  _checkUrlChange (a, b, expectUrlChange) {
    if (expectUrlChange && a === b) {
      throw new Error('Url did not change.')
    }
    if (!expectUrlChange && a !== b) {
      throw new Error(`Url changed from '${a}' to '${b}'`)
    }
  }

  checkUrl (url) {
    const waitforTimeout = browser.options.waitforTimeout
    let browserUrl
    try {
      browser.waitUntil(() => {
        browserUrl = browser.getUrl()
        return browserUrl.includes(url)
      }, waitforTimeout, `Expected Url ${browserUrl} to include ${url}`)
    } catch (error) {
      this.screenshot()
      throw error
    }
  }

  clear (type, ...attributes) {
    this.get(`${type}${this._attibutesBuilder(attributes)}`).clearValue()
  }

  click (type, text = null, expectUrlChange = false, ...attributes) {
    const a = browser.getUrl()
    this.get(`${type}${this._attibutesBuilder(attributes)}`, text).click()
    const b = browser.getUrl()
    this._checkUrlChange(a, b, expectUrlChange)
  }

  clickButton (selector, expectUrlChange = true) {
    this.click(selector, null, expectUrlChange)
  }

  clickButtonByText (text, expectUrlChange = true) {
    this.click('button', text, expectUrlChange)
  }

  clickLabelByText (text) {
    this.click('label', text)
  }

  clickLink (selector, expectUrlChange = true) {
    this.click(selector, null, expectUrlChange)
  }

  clickLinkByText (text, expectUrlChange = true) {
    this.click('a', text, expectUrlChange)
  }

  enter (type, text, ...attributes) {
    this.set(`${type}${this._attibutesBuilder(attributes)}`, text)
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

  hasElement (type, text = null, milliseconds = 500, ...attributes) {
    const a = this.get(`${type}${this._attibutesBuilder(attributes)}`, text, milliseconds).getText()
    assert.strictEqual(a, text)
  }

  hasText (text, milliseconds = 500) {
    const a = this.get('*', null, milliseconds, false).getHTML().includes(text)
    if (!a) this.screenshot()
    assert.strictEqual(a, true, `Element with content '${text}' not found.`)
  }

  hasTitle (text, milliseconds = 500) {
    const a = this.get('title', null, milliseconds).getTitle()
    assert.strictEqual(a, text)
  }

  screenshot (prefix = 'error', location = './logs/error-screenshots/') {
    const timestamp = new Date().toISOString().substring(0, 19)
    const browserName = browser.capabilities.browserName.toLowerCase()
    browser.saveScreenshot(`${location}${prefix}.${timestamp}.${browserName}.png`)
  }

  set (selector, text) {
    this.get(selector).setValue(text)
  }

  select (type, option, ...attributes) {
    this.get(`${type}${this._attibutesBuilder(attributes)}`).selectByVisibleText(option)
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

  visit (text, expectUrlChange = true, milliseconds = 0) {
    this.wait(milliseconds)

    const a = browser.getUrl()
    browser.url(text)
    const b = browser.getUrl()
    this._checkUrlChange(a, b, expectUrlChange)

    if (!b.includes(text)) {
      warningMsg('WARNING', `Url redirected from '${text}' to '${b}'`)
    }
  }

  wait (milliseconds) {
    browser.pause(milliseconds)
  }
}

module.exports = Core
