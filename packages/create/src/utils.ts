import TurndownService from 'turndown'

/**
 * https://github.com/mixmark-io/turndown#options
 */
const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  emDelimiter: '*',
})

export const htmlToMarkdown = (content: string): string =>
  turndownService.turndown(
    content
      .replaceAll('</pre>', '</code></pre>')
      .replaceAll('<pre>', '<pre><code>'),
  )

export const prefixLines = (prefix: string, text: string): string =>
  prefix + text.replaceAll('\n', '\n' + prefix)

export const defaultSnippet = `const solution = () => {}`

export const exportNameDetectRegexps: RegExp[] = [
  /^function +(?<name>\w+) *\(/m,
  /^class +(?<name>\w+) *{/m,
  /^const +(?<name>\w+) *=/m,
  /^let +(?<name>\w+) *=/m,
  /^var +(?<name>\w+) *=/m,
]

export const makeCodeSnippet = (functionCode: string): string => {
  for (const regexp of exportNameDetectRegexps) {
    const match = functionCode.match(regexp)
    if (match?.groups?.name) {
      const exportName = match.groups.name
      const exportDefault = `export default ${exportName}`
      return `${functionCode}\n\n${exportDefault}`
    }
  }

  return functionCode
}

export const chunk = (list: string[], size: number): string[][] => {
  const result: string[][] = []

  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size))
  }

  return result
}

export const makeTestcase = (exampleTestcase: string[]): string => `{
  input: [${exampleTestcase.join(', ')}],
  expect: null,
},`


export const makeTestcases = (exampleTestcases: string, sampleTestCase: string): string => {
  const inputLength = sampleTestCase.split('\n').length
  const testcases: string[][] = chunk(exampleTestcases.split('\n'), inputLength)
  return testcases.map(makeTestcase).join('\n')
}



