require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * 合并两个有序的链表 #21
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

/**
 * 把每个链两两并归排序
 * 还有个方法是用最小堆
 * 把几个链的头节点来维护一个最小堆
 * 每次获取并返回所有头节点中值最小的节点
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeKLists_merge = function (lists) {
  if (!lists || !lists.length) return null
  if (lists.length === 1) return lists[0]
  let middle = ~~(lists.length / 2)
  let right = lists.splice(middle)
  let left = lists
  return mergeTwoLists(mergeKLists_merge(right), mergeKLists_merge(left))
}


module.exports = mergeKLists_merge

module.exports.before = lists => [lists.map(list => ListNode.gen(list))]

module.exports.after = [result => result || [], result => [...result]]
