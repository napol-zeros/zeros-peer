// Zeros Peer

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

require('./modules/main')
require('./modules/files')
const command = require('./modules/command')

clear()

console.log(
  chalk.green(
    figlet.textSync('ZerosPeer', { horizontalLayout: 'default' })
  )
)

console.log('CLI version 0.0.1\n')

const run = async () => {
    const credentials = await command.askCommand()
    console.log(credentials)
}

run()