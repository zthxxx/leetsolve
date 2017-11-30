require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * 双指针一快一满，能追上就有环
 * @param {ListNode} head
 * @return {boolean}
 */
let hasCycle = function (head) {
  if (!head) return false
  let p = head
  let fast = head
  while (fast) {
    fast = fast.next
    if (fast === p) return true
    fast = fast ? fast.next : null
    if (fast === p) return true
    p = p.next
  }
  return false
}

module.exports = hasCycle

module.exports.before = (list, trackIndex) => [ListNode.gen(list, trackIndex)]
