'use strict'

if (process.env.NODE_ENV == null) process.env.NODE_ENV = 'test'

const commander = require('commander')

const wdio = location => {
  process.argv[2] = `./node_modules/defra-wdio-core/src/conf/${location}.conf`

  if (process.argv[3]) process.argv.splice(3, 0, '--spec')

  require('../@wdio/cli/build').run()
}

module.exports.cli = () => {
  commander
    .command('local')
    .action(() => {
      wdio('local')
    })

  commander
    .command('browserstack')
    .action(() => {
      wdio('browserstack')
    })

  commander
    .command('*')
    .action(command => {
      console.log(`'${command}' is not a command`)
    })

  commander
    .parse(process.argv)
}

const Page = require('./src/pages')

module.exports.Page = Page
module.exports.page = new Page()

const { infoMsg, warningMsg } = require('./src/js/messages')

module.exports.infoMsg = infoMsg
module.exports.warningMsg = warningMsg
