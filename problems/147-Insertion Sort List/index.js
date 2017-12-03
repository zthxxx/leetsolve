require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * 简单的插入排序
 * 因为是链表，所以本身是利于插入的
 * 但也是因为链表，无法获取上一个节点
 * 所以通常做法是保存当前节点
 * 每次比较和操作都操作下一个节点
 * 删除和修改都是对下一个节点操作
 * @param {ListNode} head
 * @return {ListNode}
 */
let insertionSortList = function (head) {
  if (!head) return null
  let p = new ListNode()
  p.next = head
  head = p
  let last = head.next
  while (last && last.next) {
    let next = last.next
    let val = next.val
    let p = head
    while (p.next && p !== last) {
      if (val < p.next.val) {
        last.next = next.next
        next.next = p.next
        p.next = next
        break
      }
      p = p.next
    }
    if (last.next === next) last = last.next
  }
  return head.next
}

module.exports = insertionSortList

module.exports.before = list => [ListNode.gen(list)]

module.exports.after = [result => result || [], result => [...result]]
