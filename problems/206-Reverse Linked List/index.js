require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let reverseList = function (head) {
  if (!head || !head.next) return head
  let now = head
  let next = head.next
  let end = head
  while (next) {
    let isolate = next
    next = next.next
    isolate.next = now
    now = isolate
  }
  end.next = next
  return now
}

module.exports = reverseList

module.exports.before = list => [ListNode.gen(list)]

module.exports.after = [result => result || [], result => [...result]]
