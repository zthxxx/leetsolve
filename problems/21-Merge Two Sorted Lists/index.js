require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let mergeTwoLists = function (l1, l2) {
  if (!l1) return l2
  if (!l2) return l1
  if (l1.val > l2.val) {
    return mergeTwoLists(l2, l1)
  }
  let p1 = l1
  let p2 = l2
  while (p1.next && p2) {
    if (p1.next.val > p2.val) {
      let ins = p2
      p2 = p2.next
      ins.next = p1.next
      p1.next = ins
    }
    p1 = p1.next
  }
  if (p2) p1.next = p2
  return l1
}

mergeTwoLists.before = (...lists) => lists.map(ListNode.gen)

mergeTwoLists.after = [result => result || [], result => [...result]]

module.exports = mergeTwoLists
