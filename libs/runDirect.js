const path = require('path')
const { whiteBright: white } = require('chalk')
const { config } = require('./configs')
const { showErrorStack } = require('./errors')
const Solver = require('../test/solver')

let isLoadDirectly = module.parent === require.main

function loadProblem () {
  let solutions = require.main.exports
  let problemPath = path.dirname(require.main.filename)
  let problem = path.basename(problemPath)
  console.log(white('[problem]'), problem)

  if (!(solutions instanceof Function || Array.isArray(solutions))) {
    solutions = require(problemPath)
  }
  if (!Array.isArray(solutions)) solutions = [solutions]
  let casePath = path.join(problemPath, config.casefile)
  let testcases = require(casePath)
  return [problemPath, solutions, testcases]
}

async function run () {
  let errors = []
  let injection = loadProblem()
  let solver = new Solver(...injection, errors, config.timeout)
  await solver.solutionsHandle()
  if (errors.length) {
    showErrorStack(errors)
    process.exitCode = 1
  }
}

if (isLoadDirectly) process.nextTick(run)
