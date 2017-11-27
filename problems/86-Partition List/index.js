require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
let partition = function (head, x) {
  if (!head || !head.next) return head
  let left = new ListNode()
  let right = new ListNode()
  let lastL = left
  let lastR = right
  while (head) {
    if (head.val < x) {
      lastL.next = head
      lastL = lastL.next
    } else {
      lastR.next = head
      lastR = lastR.next
    }
    head = head.next
  }
  lastR.next = null
  lastL.next = right.next
  return left.next
}

module.exports = partition

partition.before = (list, k) => [ListNode.gen(list), k]

partition.after = [result => result || [], result => [...result]]
