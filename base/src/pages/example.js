'use strict'

const assert = require('assert')
const { Page } = require('defra-wdio-core')

class Example extends Page {
  hasElement (type, text, delay = 500) {
    const a = this.get(type, text, 0, delay).getText()
    assert.strictEqual(a, text)
  }
}

module.exports = new Example()
