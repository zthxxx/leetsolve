import { defineTest, ListNode, Cases, Hook } from '@leetsolve/kit'
import solution from '.'

const testcases: Cases<[number[], number?] | [null], number | null> = [
  {
    input: [null],
    expect: null
  },
  {
    input: [[1]],
    expect: null
  },
  {
    input: [[1, 2]],
    expect: null
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: null
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7], 5],
    expect: 5
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 1],
    expect: 1
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 5],
    expect: 5
  }
]

const hook: Hook<[ListNode | null], number | null> = {
  input: (list: number[] | null, trackIndex?: number) => [ListNode.gen(list, trackIndex)],
  output: (answer: ListNode | null) => answer?.val ?? null,
}

describe(`142. Linked List Cycle II (https://leetcode.com/problems/linked-list-cycle-ii)`, () => {
  defineTest(solution, testcases, hook)
})
