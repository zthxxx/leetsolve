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
let preorderTraversal_Iterator = function (root) {
  return [...traverse(root, preorder)]
}


/**
 * 不借助 Iterator 只用栈的一般写法
 * 用栈保存当前访问的节点
 * 当前节点入栈后再访问左子树
 * 左子树为空后就出栈栈顶，栈顶元素一定是刚才最后访问的节点
 * 而这个节点本身和其左子树已经被访问过了，只需要再访问右子树
 * @param {TreeNode} root
 * @return {number[]}
 */
let preorderTraversal = function (root) {
  let now = root
  let traversal = []
  let stack = []
  while (now || stack.length) {
    if (now) {
      traversal.push(now.val)
      stack.push(now)
      now = now.left
    } else {
      now = stack.pop()
      now = now.right
    }
  }
  return traversal
}

/**
 * 不借助 Iterator 只用栈的一般写法
 * 前序遍历的顺序， 根 -> 左子树 -> 右子树
 * 用栈来保存子树的顺序
 * 因为前序，所以总的出栈顺序是 根 -> 左子树 -> 右子树
 * 所以入栈顺序就是 右子树 -> 左子树 -> 根
 * 其实根一般是出栈的元素，
 * 所以实际的要入栈的顺序是 右子树 -> 左子树
 * 之后出栈的元素其实是下一次要访问的树的根了
 * 写法上比上一种方案简洁
 * @param {TreeNode} root
 * @return {number[]}
 */
let preorderTraversal_II = function (root) {
  if (!root) return []
  let traversal = []
  let stack = [root]
  while (stack.length) {
    let now = stack.pop()
    traversal.push(now.val)
    if (now.right) stack.push(now.right)
    if (now.left) stack.push(now.left)
  }
  return traversal
}

module.exports = [
  preorderTraversal_Iterator,
  preorderTraversal,
  preorderTraversal_II
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]

module.exports.afterEach = [result => result || [], result => [...result]]
