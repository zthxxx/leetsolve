import { defineTest, Cases } from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[string, string], number> = [
  {
    input: ['hello', 'll'],
    expect: 2,
  },
  {
    input: ['aaaaa', 'bba'],
    expect: -1,
  },
  {
    input: ['ababaaabcabdddabcabcbaabac', 'abcabdddabcabc'],
    expect: 6,
  },
  {
    input: ['ababaabaabac', 'abaabac'],
    expect: 5,
  },
  {
    input: ['aaabcabcabdadbcabcc', 'abcabcabcadbcabc'],
    expect: -1,
  },
  {
    input: ['aaabcabcabdadbcabcc', 'abcabcabdadbcabc'],
    expect: 2,
  },
  {
    input: ['', ''],
    expect: 0,
  },
]

// prettier-ignore
describe(
  '28. Implement strStr() - (https://leetcode.com/problems/implement-strstr)',
  () => defineTest(solution, testcases),
)
