require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * DFS 递归即可
 * 找到路径的条件是无左右节点，且当前节点为需要的值
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
let hasPathSum = function (root, sum) {
  if (!root) return false
  let need = sum - root.val
  if (!need && !root.left && !root.right) return true
  return hasPathSum(root.left, need) || hasPathSum(root.right, need)
}

module.exports = hasPathSum

module.exports.before = (levels, sum) => [TreeNode.gen(levels), sum]
