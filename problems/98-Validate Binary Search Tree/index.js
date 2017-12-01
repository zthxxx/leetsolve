require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 类似于中序遍历
 * 先判断左右值
 * 再分别判断左右子树
 * 判断值的时候有一个限制范围
 * 比如左子树所有节点的最大值不能超过父节点的值
 * 右子树所有节点的最小值不能小于父节点
 * 为了限制深层的节点值，在递归的时候传一个 min max 的范围
 * @param {TreeNode} root
 * @param {number} min
 * @param {number} max
 * @return {boolean}
 */
let isValidBST = function (root, min = -Infinity, max = Infinity) {
  if (!root) return true
  let { left, val, right } = root
  if (left) {
    if (left.val <= min || left.val >= val) return false
  }
  if (right) {
    if (right.val <= val || right.val >= max) return false
  }
  return isValidBST(left, min, val) &&
    isValidBST(right, val, max)
}

module.exports = isValidBST

module.exports.before = levels => [TreeNode.gen(levels)]
