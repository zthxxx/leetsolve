require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let removeNthFromEnd = function (head, n) {
  if (!head || !n) return null
  let front = head
  while (n > 0 && front.next) {
    front = front.next
    n -= 1
  }
  let late = head
  while (front.next) {
    front = front.next
    late = late.next
  }
  if (late === head && n > 0) {
    head = head.next
  } else {
    late.next = late.next.next
  }
  return head
}

removeNthFromEnd.before = (list, n) => [ListNode.generate(list), n]

removeNthFromEnd.after = [result => result || [], result => [...result]]

module.exports = removeNthFromEnd
