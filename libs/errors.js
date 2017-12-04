process.env.FORCE_COLOR = 1
const chalk = require('chalk')
chalk.level = 3
const { whiteBright, white, redBright: red, greenBright: green } = chalk

const MAX_STR_LEN = 200
let strLenLimit = str => str.length > MAX_STR_LEN && str.slice(0, MAX_STR_LEN) + '...' || str

class WrongAnswerException extends Error {
  constructor ({ problem, solveName, caseCount, input, answer, expect }) {
    input = strLenLimit(JSON.stringify(input))
    answer = strLenLimit(JSON.stringify(answer))
    expect = strLenLimit(JSON.stringify(expect))
    let message = red(`
        Wrong Answer at ${whiteBright.underline(problem)}:
          the solution -- ${white(solveName)}
          with ${green('#')}${green(caseCount)} input ${green(input)}
          get answer ${green(answer)} , but expect ${green(expect)}

    `)
    super(message)
    this.name = 'WrongAnswerException'
  }

  toJSON () {
    return this.message
  }
}

class TimeLimitException extends Error {
  constructor ({ problem, solveName, caseCount, input, expect, timeout }) {
    input = strLenLimit(JSON.stringify(input))
    expect = strLenLimit(JSON.stringify(expect))
    let message = red(`
        Time Limit Exceeded at ${whiteBright.underline(problem)}:
          the solution -- ${white(solveName)}
          with ${green('#' + caseCount)} input ${green(input)}
          expect ${green(expect)}, but execute timeout.

    `)
    super(message)
    this.name = 'TimeLimitException'
    this.timeout = timeout
  }

  toJSON () {
    return this.message
  }
}

class CompileException extends Error {
  constructor ({ problem, stack }) {
    let message = red(`
        Compile Error at ${whiteBright.underline(problem)}:
        ${white(stack.replace(/\n/g, '\n        '))}

    `)
    super(message)
    this.name = 'CompileErrorException'
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
      whiteBright('****************** ERRORS ******************')
    )
    console.error()
    for (let error of errors) console.error(error)
    console.error(
      '      ',
      '---------',
      whiteBright(`Total happened ${errors.length} errors!`),
      '---------'
    )
    console.error()
  }
}

module.exports = {
  WrongAnswerException,
  TimeLimitException,
  CompileException,
  showErrorStack
}
