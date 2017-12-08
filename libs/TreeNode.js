/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

class TreeNode {
  /**
   * creat a tree node
   * @param {number} val
   * @return {TreeNode}
   */
  constructor (val) {
    this.val = val
    /**
     * left child point
     * @type {TreeNode}
     */
    this.left = null
    /**
     * right child point
     * @type {TreeNode}
     */
    this.right = null
  }

  /**
   * deserialize a binary tree
   * @param {number[]} levels
   * @return {TreeNode} root
   */
  static gen (levels) {
    if (!levels || !levels.length) return null
    /**
     * @type {TreeNode[]} nodes
     */
    let nodes = levels.map(val =>
      val !== null && new this(val) || null
    )
    for (let i = 0, j = 1; j < nodes.length; i++) {
      let node = nodes[i]
      if (node) {
        node.left = nodes[j++]
        node.right = nodes[j++] || null
      }
    }
    return nodes[0]
  }

  /**
   * level order traversal
   * @param {TreeNode} node
   * @yield {number} val
   */
  static* levorder (node) {
    let queue = [node]
    let valids = 1
    while (queue.length && valids > 0) {
      let now = queue.shift()
      if (now) {
        yield now.val
        valids += !!now.left + !!now.right - 1
        queue.push(now.left, now.right)
      } else {
        yield null
      }
    }
  }

  * [Symbol.iterator] () {
    yield* this.constructor.levorder(this)
  }

  toJSON () {
    return Array.from(this)
  }
}

module.exports = TreeNode
