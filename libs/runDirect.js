let isLoadDirectly = module.parent === require.main

if (isLoadDirectly) {
  const path = require('path')
  const Leetsolve = require('../test/master')
  let problemPath = path.dirname(require.main.filename)
  let problemBase = path.dirname(problemPath)
  let problem = path.basename(problemPath)
  let run = () => new Leetsolve(problemBase, [problem], 1).run()
  process.nextTick(run)
}
