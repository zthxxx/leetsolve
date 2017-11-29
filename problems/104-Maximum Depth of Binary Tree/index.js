require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 用 DFS 简单遍历一下可得
 * @param {TreeNode} root
 * @return {number}
 */
let maxDepth = function (root) {
  if (!root) return 0
  let l = maxDepth(root.left)
  let r = maxDepth(root.right)
  return Math.max(l, r) + 1
}

module.exports = maxDepth

module.exports.before = levels => [TreeNode.gen(levels)]
