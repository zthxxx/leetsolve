require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 左右均深度优先递归构建子树森林
 * 再根据左右森林组合构建 root 节点森林
 * @param {number} start
 * @param {number} end
 * @return {TreeNode[]}
 */
function dfsGen (start, end) {
  if (start > end) return [null]
  let trees = []
  for (let i = start; i <= end; i++) {
    for (let left of dfsGen(start, i - 1)) {
      for (let right of dfsGen(i + 1, end)) {
        let root = new TreeNode(i)
        root.left = left
        root.right = right
        trees.push(root)
      }
    }
  }
  return trees
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
let generateTrees = function (n) {
  if (n <= 0) return []
  return dfsGen(1, n)
}

module.exports = generateTrees

module.exports.after = result => result.map(trees => trees && [...trees])
