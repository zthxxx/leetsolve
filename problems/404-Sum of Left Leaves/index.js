require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * DFS 基本思路
 * 遍历一遍判断一遍是否是左叶子，是就累加
 * 是叶子的条件为无左右子树
 * 是左叶子的条件为是左孩子，且左孩子无左右子树
 * @param {TreeNode} root
 * @return {number}
 */
let sumOfLeftLeaves = function (root) {
  if (!root) return 0
  let sum = 0
  let left = root.left
  if (left && !left.left && !left.right) sum += left.val
  else sum += sumOfLeftLeaves(left)
  sum += sumOfLeftLeaves(root.right)
  return sum
}

module.exports = sumOfLeftLeaves

module.exports.before = levels => [TreeNode.gen(levels)]
