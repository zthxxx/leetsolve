const path = require('path')
const { whiteBright: white } = require('chalk')
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

  let casePath = path.join(problemPath, 'testcase.js')
  let testcases = require(casePath)
  return [problemPath, solutions, testcases]
}

async function run () {
  let errors = []
  let injection = loadProblem()
  let solver = new Solver(...injection, errors)
  await solver.solutionsHandle()
  if (errors.length) {
    showErrorStack(errors)
    process.exitCode = 1
  }
}

if (isLoadDirectly) run()
