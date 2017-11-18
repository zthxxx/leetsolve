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

let problemPath = commad.input[0]
solve(problemPath, solvIndex, caseBase)

log(`工作进程 ${process.pid} 已启动`)

function solve (problemPath, solvIndex, caseBase = 0) {
  let solution = require(problemPath)
  let testcases = require(path.join(problemPath, config.casefile))
  if (solution instanceof Array) solution = solution[solvIndex]
  if (!solution) throw new Error(`not have solution with this index #${solvIndex}`)
  if (caseBase) testcases = testcases.splice(caseBase)
  for (let [caseIndex, { input }] of testcases.entries()) {
    let answer = solution(...input)
    let result = {
      index: caseBase + caseIndex,
      result: answer
    }
    if (cluster.isWorker) {
      cluster.worker.send(result)
    } else {
      log(result)
    }
  }
  log(`工作进程 ${process.pid} 正在退出`)
  cluster.worker.disconnect()
  cluster.worker.kill()
}
