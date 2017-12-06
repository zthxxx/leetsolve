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
    let nodes = levels.map(val => {
      if (val === null) {
        return null
      } else {
        return new this(val)
      }
    })
    let kids = nodes.concat()
    let root = kids.shift()
    for (let node of nodes) {
      if (node !== null) {
        if (kids.length) node.left = kids.shift()
        if (kids.length) node.right = kids.shift()
      }
    }
    return root
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
        valids -= 1
        if (now.left) valids += 1
        if (now.right) valids += 1
        queue.push(now.left)
        queue.push(now.right)
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
