const path = require('path')
const cli = require('cac')()

cli.option('config', {
  desc: 'config file path',
  type: 'string',
  default: 'config.js'
})

const commad = cli.parse(null, { run: false })

const pathBase = path.join(__dirname, '..')

const configFile = path.join(pathBase, commad.flags.config)
const config = require(configFile)

module.exports.configName = commad.flags.config
module.exports.config = config
