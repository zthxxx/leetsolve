require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * 反转链表开头的 n 个结点
 * @param {ListNode} head
 * @param {number} len
 * @returns {ListNode}
 */
function reverseChain (head, len) {
  if (len <= 1 || !head) return head
  let now = head
  let next = head.next
  let end = head
  for (let i = 0; i < len - 1; i++) {
    let isolate = next
    next = next.next
    isolate.next = now
    now = isolate
  }
  end.next = next
  return now
}

/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
let reverseBetween = function (head, m, n) {
  if (!head) return null
  let p = new ListNode()
  p.next = head
  head = p
  m -= 1
  let len = n - m
  while (m--) {
    p = p.next
  }
  p.next = reverseChain(p.next, len)
  return head.next
}

module.exports = reverseBetween

module.exports.before = (list, m, n) => [ListNode.gen(list), m, n]

module.exports.after = [result => result || [], result => [...result]]
