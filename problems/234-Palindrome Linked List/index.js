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

/**
 * 快慢指针找中点
 * 再反转后半段链表比较
 * @param {ListNode} head
 * @return {boolean}
 */
let isPalindrome = function (head) {
  if (!head) return true
  let p = head
  let fast = head.next
  while (fast) {
    fast = fast.next
    if (!fast) break
    fast = fast.next
    p = p.next
  }
  let right = p.next
  p.next = null
  right = reverseList(right)
  while (head && right) {
    if (head.val !== right.val) return false
    head = head.next
    right = right.next
  }
  return true
}

module.exports = isPalindrome

module.exports.before = list => [ListNode.gen(list)]
