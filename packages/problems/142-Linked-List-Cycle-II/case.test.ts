import {
  defineTest,
  Cases,
  Hook,
  ListNode,
  genList,
  iterateList,
} from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[number[], number?] | [null], number | null> = [
  {
    input: [[1]],
    expect: null,
  },
  {
    input: [[1, 2]],
    expect: null,
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: null,
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7], 5],
    expect: 5,
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 1],
    expect: 1,
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 5],
    expect: 5,
  },
]

const hook: Hook<[ListNode], number | null> = {
  input: (values: number[], trackIndex?: number): [ListNode] => {
    const head = genList(values)!
    if (trackIndex !== undefined) {
      const nodes = [...iterateList(head)]
      const last = nodes[nodes.length - 1]
      last.next = nodes[trackIndex] ?? null
    }
    return [head]
  },
  output: (answer: ListNode | null) => answer?.val ?? null,
}

// prettier-ignore
describe(
  `142. Linked List Cycle II (https://leetcode.com/problems/linked-list-cycle-ii)`,
  () => defineTest(solution, testcases, hook),
)
