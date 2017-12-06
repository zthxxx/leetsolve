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
   * @param {number} [val] - 节点的值，做补充头节点时可忽略
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
   * @param {number | null} [trackIndex] - 表示原链的尾节点的下一项要指向链中哪个序号的节点
   * 如参数 ([1,2,3,4,5], 3) 表示原本尾节点的下一项，
   * 现在指向第 4 个节点（序号为 3，值为 4）
   * 不传此项或超出序号则不成环
   * @returns {ListNode}
   */
  static gen (array, trackIndex = null) {
    if (!array || !array.length) return null
    let nodes = array.map(val => new this(val))
    nodes.reduce((last, next) => {
      last.next = next
      return next
    })
    if (trackIndex !== null) {
      let last = nodes[nodes.length - 1]
      last.next = nodes[trackIndex] || null
    }
    return nodes[0]
  }

  static* serial (head) {
    while (head) {
      yield head.val
      head = head.next
    }
  }

  * [Symbol.iterator] () {
    yield* this.constructor.serial(this)
  }

  toJSON () {
    return Array.from(this)
  }
}

module.exports = ListNode
