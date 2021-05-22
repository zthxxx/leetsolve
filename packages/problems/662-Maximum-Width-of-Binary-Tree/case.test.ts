import {
  defineTest,
  Cases,
  Hook,
  TreeNode,
  genTreeByLevels,
} from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[(number | null)[]], number> = [
  {
    input: [[6]],
    expect: 1,
  },
  {
    input: [[6, 2]],
    expect: 1,
  },
  {
    input: [[6, 2, 8]],
    expect: 2,
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]],
    expect: 4,
  },
  {
    input: [[1, 3, 2, 5, 3, null, 9]],
    expect: 4,
  },
  {
    input: [[1, 3, null, 5, 3]],
    expect: 2,
  },
  {
    input: [[1, 3, 2, 5]],
    expect: 2,
  },
  {
    input: [[2, 4, 1, null, 5, 3]],
    expect: 2,
  },
  {
    input: [[2, 1, 4, 3, null, 5]],
    expect: 3,
  },
  {
    input: [[1, 3, 2, 5, null, null, 9, 6, null, null, 7]],
    expect: 8,
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6]],
    expect: 4,
  },
  {
    // https://leetcode.com/submissions/detail/604571055/testcase/
    input: [[...Array(64).fill([0, null]).flat(), 0, 1, 2, 3, 4, 5, 6]],
    expect: 4,
  },
  {
    input: [[0, ...Array(64).fill([0, null]).flat(), 1, 2, 3, 4, 5, 6]],
    expect: 4,
  },
]

const hook: Hook<[TreeNode | null], number> = {
  input: (levelOrder: (number | null)[]) => [genTreeByLevels(levelOrder)],
}

// prettier-ignore
describe(
  `662. Maximum Width of Binary Tree (https://leetcode.com/problems/maximum-width-of-binary-tree)`,
  () => defineTest(solution, testcases, hook),
)
