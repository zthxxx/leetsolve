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
        console.warn(red('×'), white('[problem]'), white(problem), 'solutions Compile Error')
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
  }

  showProblemTips (problem, feedback) {
    console.log()
    console.log(white('[problem]'), white(problem))
    for (let feed of feedback) {
      console.log('  ', '[solution]', feed.solver)
      feed.feedback.map(tip => console.log(...tip))
    }
  }

  async distribute (problem, worker) {
    let [solutions, testcases] = this.loadProblem(problem)
    if (!solutions || !testcases) return this.pool.idle(worker)
    if (!Array.isArray(solutions)) solutions = [solutions]
    let problemPath = path.join(this.problemBase, problem)
    let solver = new Solver(problemPath, solutions, testcases, worker, id => this.pool.reset(id), config.timeout)
    let { feedback, accpet, total, errors } = await solver.run()
    this.pool.idle(worker)

    this.successes.solvers += accpet
    this.solversTotal += total
    if (errors.length) this.errors.push(...errors)
    else this.successes.problems += 1
    this.showProblemTips(problem, feedback)
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
    this.pool.clear()

    if (this.errors.length) {
      showErrorStack(this.errors)
      process.exitCode = 1
    }

    this.showSuccessTotal()
  }
}

module.exports = Leetsolve
