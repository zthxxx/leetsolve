const fs = require('fs')
const path = require('path')
const cluster = require('cluster')
const { CompileException, showErrorStack } = require('../libs/errors')
const { whiteBright: white, redBright: red, greenBright: green } = require('chalk')
const { config } = require('../libs/configs')
const Solver = require('./solver')

const getIndex = name => name.match(/\d+(?=-)/) || 0

const pathBase = path.join(__dirname, '..')
const problemBase = path.join(pathBase, config.problemBase)
const problems = fs.readdirSync(problemBase)
  .filter(item => fs.statSync(path.join(problemBase, item)).isDirectory())
  .sort((a, b) => getIndex(b) - getIndex(a))

class Leetsolve {
  constructor (problemBase, problems) {
    this.problemBase = problemBase
    this.problems = problems
    this.errors = []
  }

  async run () {
    let problemoks = 0
    let solveCount = 0
    let solveds = 0
    for (let problem of this.problems) {
      let problemPath = path.join(this.problemBase, problem)
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
      solveCount += solutions.length
      let solver = new Solver(problemPath, solutions, testcases, this.errors, config.timeout)
      let oks = await solver.solutionsHandle()
      solveds += oks
      if (oks === solutions.length) problemoks += 1
    }

    console.log()
    console.log('  Executed', white(`${problemoks} / ${this.problems.length}`), 'problems', green('SUCCESS'))
    console.log('  total', white(`${solveds} / ${solveCount}`), 'solutions', green('ok'))

    if (this.errors.length) {
      showErrorStack(this.errors)
      process.exitCode = 1
    }
  }
}

module.exports = Leetsolve

if (cluster.isMaster) {
  new Leetsolve(problemBase, problems).run()
}
