require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 朴素的思路，BST 转最小堆，方便每次取顶部最小值
 * 但是最小堆的取走顶端后排序也要 O(nlog(n)) time
 * 要满足 O(1) 的操作，只能是初始化后就整棵树排好序
 * 基于这种思路，当然是对 BST 中序遍历为有序
 * 在中序遍历中 yield 时间复杂度是 O(1)
 * 中序遍历中用到的栈深也是 O(h) h is height of tree
 * 所以符合要求
 * 这里借助原生 Iterator 实现
 */
class BSTIterator_naive {
  /**
   * @constructor
   * @param {TreeNode} root - root of the binary search tree
   */
  constructor (root) {
    this.iter = this.inorder(root)
    this.value = null
    this.done = false
    this.next()
  }

  * inorder (root) {
    if (!root) return
    yield* this.inorder(root.left)
    yield root.val
    yield* this.inorder(root.right)
  }

  /**
   * @this BSTIterator
   * @returns {boolean} - whether we have a next smallest number
   */
  hasNext () {
    return !this.done
  }

  /**
   * @this BSTIterator
   * @returns {number} - the next smallest number
   */
  next () {
    let last = this.value
    let { value, done } = this.iter.next()
    this.value = value
    this.done = done
    return last
  }
}


/**
 * 非递归中序遍历的实现 #94
 */
class BSTIterator {
  /**
   * @constructor
   * @param {TreeNode} root - root of the binary search tree
   */
  constructor (root) {
    this.now = root
    this.stack = []
  }

  /**
   * @this BSTIterator
   * @returns {boolean} - whether we have a next smallest number
   */
  hasNext () {
    return this.now || this.stack.length
  }

  /**
   * @this BSTIterator
   * @returns {number} - the next smallest number
   */
  next () {
    while (this.now || this.stack.length) {
      if (this.now) {
        this.stack.push(this.now)
        this.now = this.now.left
      } else {
        let now = this.stack.pop()
        this.now = now.right
        return now.val
      }
    }
  }
}

module.exports = [
  root => new BSTIterator_naive(root),
  root => new BSTIterator(root)
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]

/**
 * Your BSTIterator will be called like this:
 * var i = new BSTIterator(root), a = [];
 * while (i.hasNext()) a.push(i.next());
 */
module.exports.afterEach = i => {
  let a = []
  while (i.hasNext()) {
    a.push(i.next())
  }
  return a
}
