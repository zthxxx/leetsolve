require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * 下一项和下一项的下一项相等时
 * 就先标记这个值
 * 然后一直往后删
 * 直到不再是这个值的节点
 * 因为所有值都只遍历一遍，所以是 O(n)
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = function (head) {
  if (!head || !head.next) return head
  let p = new ListNode()
  p.next = head
  head = p

  let next = p.next
  while (next && next.next) {
    if (next.val === next.next.val) {
      let dupl = next.val
      while (next && next.val === dupl) {
        next = next.next
      }
      p.next = next
    } else {
      p = next
      next = next.next
    }
  }

  return head.next
}

module.exports = deleteDuplicates

deleteDuplicates.before = list => [ListNode.gen(list)]

deleteDuplicates.after = [result => result || [], result => [...result]]
