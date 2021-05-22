import {
  defineTest,
  Cases,
  Hook,
  TreeNode,
  genTreeByLevels,
  findTreeNode,
} from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[(number | null)[]], null> = [
{{testcases}}
]

// const hook: Hook<[TreeNode | null], number> = {
//   input: (levelOrder: (number | null)[]) => [genTreeByLevels(levelOrder)],
// }

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
  '{{questionTitle}} - ({{questionURL}})',
  () => defineTest(solution, testcases, hook),
)
