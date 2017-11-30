/**
 * Definition for singly-linked list with a random pointer.
 * function RandomListNode(label) {
 *     this.label = label;
 *     this.next = this.random = null;
 * }
 */

class RandomListNode {
  /**
   * creat a list node with random
   * @param {number} val
   * @return {RandomListNode}
   */
  constructor (val) {
    this.label = val
    /**
     * next or random point
     * @type {RandomListNode}
     */
    this.next = this.random = null
  }

  /**
   * generate RandomListNode chain
   * input val list, or [val, random index] list
   * @param {(number | [number, number])[]} array
   * @returns {RandomListNode}
   */
  static gen (array) {
    if (!array || !array.length) return null
    /**
     * @type {RandomListNode[]}
     */
    let nodes = array.map(item =>
      new RandomListNode(Array.isArray(item) ? item[0] : item)
    )
    nodes.reduce((last, now, i) => {
      last.next = now
      now.random = nodes[array[i][1]] || null
      return now
    }, new RandomListNode())
    return nodes[0]
  }

  static* serial (head) {
    let map = new Map()
    let p = head
    while (p) {
      map.set(p, map.size)
      p = p.next
    }
    while (head) {
      if (head.random) yield [head.label, map.get(head.random)]
      else yield head.label
      head = head.next
    }
  }

  * [Symbol.iterator] () {
    yield* RandomListNode.serial(this)
  }
}

module.exports = RandomListNode
