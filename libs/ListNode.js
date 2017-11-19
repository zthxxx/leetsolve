/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

class ListNode {
  constructor (val) {
    this.val = val
    this.next = null
    this.count = 0
  }

  static generate (array) {
    if (!array || !array.length) return null
    let head = new ListNode(array[0])
    let chain = head
    for (let val of array.slice(1)) {
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