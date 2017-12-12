const path = require('path')
const { whiteBright: white, redBright: red, greenBright: green } = require('chalk')
const { CompileException, showErrorStack } = require('../libs/errors')
const { config } = require('../libs/configs')
const Solver = require('./solver')
const Pool = require('./pool')


class Leetsolve {
  constructor (problemBase, problems, poolsize) {
    this.problemBase = problemBase
    this.problems = problems
    this.pool = new Pool(Math.min(problems.length, poolsize))
    this.solversTotal = 0
    this.successes = {
      problems: 0,
      solvers: 0
    }
    this.errors = []
    this.created = Date.now()
  }

  loadProblem (problem) {
    let problemPath = path.join(this.problemBase, problem)
    try {
      let solutions = require(problemPath)
      let testcases = require(path.join(problemPath, config.casefile))
      return [solutions, testcases]
    } catch (e) {
      if (e instanceof SyntaxError) {
        let error = new CompileException({ problem, stack: e.stack })
        this.errors.push(error.message)
        console.log()
        console.warn(white('[problem]'), red('×'), white(problem), 'solutions Compile Error')
        return []
      }
      throw e
    }
  }

  showSuccessTotal () {
    let { problems, solversTotal, successes } = this
    console.log()
    console.log('  Executed', white(`${successes.problems} / ${problems.length}`), 'problems', green('SUCCESS'))
    console.log('  total', white(`${successes.solvers} / ${solversTotal}`), 'solutions', green('ok'))
    console.log('  passing', Date.now() - this.created, 'ms')
  }

  showProblemTips (problem, status, feedback) {
    console.log()
    console.log(white('[problem]'), white(problem))
    for (let [index, feed] of feedback.entries()) {
      let flag = status[index] ? green('√') : red('×')
      console.log('  ', '[solution]', flag, feed.solver)
      if (config.testcaseTips) {
        feed.feedback.map(tip => console.log(...tip))
      }
    }
  }

  statistics (problem, status, feedback, errors) {
    this.successes.solvers += status.reduce((last, next) => last + next)
    this.solversTotal += status.length
    if (errors.length) this.errors.push(...errors)
    else this.successes.problems += 1
    if (config.problemTips) this.showProblemTips(problem, status, feedback)
  }

  async distribute (problem, worker) {
    let [solutions, testcases] = this.loadProblem(problem)
    if (!solutions || !testcases) return this.pool.idle(worker.id)
    if (!Array.isArray(solutions)) solutions = [solutions]
    let problemPath = path.join(this.problemBase, problem)
    let solver = new Solver(
      problemPath, solutions, testcases,
      worker, id => this.pool.reset(id),
      config.timeout, config.timewarn
    )
    let { pid, status, feedback, errors } = await solver.run()
    this.pool.idle(pid)
    this.statistics(problem, status, feedback, errors)
  }

  async run () {
    let tasks = []
    let join = tasks => Promise.all(tasks)
    for (let problem of this.problems) {
      let worker = await this.pool.get()
      let task = this.distribute(problem, worker)
      tasks.push(task)
    }
    await join(tasks)

    if (this.errors.length) {
      showErrorStack(this.errors)
      process.exitCode = 1
    }

    this.showSuccessTotal()
    this.pool.clear()
  }
}

module.exports = Leetsolve
