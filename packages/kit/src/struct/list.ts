export class ListNode {
  val: number
  next: ListNode | null

  constructor (val: number = 0, next: ListNode | null = null) {
    this.val = val
    this.next = next
  }

  /**
   * generate ListNode chain
   * trackIndex - 表示原链的尾节点的下一项要指向链中哪个序号的节点，以成环；
   * 如参数 ([1,2,3,4,5], 3) 最后的 3 表示原本尾节点的下一项
   * 现在指向第 4 个节点（序号为 3，值为 4）
   * 不传此项或超出序号则不成环
   */
  static gen (array: number[] | null, trackIndex: number | null = null): ListNode | null {
    if (!array) return null
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

  static* serial (head: ListNode | null) {
    while (head) {
      yield head.val
      head = head.next
    }
  }

  * [Symbol.iterator] () {
    // for class extends
    const constructor = this.constructor as typeof ListNode
    yield* constructor.serial(this)
  }

  toJSON () {
    return Array.from(this)
  }
}
