require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * BST 找顺序找节点
 * 很明显可以非递归中序遍历
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
let kthSmallest = function (root, k) {
  if (!root || k <= 0) return 0
  let stack = []
  while (root || stack.length) {
    if (root) {
      stack.push(root)
      root = root.left
    } else {
      root = stack.pop()
      if (--k === 0) return root.val
      root = root.right
    }
  }
}

module.exports = kthSmallest

module.exports.before = (levels, k) => [TreeNode.gen(levels), k]

