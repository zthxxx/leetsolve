import type { TreeNode } from '@leetsolve/kit'

/**
 * 662. Maximum Width of Binary Tree
 * [Medium] https://leetcode.com/problems/maximum-width-of-binary-tree
 *
 *  Given the `root` of a binary tree, return *the **maximum width** of the given tree*.
 *
 *  The **maximum width** of a tree is the maximum **width** among all levels.
 *
 *  The **width** of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes are also counted into the length calculation.
 *
 *  It is **guaranteed** that the answer will in the range of **32-bit** signed integer.
 *
 *
 *
 *  **Example 1:**
 *
 *  ![img](https://assets.leetcode.com/uploads/2021/05/03/width1-tree.jpg)
 *
 *  ```
 *  Input: root = [1,3,2,5,3,null,9]
 *  Output: 4
 *  Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).
 *  ```
 *
 *  **Example 2:**
 *
 *  ![img](https://assets.leetcode.com/uploads/2021/05/03/width2-tree.jpg)
 *
 *  ```
 *  Input: root = [1,3,null,5,3]
 *  Output: 2
 *  Explanation: The maximum width existing in the third level with the length 2 (5,3).
 *  ```
 *
 *  **Example 3:**
 *
 *  ![img](https://assets.leetcode.com/uploads/2021/05/03/width3-tree.jpg)
 *
 *  ```
 *  Input: root = [1,3,2,5]
 *  Output: 2
 *  Explanation: The maximum width existing in the second level with the length 2 (3,2).
 *  ```
 *
 *  **Example 4:**
 *
 *  ![img](https://assets.leetcode.com/uploads/2021/05/03/width4-tree.jpg)
 *
 *  ```
 *  Input: root = [1,3,2,5,null,null,9,6,null,null,7]
 *  Output: 8
 *  Explanation: The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).
 *  ```
 *
 *
 *
 *  **Constraints:**
 *
 *  - The number of nodes in the tree is in the range `[1, 3000]`.
 *  - `-100 <= Node.val <= 100`
 */

/**
 * 一个层序遍历拿到每层数据 -> 每个节点及其坐标索引
 * 然后根据每层第一个/最后一个坐标算算宽度就完了
 */
function widthOfBinaryTree(root: TreeNode | null): number {
  if (!root) return 0

  let maxWidth = 1

  /**
   * 位置指数列表
   * testcase 中树深度能达到 3000，
   * 直接使用位置坐标 2^3000 就已经整数溢出了
   * 改为指数，即所在节点路线的二进制表示
   * 宽度即为 2^(right - left)
   * 越顶层的指数表示越在左，即高位在左
   */
  type Exponents = number[]
  let level: [TreeNode, Exponents][] = []
  let nextLevel: [TreeNode, Exponents][] = []

  if (root.left) nextLevel.push([root.left, [0]])
  if (root.right) nextLevel.push([root.right, [1]])

  while (nextLevel.length) {
    level = nextLevel
    nextLevel = []

    let [, lefts] = level[0]
    let [, rights] = level[level.length - 1]
    lefts = [...lefts]
    rights = [...rights]

    // 最终差异一定右边是后几位，前几位(高位)一定一样，否则长度就能整数溢出了
    let index = 0
    while (lefts[index] === rights[index] && index < rights.length) {
      lefts.shift()
      rights.shift()
    }

    // 二进制指数从 0 开始，实际宽度 + 1
    let width = 1
    let len = rights.length
    for (let index = 0; index < rights.length; index++) {
      if (rights[index]) width += 2 ** (len - index - 1)
      if (lefts[index]) width -= 2 ** (len - index - 1)
    }


    if (width > maxWidth) maxWidth = width

    while (level.length) {
      const [node, exponent] = level.shift()!
      // 指数高位在右
      if (node.left) nextLevel.push([node.left, [...exponent, 0]])
      if (node.right) nextLevel.push([node.right, [...exponent, 1]])
    }
  }

  return maxWidth
}


// 不用 bigint 指数达到 3000 次方，直接溢出
function widthOfBinaryTreeBigInt(root: TreeNode | null): number {
  if (!root) return 0

  let maxWidth = 0

  type Index = bigint
  let level: [TreeNode, Index][] = []
  let nextLevel: [TreeNode, Index][] = [[root, 0n]]

  while (nextLevel.length) {
    level = nextLevel
    nextLevel = []

    let [, left] = level[0]
    let [, right] = level[level.length - 1]

    // 二进制指数从 0 开始，实际宽度 + 1
    let width: bigint = right - left + 1n
    if (width > maxWidth) maxWidth = Number(width)

    while (level.length) {
      const [node, index] = level.shift()!
      // 指数高位在右
      if (node.left) nextLevel.push([node.left, index * 2n])
      if (node.right) nextLevel.push([node.right, index * 2n + 1n])
    }
  }

  return maxWidth
}

export default [
  widthOfBinaryTree,
  widthOfBinaryTreeBigInt,
]
