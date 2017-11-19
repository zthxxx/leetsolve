const path = require('path')
const assert = require('assert')
const cluster = require('cluster')
const { redBright: red, greenBright: green } = require('chalk')
const {
  AssertException,
  TimeoutException
} = require('../libs/errors')
const { config, configName } = require('../libs/configs')


function forkSetup (problemPath, solvIndex, caseIndex) {
  let args = [
    'path', problemPath,
    '--config', configName,
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


class Solver {
  constructor (problemPath, solutions, testcases, errors) {
    this.problemPath = problemPath
    this.problem = path.basename(problemPath)
    this.solutions = solutions
    this.testcases = testcases
    this.solveName = ''
    this.solvIndex = 0
    this.caseIndex = 0
    this.errors = errors
  }

  workerFork (caseIndex = 0) {
    forkSetup(this.problemPath, this.solvIndex, caseIndex)
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

  async solutionsHandle () {
    let solutions = this.solutions
    for (let [solvIndex, solution] of solutions.entries()) {
      let solveName = solution.name || '[ANONYMOUS]'
      console.log('  ', '[solution]', solveName)
      this.solveName = solveName
      this.solvIndex = solvIndex
      await this.casesHandle()
      console.log()
    }
  }
}

module.exports = Solver
