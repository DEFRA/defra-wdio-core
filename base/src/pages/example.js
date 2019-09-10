'use strict'

const assert = require('assert')
const { Core } = require('defra-wdio-core')

class Page extends Core {
  hasElement (type, text, delay = 500) {
    const a = this.get(type, text, delay).getText()
    assert.strictEqual(a, text)
  }
}

module.exports = new Page()
