require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = function (head) {
  if (!head) return null
  let p = head
  while (p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  return head
}

module.exports = deleteDuplicates

deleteDuplicates.before = list => [ListNode.gen(list)]

deleteDuplicates.after = [result => result || [], result => [...result]]
