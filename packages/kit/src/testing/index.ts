export interface Case<Input extends Array<any>, Expect> {
  input: Input;
  expect: Expect;
}

export type Cases<Input extends Array<any>, Expect> = Case<Input, Expect>[]

export const defineTest = <
  Solution extends Function,
  Input extends Array<any>,
  Expect,
>(solution: Solution | Solution[], testcases: Cases<Input, Expect>) => {
  const solutions = Array.isArray(solution) ? solution : [solution]

  solutions.forEach((solution) => {
    const { name } = solution
    testcases.forEach((testcase, caseIndex) => {
      it(`[${name}] case ${caseIndex + 1}`, async () => {
        const { input } = testcase
        const answer = await solution(...input)
        expect(answer).toEqual(testcase.expect)
      })
    })
  })
}
