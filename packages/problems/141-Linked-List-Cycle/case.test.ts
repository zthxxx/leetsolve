import { defineTest, ListNode, Cases, Hook } from '@leetsolve/kit'
import solution from '.'

const testcases: Cases<[number[], number?] | [null], boolean> = [
  {
    input: [null],
    expect: false,
  },
  {
    input: [[1]],
    expect: false,
  },
  {
    input: [[1, 2]],
    expect: false,
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: false,
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7], 5],
    expect: true,
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 5],
    expect: true,
  },
  {
    input: [[0, 1, 2, 3], -1],
    expect: false,
  },
]

const hook: Hook<[ListNode | null], boolean> = {
  input: (list: number[] | null, trackIndex?: number) => [ListNode.gen(list, trackIndex)],
}

describe(`141. Linked List Cycle (https://leetcode.com/problems/linked-list-cycle)`, () => {
  defineTest(solution, testcases, hook)
})
