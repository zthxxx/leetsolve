const fs = require('fs')
const path = require('path')
const assert = require('assert')
const cluster = require('cluster')
const { whiteBright: white, redBright: red, greenBright: green } = require('chalk')

const TEST_CASE = 'testcase.js'
const pathBase = path.join(__dirname, '..', 'problems')
const problems = fs.readdirSync(pathBase)

function forkSetup (problemPath, solvIndex, caseIndex) {
  let args = [
    'path', problemPath,
    '--solve', solvIndex
  ]
  if (caseIndex) args.push(...['--case', caseIndex])
  cluster.setupMaster({
    exec: path.join(__dirname, 'worker.js'),
    args,
    silent: true
  })
}

function timelimit (worker, timeout = 2000) {
  return new Promise((resolve, reject) => {
    let waiting = setTimeout(() => {
      worker.process.kill('SIGKILL')
      reject(new Error(red(`worker timeout ${timeout}ms`)))
    }, timeout)
    worker.on('message', result => {
      clearTimeout(waiting)
      resolve(result)
    })
    worker.on('exit', () => {
      clearTimeout(waiting)
      if (worker.exitedAfterDisconnect) reject()
    })
  })
}

async function leetsolve () {
  let errors = []
  for (let problem of problems) {
    let problemPath = path.join(pathBase, problem)
    let solutions = require(problemPath)
    let testcases = require(path.join(problemPath, TEST_CASE))
    if (!(solutions instanceof Array)) solutions = [solutions]
    console.log(white('[problem]'), problem)
    for (let [solvIndex, solution] of solutions.entries()) {
      let solveName = solution.name || '[ANONYMOUS]'
      console.log('  ', '[solution]', solveName)
      forkSetup(problemPath, solvIndex)
      let worker = cluster.fork()
      let caseIndex = 0
      while (worker) {
        try {
          let { result: answer, index } = await timelimit(worker)
          caseIndex = index
          let { input, expect } = testcases[index]
          let errMessage = red(`

          Error at ${problem}:
            the solution ${solveName}
            with ${green('#' + (index + 1))} input ${green(JSON.stringify(input))}
            get answer ${green(JSON.stringify(answer))} , but expect ${green(JSON.stringify(expect))}

          `)

          assert.deepEqual(answer, expect, errMessage)
          console.warn('    ', green('√'), 'case', index + 1, 'tested ok!')
        } catch (e) {
          if (!e) {
            worker = null
            break
          }
          let { input, expect } = testcases[caseIndex]
          let timeoutMessage = red(`

          Error at ${problem}:
            the solution ${solveName}
            with ${green('#' + (caseIndex + 1))} input ${green(JSON.stringify(input))}
            expect ${green(JSON.stringify(expect))}, but execute timeout.

          `)
          if (e instanceof assert.AssertionError) {
            console.warn('    ', red('×'), 'case', caseIndex + 1, 'not expect')
            errors.push(e.message)
          } else if (e instanceof Error) {
            console.warn('    ', red('×'), 'case', caseIndex + 1, 'timeout')
            errors.push(timeoutMessage)
          }
          caseIndex += 1
          forkSetup(problemPath, solvIndex, caseIndex)
          worker = cluster.fork()
        }
      }
      console.log()
    }
  }
  for (let error of errors) console.error(error)
}

module.exports = leetsolve

if (cluster.isMaster) {
  leetsolve()
}
