const path = require('path')
const { config } = require('../libs/configs')
const log = (...msg) => { if (config.workerDebug) console.warn(...msg) }


let arrayFrom = any => any && (Array.isArray(any) ? any : [any]) || []

class Problem {
  constructor (problemPath, casefile, solveBase = 0, caseBase = 0) {
    this.beforeEachs = []
    this.afterEachs = []
    this.solveBase = solveBase
    this.caseBase = caseBase
    this.solutions = require(problemPath)
    this.testcases = require(path.join(problemPath, casefile))
    this.initialize()
  }

  initialize () {
    let { solveBase, caseBase } = this
    this.registerHooks(this.solutions)
    if (!Array.isArray(this.solutions)) this.solutions = [this.solutions]
    if (solveBase) this.solutions = this.solutions.slice(solveBase)
    if (caseBase) this.testcases = this.testcases.slice(caseBase)
  }

  registerHooks (solutions) {
    if (!Array.isArray(solutions)) return
    let { beforeEach, afterEach } = solutions
    this.beforeEachs = arrayFrom(beforeEach)
    this.afterEachs = arrayFrom(afterEach)
  }

  registerHook (solution) {
    let { before, after } = solution
    return [arrayFrom(before), arrayFrom(after)]
  }

  handleBefores (input, befores) {
    let hook = (inputs, deal) => deal(...inputs)
    let dealInput = this.beforeEachs.reduce(hook, input)
    return befores.reduce(hook, dealInput)
  }

  handleAfters (result, afters) {
    let hook = (output, deal) => deal(output)
    let dealResult = afters.reduce(hook, result)
    return this.afterEachs.reduce(hook, dealResult)
  }

  timerMeasure (fn, args) {
    let now = Date.now()
    let result = fn(...args)
    let elapse = Date.now() - now
    return [result, elapse]
  }

  * solve () {
    let { solutions, testcases, timerMeasure } = this
    for (let [solverIndex, solution] of solutions.entries()) {
      let [befores, afters] = this.registerHook(solution)
      for (let [caseIndex, { input }] of testcases.entries()) {
        let inputArgs = this.handleBefores(input, befores)
        let [answer, elapse] = timerMeasure(solution, inputArgs)
        answer = this.handleAfters(answer, afters)
        let result = {
          solve: this.solveBase + solverIndex,
          cased: this.caseBase + caseIndex,
          answer,
          elapse
        }
        yield result
      }
    }
  }
}


class Worker {
  constructor (casefile) {
    this.casefile = casefile
  }

  runSolve ({ problemPath, solveBase, caseBase }) {
    let problem = new Problem(problemPath, this.casefile, solveBase, caseBase)
    for (let result of problem.solve()) {
      process.send(result)
    }
    process.send({ done: true })
  }

  listen () {
    let deal = workArgs => this.runSolve(workArgs)
    process.on('message', deal)
  }
}

log(`工作进程 ${process.pid} 已启动`)

new Worker(config.casefile).listen()
