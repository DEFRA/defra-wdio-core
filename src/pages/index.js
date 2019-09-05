'use strict'

const assert = require('assert')
const ordinal = require('ordinal')
const { infoMsg, warningMsg } = require('')

class Page {
  get (type, content, index, milliseconds = 0, log = true) {
    const t = type === '*' ? '' : `of type '${type}' `
    const c = content ? `with content '${content}' ` : ''
    const equalsContent = content ? '=' + content : ''

    let elements

    browser.pause(milliseconds)

    const waitforTimeout = browser.options.waitforTimeout

    try {
      browser.waitUntil(() => {
        const arr = $$(`${type}${equalsContent}`)

        if (!arr.length) return false

        elements = arr
        return true
      }, waitforTimeout, `Element ${t}${c}not found`)
    } catch (error) {
      this.screenshot()

      throw error
    }

    if (log && elements.length > 1) infoMsg(`Info: `, `${elements.length} elements ${t}${c}found`)

    if (!elements[index]) {
      this.screenshot()

      throw new Error(`Could not find ${ordinal(index + 1)} ${t}`)
    } else {
      return elements[index]
    }
  }

  set (type, text, index = 0) {
    this.get(type, null, index).setValue(text)
  }

  screenshot (location = './logs/error-screenshots/', prefix = 'error') {
    const timestamp = new Date().toISOString().substring(0, 19)
    browser.saveScreenshot(`${location}${prefix}.${timestamp}.${browser.capabilities.browserName.toLowerCase()}.png`)
  }

  visit (text, milliseconds = 0) {
    browser.pause(milliseconds)
    browser.url(text)
  }

  clickButton (text, index = 0) {
    this.get('button', text, index).click()
  }

  clickLink (text, index = 0) {
    this.get('*', text, index).click()
  }

  selectAnswer (text, index = 0) {
    this.get('label', text, index).click()
  }

  selectOption (text, option, index = 0) {
    this.get('label*', text, index).$('select').selectByVisibleText(option)
  }

  selectDob (text) {
    const a = text.split(' ')
    this.selectOption('Day', a[0])
    this.selectOption('Month', a[1])
    this.selectOption('Year', a[2])
  }

  formField (type, text, index = 0) {
    this.set(`input[type=${type}]`, text, index)
  }

  textArea (text, index = 0) {
    this.set('textarea', text, index)
  }

  hasTitle (text, milliseconds = 500) {
    const a = this.get('title', null, 0, milliseconds).getTitle()
    assert.strictEqual(a, text)
  }

  hasText (text, milliseconds = 500) {
    const a = this.get('*', null, 0, milliseconds, false).getHTML().includes(text)
    if (!a) this.screenshot()
    assert.strictEqual(a, true, `Element with content '${text}' not found`)
  }

  hasElement (type, text, milliseconds = 500) {
    const a = this.get(type, text, 0, milliseconds).getText()
    assert.strictEqual(a, text)
  }
}

module.exports = Page
