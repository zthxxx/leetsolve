require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
let removeElements = function (head, val) {
  if (!head) return null
  let p = new ListNode()
  p.next = head
  head = p
  while (p && p.next) {
    if (p.next.val === val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  return head.next
}

module.exports = removeElements

module.exports.before = (list, val) => [ListNode.gen(list), val]

module.exports.after = [result => result || [], result => [...result]]
