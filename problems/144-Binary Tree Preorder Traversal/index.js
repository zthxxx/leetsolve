require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

function* preorder (node) {
  yield node.val
  if (node.left) yield node.left
  if (node.right) yield node.right
}

/**
 * 非递归遍历二叉树
 * @param {TreeNode} node
 * @param {function} visit
 * @yield {number}
 */
function* traverse (node, visit) {
  if (!node) return null
  let stack = [visit(node)]
  while (stack.length) {
    let { value, done } = stack[0].next()
    if (done) {
      stack.shift()
      continue
    }
    if (value instanceof TreeNode) {
      stack.unshift(visit(value))
    } else {
      yield value
    }
  }
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
let preorderTraversal = function (root) {
  return [...traverse(root, preorder)]
}

module.exports = preorderTraversal

module.exports.before = levels => [TreeNode.gen(levels)]

module.exports.after = [result => result || [], result => [...result]]
