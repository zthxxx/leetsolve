require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * 和 #86 的分割列表很相似
 * 但是不用比较了
 * 从头开始每次取两个节点，肯定就是奇和偶了
 * @param {ListNode} head
 * @return {ListNode}
 */
let oddEvenList = function (head) {
  if (!head || !head.next) return head
  let left = new ListNode()
  let right = new ListNode()
  let lastL = left
  let lastR = right
  while (head) {
    lastL.next = head
    lastL = lastL.next
    head = head.next
    if (!head) break
    lastR.next = head
    lastR = lastR.next
    head = head.next
  }
  lastR.next = null
  lastL.next = right.next
  return left.next
}

module.exports = oddEvenList

module.exports.before = list => [ListNode.gen(list)]

module.exports.after = [result => result || [], result => [...result]]
