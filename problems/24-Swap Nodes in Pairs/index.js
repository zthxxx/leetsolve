require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let swapPairs = function (head) {
  if (!head) return null
  let p = new ListNode()
  p.next = head
  head = p
  while (p.next && p.next.next) {
    let front = p.next
    let late = front.next
    front.next = late.next
    late.next = front
    p.next = late
    p = p.next.next
  }
  return head.next
}

module.exports = swapPairs

swapPairs.before = list => [ListNode.gen(list)]

swapPairs.after = [result => result || [], result => [...result]]
