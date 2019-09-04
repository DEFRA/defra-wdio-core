'use strict'

const fse = require('fs-extra')

module.exports = (dir = process.env.PWD) => {
  const a = dir.split('/')
  let from, to

  a.pop()
  a.pop()

  from = dir + '/base'
  to = a.join('/')
  fse.copySync(from, to)

  a.push('src')
  a.push('js')

  from = dir + '/src/conf/base'
  to = a.join('/')
  fse.copySync(from, to, { overwrite: false })
}
