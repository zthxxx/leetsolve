const ListNode = require('../../libs/ListNode')

/**
 * 一遍解法，从个位往高位遍历，相加，记录是否进位
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let addTwoNumbers = function (l1, l2) {
  let [pl1, pl2] = [l1, l2]
  let [carry, plus] = addNode(pl1, pl2)
  let plusHead = plus
  while (true) {
    [pl1, pl2] = [pl1 && pl1.next, pl2 && pl2.next]
    if (!pl1 && !pl2 && !carry) {
      return plusHead
    }
    [carry, plus.next] = addNode(pl1, pl2, carry)
    plus = plus.next
  }
}

function addNode (pl1, pl2, carry = 0) {
  let v1 = pl1 && pl1.val || 0
  let v2 = pl2 && pl2.val || 0
  let sum = v1 + v2 + carry
  return [~~(sum / 10), new ListNode(sum % 10)]
}

addTwoNumbers.before = (...args) => args.map(ListNode.gen)

addTwoNumbers.after = result => [...result]

module.exports = addTwoNumbers
