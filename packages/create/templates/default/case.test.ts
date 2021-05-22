import {
  defineTest,
  Cases,
} from '@leetsolve/kit'

import solution from '.'

const testcases: Cases<[number[]], null> = [
{{testcases}}
]

// prettier-ignore
describe(
  '{{questionTitle}} - ({{questionURL}})',
  () => defineTest(solution, testcases),
)
