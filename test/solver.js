const path = require('path')
const assert = require('assert')
const {
  WrongAnswerException,
  TimeLimitException
} = require('../libs/errors')
const { redBright: red, greenBright: green } = require('chalk')

class Solver {
  constructor (problemPath, solutions, testcases, worker, reboot, timeout = 2000) {
    this.problemPath = problemPath
    this.problem = path.basename(problemPath)
    this.solutions = solutions
    this.testcases = testcases
    this.solveIndex = 0
    this.caseIndex = -1
    this.worker = worker
    this.reboot = reboot
    this.timeout = timeout
    this.feedback = solutions.map(solver => ({
      solver: solver.name || '[ANONYMOUS]',
      feedback: []
    }))
    this.caseStatus = solutions.map(() => [])
    this.errors = []
  }

  getAssertError (answer) {
    let caseIndex = this.caseIndex
    let { input, expect } = this.testcases[caseIndex]
    let solveName = this.solutions[this.solveIndex].name || '[ANONYMOUS]'
    return new WrongAnswerException({
      problem: this.problem,
      solveName,
      caseCount: caseIndex + 1,
      input, answer, expect
    })
  }

  getTimeoutError (timeout) {
    let caseIndex = this.caseIndex
    let { input, expect } = this.testcases[caseIndex]
    let solveName = this.solutions[this.solveIndex].name || '[ANONYMOUS]'
    return new TimeLimitException({
      problem: this.problem,
      solveName,
      caseCount: caseIndex + 1,
      input, expect,
      timeout
    })
  }

  onResult (result) {
    let { solve, cased, answer, elapse } = result
    this.solveIndex = solve
    this.caseIndex = cased
    let { expect } = this.testcases[cased]
    let { feedback } = this
    try {
      assert.deepEqual(answer, expect)
      this.caseStatus[solve].push(true)
      let tip = ['    ', green('√'), 'case', cased + 1, 'tested ok!', green(`(${elapse}ms)`)]
      feedback[solve].feedback.push(tip)
    } catch (e) {
      this.caseStatus[solve].push(false)
      let tip = ['    ', red('×'), 'case', cased + 1, 'not expect', red(`(${elapse}ms)`)]
      feedback[solve].feedback.push(tip)
      let error = this.getAssertError(answer)
      this.errors.push(error.message)
    }
  }

  onTimeout (timeout) {
    let { caseStatus, feedback, solveIndex } = this
    caseStatus[solveIndex].push(false)
    this.caseIndex += 1
    let tip = ['    ', red('×'), 'case', this.caseIndex + 1, 'timeouted, elapse more than', red(`${timeout}ms`)]
    feedback[solveIndex].feedback.push(tip)
    let error = this.getTimeoutError(timeout)
    this.errors.push(error.message)
  }

  consumer () {
    let { worker, problemPath, solutions, solveIndex, caseIndex } = this
    let solution = solutions[solveIndex]
    let timeout = solution.timeout || solutions.timeout || this.timeout
    let timelimit = () => setTimeout(
      () => worker.process.kill('SIGKILL'),
      timeout
    )
    let promise = new Promise((resolve, reject) => {
      let waiting = timelimit()
      worker.on('message', result => {
        clearTimeout(waiting)
        if (result.done) return resolve()
        waiting = timelimit()
        this.onResult(result)
      })

      worker.on('exit', () => {
        clearTimeout(waiting)
        this.onTimeout(timeout)
        reject()
      })
    })
    worker.send({
      problemPath,
      solveBase: solveIndex,
      caseBase: caseIndex + 1
    })
    return promise
  }

  async run () {
    while (true) {
      try {
        await this.consumer()
        this.worker.removeAllListeners()
        break
      } catch (e) {
        this.worker = this.reboot(this.worker.id)
      }
    }
    let { feedback, errors } = this
    let status = this.caseStatus
      .map(status => status.every(item => item))
    return { status, feedback, errors }
  }
}

module.exports = Solver
