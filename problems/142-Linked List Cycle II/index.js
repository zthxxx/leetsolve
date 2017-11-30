require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * 获取相遇的节点
 * @param {ListNode} head
 * @return {ListNode} meet
 */
let meetingNode = function (head) {
  if (!head) return null
  let p = head
  let fast = head
  while (fast) {
    fast = fast.next
    if (fast === p) return fast
    fast = fast ? fast.next : null
    if (fast === p) return fast
    p = p.next
  }
  return null
}

/**
 * 先获取快慢指针相遇的节点，
 * 通过这个节点再计算成环的节点数；
 * 再用前后两个指针，
 * 前指针先走环的节点数，
 * 再两个指针同时同速度走，
 * 前后指针相遇时就刚好是环入口的节点
 * @param {ListNode} head
 * @return {ListNode}
 */
let detectCycle_count = function (head) {
  if (!head) return null
  let meet = meetingNode(head)
  if (!meet) return null
  let p = meet.next
  let step = 1
  while (p !== meet) {
    step += 1
    p = p.next
  }
  let fast = head
  p = head
  while (step--) {
    fast = fast.next
  }
  while (fast !== p) {
    fast = fast.next
    p = p.next
  }
  return p
}


/**
 * 不用计数的算法，只通过相遇来判断
 * 还是两倍速的快慢指针（严格的两倍）
 *           ┌-------┐
 *           ↓       │
 * # # # # # # # @ # #
 * │-- x --│ │-- y --│
 *           │-k-│
 * 不成环的节点数为 x
 * 成环的节点数为 y
 * 快慢指针相遇节点到环入口的节点数为 k
 * 假设慢指针走了 t 步相遇，则有
 *  t = x + ny + k
 * 2t = x + my + k
 * 所以可得 x + k = (m - 2n)y
 * 也就是从头到相遇点的步数一定是环节点的整数倍
 * 或者说如果从相遇节点再走 x 步，
 * 就相当于倒退了 k 步，一定就是环入口节点
 * 即 x + k + x = ny - k
 * 即： k 点 + 再走 x 步 = 环中走 n 圈 - 倒退 k 步
 * 这样就很直观了，只要再用一个指针同时走，
 * 一个从头走，一个从相遇点走
 * 当头走过 x 步时，就到了入口点
 * 而从相遇点也同时走了 x 步，因此也会到入口点相遇
 * @param {ListNode} head
 * @return {ListNode}
 */
let detectCycle_meet = function (head) {
  if (!head) return null
  let p = head
  let fast = head
  while (fast) {
    if (!fast.next) return null
    fast = fast.next.next
    p = p.next
    if (fast === p) break
  }
  if (p !== fast) return null
  p = head
  while (p !== fast) {
    p = p.next
    fast = fast.next
  }
  return p
}


module.exports = [
  detectCycle_count,
  detectCycle_meet
]

module.exports.beforeEach = (list, trackIndex) => [ListNode.gen(list, trackIndex)]

module.exports.afterEach = result => {
  if (result instanceof ListNode) return result.val
  return result
}
