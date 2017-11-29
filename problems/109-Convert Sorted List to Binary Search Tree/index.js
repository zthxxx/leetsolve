require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')
const TreeNode = require('../../libs/TreeNode')

/**
 * 将链表中开头 len 长度的链
 * 通过二分递归的方式折半构建成树
 * 左半部分总会遍历两次，因此还是 O(n)
 * @param head
 * @param len
 * @return {*}
 */
function buildList2Tree (head, len) {
  if (!len || !head) return null
  if (len === 1) return new TreeNode(head.val)
  let mid = ~~(len / 2)
  let left = buildList2Tree(head, mid)
  for (let i = 0; i < mid; i++) {
    head = head.next
  }
  let root = new TreeNode(head.val)
  let right = buildList2Tree(head.next, len - mid - 1)
  root.left = left
  root.right = right
  return root
}

/**
 * 因为是链表，所以没办法直接折半递归
 * 但是可以通过两次遍历记录长度
 * 有了长度就能创造条件来折半
 * @param {ListNode} head
 * @return {TreeNode}
 */
let sortedListToBST = function (head) {
  if (!head) return null
  let len = 0
  let p = head
  while (p) {
    p = p.next
    len += 1
  }
  return buildList2Tree(head, len)
}

module.exports = sortedListToBST

module.exports.before = list => [ListNode.gen(list)]

module.exports.after = [result => result || [], result => [...result]]
