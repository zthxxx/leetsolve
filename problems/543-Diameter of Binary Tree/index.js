require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

const max = Math.max

/**
 * 寻找最长路径
 * 最长可能可能有两种情况
 * 1. 不连通到根节点的路径 (其中左右各一种情况)
 * 2. 从左右子树到穿过根节点的路径
 *
 * 如果只是连通到根节点，那么能增加一条边 (因为只连了一棵子树)
 * 如果是通过根节点，那么就能增加两条边 (显然是连了两棵子树)
 * @param {TreeNode} root
 * @return {[number, number]} - 最长路径值，连通到根的路径长
 */
function longestPath (root) {
  if (!root) return [0, -1]
  if (!root.left && !root.right) return [0, 0]
  let [outLeft, conneLeft] = longestPath(root.left)
  let [outRight, conneRight] = longestPath(root.right)
  let conneRoot = max(conneLeft, conneRight) + 1
  let acrossRoot = conneLeft + conneRight + 2
  return [max(outLeft, outRight, acrossRoot), conneRoot]
}

/**
 * 和 #124 的最大和路径有些相似
 * @param {TreeNode} root
 * @return {number}
 */
let diameterOfBinaryTree = function (root) {
  return longestPath(root)[0]
}

module.exports = diameterOfBinaryTree

module.exports.before = levels => [TreeNode.gen(levels)]
