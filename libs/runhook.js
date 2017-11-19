const path = require('path')
const assert = require('assert')
const { greenBright: green } = require('chalk')
const { AssertException } = require('../libs/errors')

let isLoadDirectly = module.parent === require.main

function loadProblem () {
  let solutions = require.main.exports
  let problemPath = path.dirname(require.main.filename)
  let problem = path.basename(problemPath)

  if (!(solutions instanceof Function || Array.isArray(solutions))) {
    solutions = require(problemPath)
  }
  if (!Array.isArray(solutions)) solutions = [solutions]

  let casePath = path.join(problemPath, 'testcase.js')
  let testcases = require(casePath)
  return [problem, solutions, testcases]
}

function run (problem, solutions, testcases) {
  for (let solution of solutions) {
    let solveName = solution.name || '[ANONYMOUS]'
    console.log('  ', '[solution]', solveName)
    for (let [caseIndex, testcase] of testcases.entries()) {
      let { input, expect } = testcase
      let answer = solution(...testcase.input)
      let error = new AssertException({
        problem, solveName, caseIndex,
        input, answer, expect
      })
      assert.deepEqual(answer, expect, error.message)
      console.warn('    ', green('√'), 'case', caseIndex, 'tested ok!')
    }
  }
}

if (isLoadDirectly) {
  let injection = loadProblem()
  run(...injection)
}
