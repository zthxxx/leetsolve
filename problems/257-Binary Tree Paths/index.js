require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 获取从根到叶子的所有数值路径
 * @param {TreeNode} root
 * @return {Array<number>[]}
 */
function findPaths (root) {
  if (!root) return []
  if (!root.left && !root.right) return [[root.val]]
  let lefts = findPaths(root.left)
  let rights = findPaths(root.right)
  let paths = [...lefts, ...rights]
  for (let path of paths) {
    path.unshift(root.val)
  }
  return [...lefts, ...rights]
}

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
let binaryTreePaths = function (root) {
  return findPaths(root).map(path => path.join('->'))
}

module.exports = binaryTreePaths

module.exports.before = levels => [TreeNode.gen(levels)]
