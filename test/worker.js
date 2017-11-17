const path = require('path')
const cluster = require('cluster')
const cli = require('cac')()

const TEST_CASE = 'testcase.js'

console.warn(`工作进程 ${process.pid} 已启动`)

cli.command('path', {
  desc: 'problem path'
}, (paths, flags) => {
  solve(paths[0], flags.solve, flags.case)
}).option('solve', {
  desc: 'solution index',
  type: 'number',
  default: 0
}).option('case', {
  desc: 'testcase index',
  type: 'number',
  default: 0
})

cli.parse()

function solve (problemPath, solvIndex, caseBase = 0) {
  let solution = require(problemPath)
  let testcases = require(path.join(problemPath, TEST_CASE))
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
      console.log(result)
    }
  }
  console.warn(`工作进程 ${process.pid} 正在退出`)
  cluster.worker.disconnect()
  cluster.worker.kill()
}
