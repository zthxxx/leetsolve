import {
  defineTest,
  Cases,
  Hook,
  TreeNode,
  genTreeByLevels,
  findTreeNode,
} from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[(number | null)[], number, number], number | null> = [
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 5, 9],
    expect: 6,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 3, 8],
    expect: 6,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 0, 3],
    expect: 2,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 5],
    expect: 2,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 7, 6],
    expect: 6,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 8, 7],
    expect: 8,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 4, 4],
    expect: 4,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 10, 11],
    expect: null,
  },
  {
    input: [[1, 2], 1, 2],
    expect: 1,
  },
]

const hook: Hook<[TreeNode | null, TreeNode | null, TreeNode | null], number | null> = {
  input: (levelOrder: (number | null)[], pVal: number, qVal: number) => {
    const root = genTreeByLevels(levelOrder)!
    const pNode = findTreeNode(root, pVal)
    const qNode = findTreeNode(root, qVal)
    return [root, pNode, qNode]
  },
  output: (node: TreeNode | null) => node?.val ?? null,
}

// prettier-ignore
describe(
  `236. Lowest Common Ancestor of a Binary Tree (https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree)`,
  () => defineTest(solution, testcases, hook),
)
