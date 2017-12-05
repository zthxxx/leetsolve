require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')

/**
 * 查找入口
 * 在长短不同的链表中先走到相同长度处
 * 再同时走判断是否相遇
 * @param {ListNode} long - 长的那个链表的头节点
 * @param {ListNode} short - 短的那个链表的头节点
 * @param {ListNode} last - 长的比短的末尾多出的一截
 * @return {ListNode} - 相遇节点
 */
function findEntry (long, short, last) {
  let p = long
  while (last) {
    last = last.next
    p = p.next
  }
  let q = short
  while (p && q) {
    if (p === q) return p
    p = p.next
    q = q.next
  }
  return null
}

/**
 * A:      a1 → a2
 *                ↘
 *                  c1 → c2 → c3
 *                ↗
 * B: b1 → b2 → b3
 *
 * 设 A 链不重复的长度为 a，b 链不重复的长度为 b, 重复部分长度为 c
 * 令 A B 两链的指针 pa pb 同时同速从头走
 * 当短的一链（设为 A）走完时，一共走了 a + c 步
 * pa pb 均走了 a + c 步，
 * 所以 B 链还剩 (b + c) - (a + c) = b - a 步
 * 这样就能得到 b - a 的长度
 * 如果我们在 B 链开头先走 b - a
 * 那么 B 链剩的长度 (b + c) - (b - a) = a + c
 * 就和 A 链一样长了
 * 再让 A 从头开始，B 从这个和 A 一样的长的节点开始
 * 同时开始走，因为现在剩的链长度一样了，那么不重复的部分长度也一样了
 * 同时走过不重复部分，必然也会同时走到重复的入口节点
 * 如果此时再有任一指针走到末尾都未相遇，那就是没有交叉
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
let getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null
  let pa = headA
  let pb = headB
  while (pa && pb) {
    pa = pa.next
    pb = pb.next
  }
  if (pa) return findEntry(headA, headB, pa)
  else return findEntry(headB, headA, pb)
}

/**
 * 和上面同样的思路，
 * 只是更简洁而优美的写法，效率也更高
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
let getIntersectionNode_pretty = function (headA, headB) {
  let [pa, pb] = [headA, headB]
  while (pa !== pb) {
    pa = pa ? pa.next : headB
    pb = pb ? pb.next : headA
  }
  return pa
}

module.exports = [
  getIntersectionNode,
  getIntersectionNode_pretty
]

module.exports.beforeEach = (listA, [listB, begin]) => {
  let headA = ListNode.gen(listA)
  let headB = ListNode.gen(listB)
  if (begin >= 0) {
    let lastB = headB
    while (lastB.next) {
      lastB = lastB.next
    }
    let entry = headA
    while (entry && begin-- > 0) {
      entry = entry.next
    }
    lastB.next = entry
  }
  return [headA, headB]
}

module.exports.afterEach = [result => result || [], result => [...result]]
