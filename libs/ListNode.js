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
    let head = new ListNode(array[0])
    let chain = head
    for (let i = 1; i < array.length; i++) {
      let val = array[i]
      chain.next = new ListNode(val)
      chain = chain.next
    }
    return head
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
