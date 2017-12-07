require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

function* postorder (node) {
  if (node.left) yield node.left
  if (node.right) yield node.right
  yield node.val
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
let postorderTraversal_Iterator = function (root) {
  return [...traverse(root, postorder)]
}


/**
 * 不借助 Iterator 只用栈的一般写法
 * 道理不同于 #94 #144 的方式，前两者的写法根必然在右子树之前
 * 这里是把类似先序遍历的写法，但是把先序遍历的左右顺序倒过来
 * 首先，
 * 先序遍历时， 根 -> 左子树 -> 右子树
 * 后续遍历时， 左子树 -> 右子树 -> 根
 * 根在最后很麻烦，因为栈得容纳他的左右，都遍历完了才能把自己出栈
 * 假设我们把先序遍历完全倒过来，
 * 就成了， 根 -> 右子树 -> 左子树
 * 这样写法上就能和前序遍历相同了
 * 而根在前的访问方式有利于自身节点的出栈
 * 不同的处理只是这样的访问顺序完全时后序本身的倒序
 * 在保存访问顺序时只需要注意下这个倒序的处理
 * @param {TreeNode} root
 * @return {number[]}
 */
let postorderTraversal = function (root) {
  if (!root) return []
  let traversal = []
  let stack = [root]
  while (stack.length) {
    let now = stack.pop()
    traversal.unshift(now.val)
    if (now.left) stack.push(now.left)
    if (now.right) stack.push(now.right)
  }
  return traversal
}


module.exports = [
  postorderTraversal_Iterator,
  postorderTraversal
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]

module.exports.afterEach = [result => result || [], result => [...result]]
