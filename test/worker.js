const path = require('path')
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

function solve (problemPath, solvIndex, caseIndex) {
  let solution = require(problemPath)
  let testcases = require(path.join(problemPath, TEST_CASE))
  if (solution instanceof Array) solution = solution[solvIndex]
  if (!solution) throw new Error(`not have solution with this index #${solvIndex}`)
  let casing = testcases[caseIndex]
  if (!casing) throw new Error(`not have testcase with this index #${caseIndex}`)
  let answer = solution(...casing.input)
  let result = { result: answer }
  if (process.send) {
    process.send(result)
  } else {
    console.log(result)
  }
  process.exit(0)
}
