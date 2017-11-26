require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * 获取并返回值最小的一个结点
 * 如果没有的话就返回 null
 * 这里该用最小堆，没有堆的话，每次要遍历比较
 * 效率很低
 * @param {ListNode[]} lists
 * @return {(ListNode | null)}
 */
function minNode (lists) {
  let minIndex = 0
  let min = Infinity
  for (let [index, node] of lists.entries()) {
    if (!node) continue
    if (node.val < min) {
      minIndex = index
      min = node.val
    }
  }
  let node = lists[minIndex]
  if (node) lists[minIndex] = node.next
  return node
}

/**
 * 每次获取一个最小的结点，
 * 然后串在一起
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeKLists_fetch = function (lists) {
  if (!lists || !lists.length) return null
  let merged = minNode(lists)
  let head = merged
  while (true) {
    let next = minNode(lists)
    if (next) {
      merged.next = next
      merged = merged.next
    }
    else {
      break
    }
  }
  return head
}


/**
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


module.exports = [
  mergeKLists_fetch,
  mergeKLists_merge
]

mergeKLists_fetch.timeout = 8000

module.exports.beforeEach = lists => [lists.map(ListNode.generate)]

module.exports.afterEach = [result => result || [], result => [...result]]
