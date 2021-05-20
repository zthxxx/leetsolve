import type { ListNode } from '@leetsolve/kit'

/**
 * 142. Linked List Cycle II
 * [Medium] https://leetcode.com/problems/linked-list-cycle-ii
 *
 *  Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
 *
 *  There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.
 *
 *  Do not modify the linked list.
 *
 *
 *  Example 1:
 *
 *
 *  Input: head = [3,2,0,-4], pos = 1
 *  Output: tail connects to node index 1
 *  Explanation: There is a cycle in the linked list, where tail connects to the second node.
 *  Example 2:
 *
 *
 *  Input: head = [1,2], pos = 0
 *  Output: tail connects to node index 0
 *  Explanation: There is a cycle in the linked list, where tail connects to the first node.
 *  Example 3:
 *
 *
 *  Input: head = [1], pos = -1
 *  Output: no cycle
 *  Explanation: There is no cycle in the linked list.
 *
 *
 *  Constraints:
 *
 *  The number of the nodes in the list is in the range [0, 104].
 *  -105 <= Node.val <= 105
 *  pos is -1 or a valid index in the linked-list.
 *
 *
 *  Follow up: Can you solve it using O(1) (i.e. constant) memory?
 */

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
 *   慢: t = x + ny + k
 *   快: 2t = x + my + k
 * 所以可得 x + k = (m - 2n)y
 * 也就是从头到相遇点的步数一定是环节点的整数倍
 * 或者说如果从相遇节点再走 x 步，
 * 就相当于倒退了 k 步，一定就是环入口节点
 * 即 x + k + x = ny - k
 * 即： k 点 + 再走 x 步 = 环中走 n 圈 - 倒退 k 步
 * 这样就很直观了，只要再用一个指针同时走，都是走一步
 * 一个从头走，一个从相遇点走
 * 当头走过 x 步时，就到了入口点
 * 而从相遇点也同时走了 x 步，因此也会到入口点再次相遇
 * @param head
 */
function detectCycle(head: ListNode | null): ListNode | null {
  let fast = head
  let slow = head

  while (fast) {
    fast = fast.next?.next ?? null
    if (!fast) return null
    slow = slow!.next!
    if (fast == slow) break
  }

  if (!fast || !slow) return null

  let entry = head!

  while (entry !== slow) {
    slow = slow.next!
    entry = entry.next!
  }

  return entry
}

export default detectCycle
