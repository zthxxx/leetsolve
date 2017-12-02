process.env.FORCE_COLOR = 1
const chalk = require('chalk')
chalk.level = 3
const { whiteBright, white, redBright: red, greenBright: green } = chalk


class WrongAnswerException extends Error {
  constructor ({ problem, solveName, caseCount, input, answer, expect }) {
    let message = red(`
        Wrong Answer at ${whiteBright.underline(problem)}:
          the solution -- ${white(solveName)}
          with ${green('#')}${green(caseCount)} input ${green(JSON.stringify(input))}
          get answer ${green(JSON.stringify(answer))} , but expect ${green(JSON.stringify(expect))}

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
    let message = red(`
        Time Limit Exceeded at ${whiteBright.underline(problem)}:
          the solution -- ${white(solveName)}
          with ${green('#' + caseCount)} input ${green(JSON.stringify(input))}
          expect ${green(JSON.stringify(expect))}, but execute timeout.

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
