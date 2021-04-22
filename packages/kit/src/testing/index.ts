export interface Case<Input extends Array<any>, Expect> {
  input: Input;
  expect: Expect;
}

export type Cases<Input extends Array<any>, Expect> = Case<Input, Expect>[]

export interface Hook<Input, Expect> {
  input?: (...input: Array<any>) => Input,
  output?: (answer: any) => Expect,
}


export function defineTest<
  Input extends Array<any>,
  Expect extends any,
  CaseInput extends Array<any>,
  CaseExpect extends any,
  Solution extends (...input: Input) => Expect,
>(
  solution: Solution | Solution[],
  testcases: Cases<CaseInput, CaseExpect>,
  hook?: {
    input?: (...input: CaseInput) => Input;
    output?: (answer: Expect) => CaseExpect;
  },
): void {
  const solutions: Solution[] = Array.isArray(solution) ? solution : [solution]

  solutions.forEach((solution) => {
    const { name } = solution
    testcases.forEach((testcase, caseIndex) => {
      it(`[${name}] case ${caseIndex + 1}`, () => {
        const input: Input = hook?.input
          ? hook.input(...testcase.input)
          : testcase.input as any as Input

        const answer = solution(...input)

        const result: CaseExpect = hook?.output
          ? hook.output(answer)
          : answer as any as CaseExpect
        expect(result).toEqual(testcase.expect)
      })
    })
  })
}
