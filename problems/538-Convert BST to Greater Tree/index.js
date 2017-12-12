require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 中序遍历的倒序累加
 * @param {TreeNode} root
 * @param {number} prefix - 要累加的值
 * @return {number}
 */
function inreverse (root, prefix = 0) {
  if (!root) return prefix
  root.val += inreverse(root.right, prefix)
  return inreverse(root.left, root.val)
}

/**
 * BST 中序遍历为顺序
 * 这里 Greater Tree 也就是倒序依次累加
 * 所以就用中序遍历的倒序
 * @param {TreeNode} root
 * @return {TreeNode}
 */
let convertBST = function (root) {
  if (!root) return null
  inreverse(root, 0)
  return root
}

module.exports = convertBST

module.exports.before = levels => [TreeNode.gen(levels)]

module.exports.after = [result => result || [], result => [...result]]
