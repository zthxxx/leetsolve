require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * 反转链表开头的 n 个结点
 * @param {ListNode} head
 * @param {number} len
 * @returns {[ListNode,ListNode]}
 */
function reverseChain (head, len) {
  if (len <= 1 || !head) return [head, head]
  for (let i = 0, p = head; i < len; i++) {
    if (!p) return [head, head]
    p = p.next
  }
  let now = head
  let next = head.next
  let end = head
  // while (next) {
  for (let i = 0; i < len - 1; i++) {
    let isolate = next
    next = next.next
    isolate.next = now
    now = isolate
  }
  end.next = next
  return [now, end]
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
let reverseKGroup = function (head, k) {
  if (!head) return null
  let [now, end] = reverseChain(head, k)
  head = now
  let last = end
  while (now !== end && end) {
    [now, end] = reverseChain(end.next, k)
    last.next = now
    last = end
  }
  return head
}

module.exports = reverseKGroup

reverseKGroup.before = (list, k) => [ListNode.gen(list), k]

reverseKGroup.after = [result => result || [], result => [...result]]
