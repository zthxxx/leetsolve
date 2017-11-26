const fs = require('fs')
const path = require('path')
const cluster = require('cluster')
const { CompileException, showErrorStack } = require('../libs/errors')
const { whiteBright: white, redBright: red } = require('chalk')
const { config } = require('../libs/configs')
const Solver = require('./solver')


const pathBase = path.join(__dirname, '..')
const problemBase = path.join(pathBase, config.problemBase)
const problems = fs.readdirSync(problemBase)


class Leetsolve {
  constructor () {
    this.errors = []
  }

  async run () {
    for (let problem of problems) {
      let problemPath = path.join(problemBase, problem)
      if (!fs.statSync(problemPath).isDirectory()) continue
      console.log()
      console.log(white('[problem]'), white(problem))

      let solutions = null
      let testcases = null
      try {
        solutions = require(problemPath)
        testcases = require(path.join(problemPath, config.casefile))
      } catch (e) {
        if (e instanceof SyntaxError) {
          let error = new CompileException({ problem, stack: e.stack })
          this.errors.push(error.message)
          console.warn('    ', red('×'), 'solutions Compile Error')
          continue
        }
        throw e
      }
      if (!(solutions instanceof Array)) solutions = [solutions]
      let solver = new Solver(problemPath, solutions, testcases, this.errors, config.timeout)
      await solver.solutionsHandle()
    }

    if (this.errors.length) {
      showErrorStack(this.errors)
      process.exitCode = 1
    }
  }
}

module.exports = Leetsolve

if (cluster.isMaster) {
  new Leetsolve().run()
}
