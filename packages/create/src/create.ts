import path from 'path'
import chalk from 'chalk'
import type { Ora } from 'ora'
import {
  type QuestionData,
  genQuestionURL,
} from './leetcode'
import {
  defaultSnippet,
  makeCodeSnippet,
  makeTestcases,
  htmlToMarkdown,
  prefixLines,
} from './utils'
import {
  type TemplateContext,
  getTemplateDir,
  appleTemplateProject,
  findTopicTemplate,
} from './template'


export const makeTemplateContext = async (question: QuestionData): Promise<TemplateContext> => {
  const {
    id,
    title,
    titleSlug,
    content,
    codeSnippets,
    difficulty,
    exampleTestcases,
    sampleTestCase,
  } = question

  const questionTitle = `${id}. ${title}`
  const questionURL = genQuestionURL(titleSlug)

  const description = prefixLines(
    ' * ',
    htmlToMarkdown(content),
  )
  const functionSnippet = codeSnippets.find(({ lang }) => lang === 'TypeScript')
  const codeSnippet: string = makeCodeSnippet(functionSnippet?.code ?? defaultSnippet)
  const testcases = prefixLines(
    '  ',
    makeTestcases(exampleTestcases, sampleTestCase),
  )

  return {
    questionTitle,
    questionURL,
    description,
    difficulty,
    codeSnippet,
    testcases,
  }
}

export const createSolution = async (question: QuestionData, spinner?: Ora) => {
  spinner?.start(`Creating with template ...`)

  const {
    id,
    title,
    topicTags,
  } = question

  const solutionDir = `${id}-${title.trim().replace(/ /g, '-')}`
  const topics = topicTags.map(({ name }) => name)

  // path relative from cwd
  const solutionPath = path.join('packages', 'problems', solutionDir)
  // absolute path
  const tempate = findTopicTemplate(topics)
  const templateProject = getTemplateDir(tempate)

  const templateContext = await makeTemplateContext(question)

  await appleTemplateProject({
    sourceDir: templateProject,
    targetDir: solutionPath,
    context: templateContext,
  })

  spinner?.succeed(`Created solution in \`${chalk.yellowBright(solutionPath)}\``)
}
