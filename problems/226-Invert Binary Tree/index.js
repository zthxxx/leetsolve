require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 经典题目翻转二叉树
 * Google: 90% of our engineers use the software you wrote (Homebrew),
 * but you can’t invert a binary tree on a whiteboard so fuck off.
 *
 * https://twitter.com/mxcl/status/608682016205344768
 * @param {TreeNode} root
 * @return {TreeNode}
 */
let invertTree = function (root) {
  if (!root) return null
  let { left, right } = root
  root.left = invertTree(right)
  root.right = invertTree(left)
  return root
}

/**
 * 既然这道题很简单，那我们试试非递归写法
 * @param {TreeNode} root
 * @return {TreeNode}
 */
let invertTree_II = function (root) {
  if (!root) return null
  let stack = [root]
  while (stack.length) {
    let node = stack.pop()
    let { left, right } = node
    node.left = right
    node.right = left
    if (left) stack.push(left)
    if (right) stack.push(right)
  }
  return root
}

module.exports = [
  invertTree,
  invertTree_II
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]

module.exports.afterEach = [result => result || [], result => [...result]]
