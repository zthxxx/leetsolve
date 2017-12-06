require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

let max = Math.max

/**
 * 分解问题
 * 当前节点的路径最大值，只可能是种情况
 * 1. 当前节点的值 加 左右子树各一条连通根到叶子的路径
 * 2. 左子树中不连通到根的路径的最大值
 *
 * 为了计算第一条中连通根到叶子的路径，
 * 这个递归函数需要每次向上返回一条连通路径的最大值
 * @param root
 * @return {[number, number]} - 当前树路劲的最大值，从叶子连通到根的最大总和
 */
function pathSum (root) {
  if (!root) return [-Infinity, -Infinity]
  let [outleft, conneleft] = pathSum(root.left)
  let [outright, conneright] = pathSum(root.right)

  let outRoot = root.val + max(conneleft, 0) + max(conneright, 0)
  let conneRoot = root.val + max(conneleft, conneright, 0)

  return [max(outleft, outright, outRoot), conneRoot]
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
let maxPathSum = function (root) {
  return pathSum(root)[0]
}

module.exports = maxPathSum

module.exports.before = levels => [TreeNode.gen(levels)]
