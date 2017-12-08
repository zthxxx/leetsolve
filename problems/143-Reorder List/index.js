require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * 先用两倍速度快慢指针
 * 获取到中间节点的前一个节点
 * 之所以要找前一个节点，因为要重新设置结尾
 * 然后后半段节点整体入栈
 * 于是就能反转从头插入了
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
let reorderList = function (head) {
  if (!head) return
  let p = head
  let fast = head
  while (fast) {
    fast = fast.next
    if (!fast) break
    fast = fast.next
    p = p.next
  }

  let half = p
  p = p.next
  half.next = null
  let stack = []
  while (p) {
    stack.push(p)
    p = p.next
  }

  p = head
  while (stack.length) {
    let next = stack.pop()
    next.next = p.next
    p.next = next
    p = p.next.next
  }
}

module.exports = head => reorderList(head) || head

module.exports.before = list => [ListNode.gen(list)]

module.exports.after = [result => result || [], result => [...result]]
