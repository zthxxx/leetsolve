require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * DFS 依次计算树的节点和
 * 再把和的次数保存在 map 中
 * O(n) time
 * @param {TreeNode} root
 * @param {Map} map
 * @return {number} - sum of tree nodes
 */
function dfsSum (root, map) {
  if (!root) return 0
  let sum = root.val
  sum += dfsSum(root.left, map)
  sum += dfsSum(root.right, map)
  map.set(sum, (map.get(sum) || 0) + 1)
  return sum
}

/**
 * DFS 遍历，用 map 保存子树和
 * @param {TreeNode} root
 * @return {number[]}
 */
let findFrequentTreeSum = function (root) {
  if (!root) return []
  let map = new Map()
  dfsSum(root, map)
  let countMax = Math.max(...map.values())
  let sums = []
  for (let [key, count] of map.entries()) {
    if (count === countMax) sums.push(key)
  }
  return sums
}

module.exports = findFrequentTreeSum

module.exports.before = levels => [TreeNode.gen(levels)]

module.exports.after = sums => sums.sort((a, b) => a - b)
