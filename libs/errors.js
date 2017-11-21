process.env.FORCE_COLOR = 1
const chalk = require('chalk')
chalk.level = 3
const { whiteBright, white, redBright: red, greenBright: green } = chalk


class AssertException extends Error {
  constructor ({ problem, solveName, caseIndex, input, answer, expect }) {
    let message = red(`
        Assert error at ${whiteBright.underline(problem)}:
          the solution -- ${white(solveName)}
          with ${green('#')}${green(caseIndex)} input ${green(JSON.stringify(input))}
          get answer ${green(JSON.stringify(answer))} , but expect ${green(JSON.stringify(expect))}

    `)
    super(message)
    this.name = 'AssertException'
  }

  toJSON () {
    return this.message
  }
}

class TimeoutException extends Error {
  constructor ({ problem, solveName, caseIndex, input, expect, timeout }) {
    let message = ''
    if (problem && solveName) {
      message = red(`
        Timeout error at ${whiteBright.underline(problem)}:
          the solution -- ${white(solveName)}
          with ${green('#' + caseIndex)} input ${green(JSON.stringify(input))}
          expect ${green(JSON.stringify(expect))}, but execute timeout.

      `)
    }
    super(message)
    this.name = 'TimeoutException'
    this.timeout = timeout
  }

  toJSON () {
    return this.message
  }
}

function showErrorStack (errors) {
  if (errors.length) {
    console.error()
    console.error()
    console.error(
      '      ',
      '****************** ERRORS ******************'
    )
    console.error()
    for (let error of errors) console.error(error)
    console.error(
      '      ',
      '---------',
      `Total happened ${errors.length} errors!`,
      '---------'
    )
    console.error()
  }
}

module.exports = {
  AssertException,
  TimeoutException,
  showErrorStack
}
