export interface Case<Input extends Array<any>, Expect> {
  input: Input;
  expect: Expect;
}

export type Cases<Input extends Array<any>, Expect> = Case<Input, Expect>[]

export interface Hook<Input, Expect> {
  input?: (...input: Array<any>) => Input,
  output?: (answer: any) => Expect,
}

export const defineTest = <
  Solution extends Function,
  Input extends Array<any>,
  Expect,
>(
  solution: Solution | Solution[],
  testcases: Cases<Input, Expect>,
  hook?: Hook<Input, Expect>,
) => {
  const solutions = Array.isArray(solution) ? solution : [solution]

  solutions.forEach((solution) => {
    const { name } = solution
    testcases.forEach((testcase, caseIndex) => {
      it(`[${name}] case ${caseIndex + 1}`, async () => {
        const input = hook?.input
          ? hook.input(...testcase.input)
          : testcase.input
        const answer = await solution(...input)
        const result = hook?.output
          ? hook.output(answer)
          : answer
        expect(result).toEqual(testcase.expect)
      })
    })
  })
}
