import { defineTest, Cases } from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[string], string> = [
  {
    input: [''],
    expect: '',
  },
  {
    input: ['a'],
    expect: 'a',
  },
  {
    input: ['aa'],
    expect: '',
  },
  {
    input: ['aaa'],
    expect: '',
  },
  {
    input: ['aaaaaaa'],
    expect: '',
  },
  {
    input: ['aaaabbbb'],
    expect: '',
  },
  {
    /**
     * ambiguous!
     * result can be "" or "a"
     */
    input: ['abbabba'],
    expect: 'a',
  },
  {
    /**
     * ambiguous!
     * result can be "" or "edcacde"
     */
    input: ['edcabbabbacde'],
    expect: 'edcacde',
  },
  {
    input: ['aaac'],
    expect: 'c',
  },
  {
    input: ['abcd'],
    expect: 'abcd',
  },
  {
    input: ['abcddd'],
    expect: 'abc',
  },
  {
    input: ['aaca'],
    expect: 'ca',
  },
  {
    input: ['abbaca'],
    expect: 'ca',
  },
  {
    input: ['azxxzy'],
    expect: 'ay',
  },
  {
    input: ['123332454'],
    expect: '1454',
  },
  {
    input: ['1233322454'],
    expect: '1454',
  },
  {
    input: ['12333221454'],
    expect: '454',
  },
]

// prettier-ignore
describe(
  '1047. Remove All Adjacent Duplicates In String - (https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string)',
  () => defineTest(solution, testcases),
)
