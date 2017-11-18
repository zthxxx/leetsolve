const { whiteBright: white, redBright: red, greenBright: green } = require('chalk')

class AssertException extends Error {
  constructor ({ problem, solveName, caseIndex, input, answer, expect }) {
    let message = red(`

        Assert error at ${white.underline(problem)}:
          the solution ${solveName}
          with ${green('#')}${green(caseIndex + 1)} input ${green(JSON.stringify(input))}
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

      Timeout error at ${white.underline(problem)}:
        the solution ${solveName}
        with ${green('#')}${green(caseIndex + 1)} input ${green(JSON.stringify(input))}
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

module.exports = {
  AssertException,
  TimeoutException
}
