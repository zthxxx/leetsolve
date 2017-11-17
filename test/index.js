const fs = require('fs')
const path = require('path')
const assert = require('assert')
const cluster = require('cluster')
const { whiteBright: white, redBright: red, greenBright: green } = require('chalk')

const TEST_CASE = 'testcase.js'
const pathBase = path.join(__dirname, '..', 'problems')
const problems = fs.readdirSync(pathBase)

function forkSetup (problemPath, solvIndex, caseIndex) {
  cluster.setupMaster({
    exec: path.join(__dirname, 'worker.js'),
    args: [
      'path', problemPath,
      '--solve', solvIndex,
      '--case', caseIndex
    ],
    silent: true
  })
}

function timelimit (worker, timeout = 2000) {
  return new Promise((resolve, reject) => {
    worker.on('message', result => resolve(result))
    setTimeout(() => {
      worker.disconnect()
      worker.kill()
      setTimeout(() => {
        if (!worker.isDead()) {
          worker.process.kill('SIGKILL')
        }
        reject(red('worker timeout'))
      }, 500)
    }, timeout)
  })
}

async function leetsolve () {
  for (let problem of problems) {
    let problemPath = path.join(pathBase, problem)
    let solutions = require(problemPath)
    let testcases = require(path.join(problemPath, TEST_CASE))
    if (!(solutions instanceof Array)) solutions = [solutions]
    console.log(white('[problem]'), problem)
    for (let [solvIndex, solution] of solutions.entries()) {
      let solveName = solution.name || '[ANONYMOUS]'
      console.log('  ', '[solution]', solveName)
      for (let [caseIndex, { input, expect }] of testcases.entries()) {
        forkSetup(problemPath, solvIndex, caseIndex)
        let worker = cluster.fork()
        let { result: answer } = await timelimit(worker)
        let errMessage = red(`

        Error at ${problem}:
          the solution ${solveName}
          with ${green('#' + (caseIndex + 1))} input ${green(JSON.stringify(input))}
          get answer ${green(JSON.stringify(answer))} , but expect ${green(JSON.stringify(expect))}

        `)
        assert.deepEqual(answer, expect, errMessage)
        console.log('    ', green('√'), 'case', caseIndex + 1, 'tested ok!')
      }
      console.log()
    }
  }
}

module.exports = leetsolve

if (cluster.isMaster) {
  leetsolve()
}
