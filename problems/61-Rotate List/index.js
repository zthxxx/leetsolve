require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
let rotateRight = function (head, k) {
  if (!head || k <= 0) return head
  let last = head
  let len = 1
  while (last.next) {
    last = last.next
    len += 1
  }
  k = k % len
  if (k === 0) return head
  let cut = len - k - 1
  let p = head
  while (cut--) {
    p = p.next
  }
  last.next = head
  head = p.next
  last = p
  last.next = null
  return head
}

module.exports = rotateRight

rotateRight.before = (list, k) => [ListNode.gen(list), k]

rotateRight.after = [result => result || [], result => [...result]]
