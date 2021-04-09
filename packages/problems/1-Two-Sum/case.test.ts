import { defineTest, type Cases } from '@leetsolve/kit'
import solution from '.'


const testcases: Cases<[number[], number], [number, number]> = [
  {
    input: [
      [2, 7, 11, 15],
      9
    ],
    expect: [0, 1]
  },
  {
    input: [
      [3, 2, 4],
      6
    ],
    expect: [1, 2]
  },
  {
    input: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      18
    ],
    expect: [8, 10]
  }
]

describe('1. Two Sum - (https://leetcode.com/problems/two-sum)', () => {
  defineTest(solution, testcases)
})
