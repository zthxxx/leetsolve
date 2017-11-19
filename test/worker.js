const path = require('path')
const cluster = require('cluster')
const cli = require('cac')()

if (cluster.isMaster) { process.exit(1) }

cli.command('path', {
  desc: 'problem path'
}).option('config', {
  desc: 'config file path',
  type: 'string',
  default: '../config.js'
}).option('solve', {
  desc: 'solution index',
  type: 'number',
  default: 0
}).option('case', {
  desc: 'testcase index',
  type: 'number',
  default: 0
})

const commad = cli.parse(null, { run: false })

let { config: configFile, solve: solvIndex, case: caseBase } = commad.flags
const config = require(configFile)

const log = (...msg) => { if (config.workerDebug) console.warn(...msg) }

const problemPath = commad.input[0]
const casefile = config.casefile

log(`工作进程 ${process.pid} 已启动`)

class Worker {
  constructor (problemPath, casefile, solvIndex, caseBase) {
    this.solutions = []
    this.solution = null
    this.testcases = []
    this.initSolution(problemPath, casefile, solvIndex, caseBase)
    this.caseBase = caseBase
    this.beforeEachs = []
    this.befores = []
    this.afters = []
    this.afterEachs = []
    this.registerHooks(this.solutions)
    this.registerHook(this.solution)
  }

  initSolution (problemPath, casefile, solvIndex, caseBase) {
    this.solutions = require(problemPath)
    if (!(this.solutions instanceof Array)) this.solution = this.solutions
    else this.solution = this.solutions[solvIndex]
    if (!this.solution) throw new Error(`not have solution with this index #${solvIndex}`)
    this.testcases = require(path.join(problemPath, casefile))
    if (caseBase) this.testcases = this.testcases.slice(caseBase)
  }

  registerHooks (solutions) {
    if (!(solutions instanceof Array)) return
    let { beforeEach, afterEach } = solutions
    let hookBeforeEach = beforeEach => {
      let isArray = Array.isArray(beforeEach)
      if (isArray) this.beforeEachs.push(...beforeEach)
      else this.beforeEachs.push(beforeEach)
    }
    let hookAfterEach = afterEach => {
      let isArray = Array.isArray(afterEach)
      if (isArray) this.afterEachs.push(...afterEach)
      else this.afterEachs.push(afterEach)
    }
    if (beforeEach) hookBeforeEach(beforeEach)
    if (afterEach) hookAfterEach(afterEach)
  }

  registerHook (solution) {
    let { before, after } = solution
    let hookBefore = before => {
      let isArray = Array.isArray(before)
      if (isArray) this.befores.push(...before)
      else this.befores.push(before)
    }
    let hookAfter = after => {
      let isArray = Array.isArray(after)
      if (isArray) this.afters.push(...after)
      else this.afters.push(after)
    }
    if (before) hookBefore(before)
    if (after) hookAfter(after)
  }

  handleBefores (input) {
    let dealInput = this.beforeEachs.reduce((inWare, hook) => hook(...inWare), input)
    return this.befores.reduce((inWare, hook) => hook(...inWare), dealInput)
  }

  handleAfters (result) {
    let dealResult = this.afters.reduce((outWare, hook) => hook(outWare), result)
    return this.afterEachs.reduce((outWare, hook) => hook(outWare), dealResult)
  }

  timerHook (fn, args) {
    let now = Date.now()
    let result = fn(...args)
    let elapse = Date.now() - now
    return [result, elapse]
  }

  runSolve () {
    let { solution, testcases, timerHook } = this
    for (let [caseIndex, { input }] of testcases.entries()) {
      let inputArgs = this.handleBefores(input)
      let [answer, elapse] = timerHook(solution, inputArgs)
      answer = this.handleAfters(answer)
      let result = {
        index: this.caseBase + caseIndex,
        answer, elapse
      }
      if (cluster.isWorker) {
        cluster.worker.send(result)
      } else {
        log(result)
      }
    }
  }

  run () {
    this.runSolve()
    log(`工作进程 ${process.pid} 正在退出`)
    cluster.worker.disconnect()
    cluster.worker.kill()
  }
}

new Worker(problemPath, casefile, solvIndex, caseBase)
  .run()
