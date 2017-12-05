require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * @param {number} pl1
 * @param {number} pl2
 * @param {number} carry
 * @return {[number, ListNode]} - carry, ListNode
 */
function plusToNode (pl1 = 0, pl2 = 0, carry = 0) {
  let sum = pl1 + pl2 + carry
  return [~~(sum / 10), new ListNode(sum % 10)]
}

/**
 * 因为链表是正序，相加需要逆序
 * 所以先遍历保存所有的值
 * 再依次相加头插法生成链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let addTwoNumbers = function (l1, l2) {
  let [pl1, pl2] = [l1, l2]
  let vals1 = []
  let vals2 = []
  while (pl1) {
    vals1.push(pl1.val)
    pl1 = pl1.next
  }
  while (pl2) {
    vals2.push(pl2.val)
    pl2 = pl2.next
  }
  let [carry, last] = plusToNode(vals1.pop(), vals2.pop())
  let head = last
  while (vals1.length || vals2.length || carry) {
    [carry, last] = plusToNode(vals1.pop(), vals2.pop(), carry)
    last.next = head
    head = last
  }
  return head
}

module.exports = addTwoNumbers

module.exports.before = (...lists) => lists.map(list => ListNode.gen(list))

module.exports.after = result => [...result]

