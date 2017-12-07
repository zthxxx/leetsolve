require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

function* inorder (node) {
  if (node.left) yield node.left
  yield node.val
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
 * 借助 Iterator 保存访问一课树时未访问完的部分
 * @param {TreeNode} root
 * @return {number[]}
 */
let inorderTraversal_Iterator = function (root) {
  return [...traverse(root, inorder)]
}

/**
 * 不借助 Iterator 只用栈的一般写法
 * 用栈保存当前节点
 * 当前节点入栈后再访问左子树
 * 左子树为空后就出栈栈顶，栈顶元素一定是刚才最后访问的节点
 * 而这个节点的左子树已经被访问过了
 * 现在中序遍历就是访问它自身再访问右子树
 * @param {TreeNode} root
 * @return {number[]}
 */
let inorderTraversal = function (root) {
  let now = root
  let traversal = []
  let stack = []
  while (now || stack.length) {
    if (now) {
      stack.push(now)
      now = now.left
    } else {
      now = stack.pop()
      traversal.push(now.val)
      now = now.right
    }
  }
  return traversal
}

module.exports = [
  inorderTraversal_Iterator,
  inorderTraversal
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]

module.exports.afterEach = [result => result || [], result => [...result]]
