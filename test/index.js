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


function timelimit (worker, timeout = 2000) {
  return new Promise((resolve, reject) => {
    let waiting = setTimeout(() => {
      worker.process.kill('SIGKILL')
      reject(new TimeoutException({ timeout }))
    }, timeout)
    worker.removeAllListeners('message')
    worker.removeAllListeners('exit')
    worker.once('message', result => {
      clearTimeout(waiting)
      resolve(result)
    })
    worker.once('exit', () => {
      clearTimeout(waiting)
      if (worker.exitedAfterDisconnect) reject()
    })
  })
}

class Leetsolve {
  constructor () {
    this.problemPath = ''
    this.problem = ''
    this.solveName = ''
    this.solvIndex = 0
    this.caseIndex = 0
    this.testcases = []
    this.errors = []
  }

  forkSetup (problemPath, solvIndex, caseIndex) {
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

  workerFork (caseIndex = 0) {
    this.forkSetup(this.problemPath, this.solvIndex, caseIndex)
    let worker = cluster.fork()
    return worker
  }

  getAssertError ({ caseIndex, answer }) {
    let { input, expect } = this.testcases[caseIndex]
    return new AssertException({
      problem: this.problem,
      solveName: this.solveName,
      caseIndex: caseIndex + 1,
      input, answer, expect
    })
  }

  getTimeoutError ({ caseIndex }) {
    let { input, expect } = this.testcases[caseIndex]
    return new TimeoutException({
      problem: this.problem,
      solveName: this.solveName,
      caseIndex: caseIndex + 1,
      input, expect
    })
  }

  async casesHandle () {
    let caseIndex = 0
    let worker = this.workerFork()
    while (worker) {
      try {
        let { answer, index, elapse } = await timelimit(worker)
        let { expect } = this.testcases[caseIndex]
        let error = this.getAssertError({ caseIndex, answer })
        caseIndex = index + 1
        assert.deepEqual(answer, expect, error.message)
        console.warn('    ', green('√'), 'case', caseIndex, 'tested ok!', green(`(${elapse}ms)`))
      } catch (e) {
        if (!e) {
          worker = null
          break
        }
        if (e instanceof assert.AssertionError) {
          console.warn('    ', red('×'), 'case', caseIndex, 'not expect')
          this.errors.push(e.message)
        } else if (e instanceof TimeoutException) {
          let timeout = this.getTimeoutError({ caseIndex })
          this.errors.push(timeout.message)
          caseIndex += 1
          console.warn('    ', red('×'), 'case', caseIndex, 'timeout')
          worker = this.workerFork(caseIndex)
        }
      }
    }
  }

  async solutionsHandle (solutions) {
    for (let [solvIndex, solution] of solutions.entries()) {
      let solveName = solution.name || '[ANONYMOUS]'
      console.log('  ', '[solution]', solveName)
      this.solveName = solveName
      this.solvIndex = solvIndex
      await this.casesHandle()
      console.log()
    }
  }

  async run () {
    for (let problem of problems) {
      this.problem = problem
      let problemPath = path.join(problemBase, problem)
      this.problemPath = problemPath
      if (!fs.statSync(problemPath).isDirectory()) continue

      console.log(white('[problem]'), problem)

      let solutions = require(problemPath)
      this.testcases = require(path.join(problemPath, config.casefile))
      if (!(solutions instanceof Array)) solutions = [solutions]

      await this.solutionsHandle(solutions)
    }

    if (this.errors.length) {
      console.error()
      console.error(
        '      ',
        '****************** ERRORS ******************'
      )
      for (let error of this.errors) console.error(error)
      console.error(
        '    ',
        '--------',
        `Total happened ${this.errors.length} errors!`,
        '--------'
      )
      console.error()
      process.exitCode = 1
    }
  }
}

module.exports = Leetsolve

if (cluster.isMaster) {
  new Leetsolve().run()
}
