const fs = require('fs')
const path = require('path')
const assert = require('assert')
const { whiteBright: white, redBright: red, greenBright: green } = require('chalk')

const TEST_CASE = 'testcase.js'
const pathBase = path.join(__dirname, '..')
const problemPath = path.resolve(pathBase, 'problems')
const problems = fs.readdirSync(problemPath)

for (let problem of problems) {
  let solutions = require(path.join(problemPath, problem))
  let testcases = require(path.join(problemPath, problem, TEST_CASE))
  if (!(solutions instanceof Array)) solutions = [solutions]
  console.log(white('[problem]'), problem)
  for (let solution of solutions) {
    let solveName = solution.name || '[ANONYMOUS]'
    console.log('  ', '[solution]', solveName)
    for (let [index, { input, expect }] of testcases.entries()) {
      let answer = solution(...input)
      index += 1
      assert.deepEqual(answer, expect, red(`

      Error at ${problem}:
        the solution ${solveName}
        with ${green('#' + index)} input ${green(JSON.stringify(input))}
        get answer ${green(JSON.stringify(answer))} , but expect ${green(JSON.stringify(expect))}

      `))
      console.log('    ', green('√'), 'case', index, 'tested ok!')
    }
    console.log()
  }
}
