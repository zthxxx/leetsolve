/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

class ListNode {
  /**
   * creat a list node
   * @param {number} val
   * @return {ListNode}
   */
  constructor (val) {
    this.val = val
    /**
     * next point
     * @type {ListNode}
     */
    this.next = null
  }

  /**
   * generate ListNode chain
   * @param {number[]} array
   * @returns {ListNode}
   */
  static gen (array) {
    if (!array || !array.length) return null
    let nodes = array.map(val => new ListNode(val))
    nodes.reduce((last, next) => {
      last.next = next
      return next
    })
    return nodes[0]
  }

  * [Symbol.iterator] () {
    let chain = this
    while (chain) {
      yield chain.val
      chain = chain.next
    }
  }

  toJSON () {
    return Array.from(this)
  }
}

module.exports = ListNode
