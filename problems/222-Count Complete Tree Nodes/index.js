require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 直接 DFS 暴力遍历
 * O(n)
 * 然而 GG，TLE 了
 * @param {TreeNode} root
 * @return {number}
 */
let countNodes_DFS = function (root) {
  if (!root) return 0
  if (!root.left && !root.right) return 1
  return countNodes_DFS(root.left) + countNodes_DFS(root.right) + 1
}

/**
 * 遍历当然是可以解决
 * 但是考虑到完全二叉树的性质
 * 我们只需要知道树的深度和最下面一层的叶子数
 * 就能算出节点总数
 * 深度很好获取，左子树最左侧到底就是深度
 * 同时，如果顺着右子树最右侧一路下去到底的深度
 * 和最左侧到底的深度相同，那这棵树就是满二叉数
 * 节点数一定是 2^h - 1
 * 如果最右侧深度比最左侧小，
 * 那依然只能判定它是完全二叉树不是满树
 * 再考虑非满完全二叉树的性质，它的左子树或者右子树中，
 * 必然有且只有一棵是满二叉树
 * 所以我们只需要再顺着左子树的最右侧 或 右子树的最左侧深度
 * 找到非满的那棵树，继续再递归它，而另一棵树必然是满树，可以直接计算
 * @param {TreeNode} root
 * @return {number}
 */
let countNodes = function (root) {
  if (!root) return 0
  let rightRight = 0
  let { left, right } = root
  while (left && right) {
    rightRight += 1
    left = left.left
    right = right.right
  }
  let leftLeft = left ? rightRight + 1 : rightRight
  if (leftLeft === rightRight) return Math.pow(2, leftLeft + 1) - 1

  let leftRight = 0
  right = root.left
  while (right) {
    leftRight += 1
    right = right.right
  }
  if (leftLeft === leftRight) return Math.pow(2, leftLeft) + countNodes(root.right)
  return countNodes(root.left) + Math.pow(2, rightRight)
}

module.exports = [
  countNodes_DFS,
  countNodes
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]
