require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * @param {TreeNode} root
 * @return {number[]}
 */
let averageOfLevels = function (root) {
  let average = []
  function dfs (root, depth = 0) {
    if (!root) return
    if (!average[depth]) average[depth] = []
    average[depth].push(root.val)
    dfs(root.left, depth + 1)
    dfs(root.right, depth + 1)
  }
  dfs(root)
  return average.map(vals => vals.reduce((a, b) => a + b) / vals.length)
}

module.exports = averageOfLevels

module.exports.before = levels => [TreeNode.gen(levels)]

