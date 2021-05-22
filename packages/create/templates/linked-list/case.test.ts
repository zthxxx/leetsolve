import {
  defineTest,
  Cases,
  Hook,
  ListNode,
  genList,
} from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[number[]], null> = [
{{testcases}}
]

const hook: Hook<[ListNode], number | null> = {
  input: (values: number[]): [ListNode] => {
    const head = genList(values)!
    return [head]
  },
  output: (result: ListNode | null) => result?.val ?? null,
}

// prettier-ignore
describe(
  '{{questionTitle}} - ({{questionURL}})',
  () => defineTest(solution, testcases, hook),
)
