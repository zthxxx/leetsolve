const fs = require('fs')
const path = require('path')
const assert = require('assert')
const cluster = require('cluster')
const cli = require('cac')()
const { whiteBright: white, redBright: red, greenBright: green } = require('chalk')
const {
  AssertException,
  TimeoutException
} = require('../libs/errors')

cli.option('config', {
  desc: 'config file path',
  type: 'string',
  default: 'config.js'
})
const commad = cli.parse(null, { run: false })

const pathBase = path.join(__dirname, '..')

const configFile = path.join(pathBase, commad.flags.config)
const config = require(configFile)

const problemBase = path.join(pathBase, config.problemBase)
const problems = fs.readdirSync(problemBase)

function forkSetup (problemPath, solvIndex, caseIndex) {
  let args = [
    'path', problemPath,
    '--config', configFile,
    '--solve', solvIndex
  ]
  if (caseIndex) args.push(...['--case', caseIndex])
  cluster.setupMaster({
    exec: path.join(__dirname, 'worker.js'),
    args,
    silent: !config.workerLog
  })
}

function timelimit (worker, timeout = 2000) {
  return new Promise((resolve, reject) => {
    let waiting = setTimeout(() => {
      worker.process.kill('SIGKILL')
      reject(new TimeoutException({ timeout }))
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
    let problemPath = path.join(problemBase, problem)
    if (!fs.statSync(problemPath).isDirectory()) continue
    let solutions = require(problemPath)
    let testcases = require(path.join(problemPath, config.casefile))
    if (!(solutions instanceof Array)) solutions = [solutions]
    console.log(white('[problem]'), problem)
    for (let [solvIndex, solution] of solutions.entries()) {
      let solveName = solution.name || '[ANONYMOUS]'
      console.log('  ', '[solution]', solveName)
      forkSetup(problemPath, solvIndex)
      let worker = cluster.fork()
      let caseIndex = -1
      while (worker) {
        try {
          let { result: answer, index } = await timelimit(worker)
          caseIndex = index
          let { input, expect } = testcases[index]
          let error = new AssertException({ problem, solveName, caseIndex, input, answer, expect })
          assert.deepEqual(answer, expect, error.message)
          console.warn('    ', green('√'), 'case', index + 1, 'tested ok!')
        } catch (e) {
          if (!e) {
            worker = null
            break
          }
          if (e instanceof assert.AssertionError) {
            console.warn('    ', red('×'), 'case', caseIndex + 1, 'not expect')
            errors.push(e.message)
          } else if (e instanceof TimeoutException) {
            caseIndex += 1
            console.warn('    ', red('×'), 'case', caseIndex + 1, 'timeout')
            let { input, expect } = testcases[caseIndex]
            let timeout = new TimeoutException({ problem, solveName, caseIndex, input, expect })
            errors.push(timeout.message)
            forkSetup(problemPath, solvIndex, caseIndex + 1)
            worker = cluster.fork()
          }
        }
      }
      console.log()
    }
  }
  if (errors.length) {
    console.error()
    console.error('******** ERRORS ********')
    for (let error of errors) console.error(error)
  }
}

module.exports = leetsolve

if (cluster.isMaster) {
  leetsolve()
}
