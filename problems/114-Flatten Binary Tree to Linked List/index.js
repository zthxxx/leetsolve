require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 依旧 DFS 遍历
 * 把右子树串接在左子树后面
 * 效率有点差，左子树均要遍历两遍，总的来说还是 O(n)
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function flattenDFS (root) {
  if (!root) return null
  let left = flattenDFS(root.left)
  let right = flattenDFS(root.right)
  root.left = null
  root.right = left
  let p = root
  while (p.right) {
    p = p.right
  }
  p.right = right
  return root
}

/**
 * @param {TreeNode} root
 * @return {void | TreeNode} Do not return anything, modify root in-place instead.
 */
let flatten = function (root) {
  return flattenDFS(root)
}

module.exports = flatten

module.exports.before = levels => [TreeNode.gen(levels)]

module.exports.after = [result => result || [], result => [...result]]
