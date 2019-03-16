require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * 快排的 partition 函数，同样的功能
 * 把 pivot 节点放在他排序的位置
 * 返回左右部分链表结尾
 * 显然左部分结尾的下一项就是 pivot 节点
 * 因为排序后要保证当前链表在原来链表段中的位置不变
 * 所以需要输入头节点的前一个节点
 * @param {ListNode} prehead - 待排序部分的 head 节点的前一个节点
 * @param {ListNode} end - 待排序部分的末尾节点
 * @return {ListNode} pivot
 */
function partition (prehead, end) {
  let head = prehead.next
  let pivot = head.val
  let left = new ListNode()
  let right = new ListNode()
  let lastL = left
  let lastR = right
  while (head && head !== end) {
    if (head.val < pivot) {
      lastL.next = head
      lastL = lastL.next
    } else {
      lastR.next = head
      lastR = lastR.next
    }
    head = head.next
  }
  lastR.next = end
  lastL.next = right.next
  prehead.next = left.next
  return lastL.next
}

/**
 * 链表快排递归部分
 * 对 prehead 后一个节点 head 开始，到 end 节点结束
 * 的部分使用 partition 分割后递归快排
 * @param {ListNode} prehead - 待排序部分的 head 节点的前一个节点
 * @param {ListNode} end - 待排序部分的末尾节点
 */
function quickSort (prehead, end) {
  if (!prehead.next ||
    prehead.next === end ||
    prehead.next.next === end) {
    return
  }
  let pivot = partition(prehead, end)
  quickSort(prehead, pivot)
  quickSort(pivot, end)
}

/**
 * 使用快排的链表排序
 * 时间复杂度 O(nlog(n)) 空间复杂度 O(1)
 * 但是对链表快排递归的过程中容易爆栈
 * @param {ListNode} head
 * @return {ListNode}
 */
let sortList_quick = function (head) {
  if (!head) return null
  let p = new ListNode()
  p.next = head
  quickSort(p, null)
  return p.next
}

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
 * 用快慢指针的方式
 * 把链表从中间分割成左右两边的链表
 * @param {ListNode} head
 * @return {ListNode} right
 */
function halfDivisive (head) {
  if (!head) return null
  let p = new ListNode()
  p.next = head
  let fast = head
  while (fast) {
    fast = fast.next
    fast = fast && fast.next
    p = p.next
  }
  let right = p.next
  p.next = null
  return right
}


/**
 * 用并归排序的方式排序链表
 * 原本对数组的并归中要用到辅助空间保存中间的节点
 * 但对链表的并归中不需要辅助空间，
 * 只需要改变链已经保护了改变后的顺序
 * 时间复杂度 O(nlog(n)) 空间复杂度 O(1)
 * 而且递归过程中是逐渐部分收敛再递归下一项
 * 所以比快排的方式更不容易爆栈
 * @param {ListNode} head
 * @return {ListNode}
 */
let sortList_merge = function (head) {
  if (!head || !head.next) return head
  let right = halfDivisive(head)
  return mergeTwoLists(sortList_merge(head), sortList_merge(right))
}

module.exports = [
  sortList_quick,
  sortList_merge
]

module.exports.beforeEach = list => [ListNode.gen(list)]

module.exports.afterEach = [result => result || [], result => [...result]]

