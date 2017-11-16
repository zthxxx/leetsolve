const chalk = require('chalk')
const log = console.log
const warn = console.warn
/**
 * Prefix.
 */

const prefix = ' leetsolve'
const sep = chalk.gray('·')

exports.debug = function (...msg) {
  log(chalk.blue(prefix), sep, ...msg)
}

exports.info = function (...msg) {
  log(chalk.gray(prefix), sep, ...msg)
}

exports.log = function (...msg) {
  log(chalk.white(prefix), sep, ...msg)
}

exports.success = function (...msg) {
  warn(chalk.green(prefix), sep, chalk.greenBright(...msg))
}

exports.warn = function (...msg) {
  warn(chalk.cyanBright(prefix), sep, ...msg)
}

exports.error = function (...msg) {
  warn(chalk.redBright(prefix), sep, ...msg)
}

// log(chalk.black('#######################'))
// log(chalk.red('#######################'))
// log(chalk.green('#######################'))
// log(chalk.yellow('#######################'))
// log(chalk.blue ('#######################'))
// log(chalk.magenta('#######################'))
// log(chalk.cyan('#######################'))
// log(chalk.white('#######################'))
// log(chalk.gray ('#######################'))
// log(chalk.redBright('#######################'))
// log(chalk.greenBright('#######################'))
// log(chalk.yellowBright ('#######################'))
// log(chalk.blueBright('#######################'))
// log(chalk.magentaBright('#######################'))
// log(chalk.cyanBright ('#######################'))
// log(chalk.whiteBright ('#######################'))
