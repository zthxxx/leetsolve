const fs = require('fs')
const path = require('path')
const cluster = require('cluster')
const { showErrorStack } = require('../libs/errors')
const { whiteBright: white } = require('chalk')
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

      console.log(white('[problem]'), problem)

      let solutions = require(problemPath)
      let testcases = require(path.join(problemPath, config.casefile))
      if (!(solutions instanceof Array)) solutions = [solutions]

      let solver = new Solver(problemPath, solutions, testcases, this.errors)
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
