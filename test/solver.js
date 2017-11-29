const path = require('path')
const assert = require('assert')
const cluster = require('cluster')
const {
  WrongAnswerException,
  TimeLimitException
} = require('../libs/errors')
const { redBright: red, greenBright: green } = require('chalk')
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


class Solver {
  constructor (problemPath, solutions, testcases, errors, timeout = 2000) {
    this.problemPath = problemPath
    this.problem = path.basename(problemPath)
    this.solutions = solutions
    this.solution = null
    this.testcases = testcases
    this.solveName = ''
    this.solvIndex = 0
    this.caseIndex = 0
    this.timeout = timeout
    this.worker = null
    this.oks = 0
    this.errors = errors
  }

  workerFork (caseIndex = 0) {
    forkSetup(this.problemPath, this.solvIndex, caseIndex)
    return cluster.fork()
  }

  getAssertError ({ caseIndex, answer }) {
    let { input, expect } = this.testcases[caseIndex]
    return new WrongAnswerException({
      problem: this.problem,
      solveName: this.solveName,
      caseIndex: caseIndex + 1,
      input, answer, expect
    })
  }

  getTimeoutError ({ caseIndex }) {
    let { input, expect } = this.testcases[caseIndex]
    return new TimeLimitException({
      problem: this.problem,
      solveName: this.solveName,
      caseIndex: caseIndex + 1,
      input, expect
    })
  }

  consumer () {
    let { worker } = this
    let timeout = this.solution.timeout || this.solutions.timeout || this.timeout
    let timelimit = () => setTimeout(
      () => worker.process.kill('SIGKILL'),
      timeout
    )
    let waiting = timelimit()

    worker.on('message', result => {
      clearTimeout(waiting)
      waiting = timelimit()
      this.onResult(result)
    })

    return new Promise(resolve => {
      worker.on('exit', () => {
        clearTimeout(waiting)
        if (worker.exitedAfterDisconnect) {
          this.worker = null
        } else {
          this.onTimeout()
          this.worker = this.workerFork(this.caseIndex)
        }
        resolve()
      })
    })
  }

  onResult (result) {
    let { answer, index, elapse } = result
    let { expect } = this.testcases[index]
    let error = this.getAssertError({ caseIndex: index, answer })
    this.caseIndex = index + 1
    try {
      assert.deepEqual(answer, expect, error.message)
      console.warn('    ', green('√'), 'case', this.caseIndex, 'tested ok!', green(`(${elapse}ms)`))
    } catch (e) {
      console.warn('    ', red('×'), 'case', this.caseIndex, 'not expect', red(`(${elapse}ms)`))
      this.errors.push(e.message)
    }
  }

  onTimeout () {
    let timeout = this.getTimeoutError({ caseIndex: this.caseIndex })
    this.errors.push(timeout.message)
    this.caseIndex += 1
    console.warn('    ', red('×'), 'case', this.caseIndex, 'timeout')
  }

  async solutionsHandle () {
    let solutions = this.solutions
    for (let [solvIndex, solution] of solutions.entries()) {
      let solveName = solution.name || '[ANONYMOUS]'
      console.log('  ', '[solution]', solveName)
      this.solution = solution
      this.solveName = solveName
      this.solvIndex = solvIndex
      let errorlen = this.errors.length
      this.worker = this.workerFork()
      while (this.worker) {
        await this.consumer()
      }
      if (errorlen === this.errors.length) this.oks += 1
    }
    return this.oks
  }
}

module.exports = Solver
