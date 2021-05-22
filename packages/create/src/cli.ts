import cac from 'cac'
import chalk from 'chalk'
import {
  type QuestionData,
  getQuesionDataById,
} from './leetcode'
import { createSolution } from './create'
import { spinner } from './logger'


const cli = cac('@leetsolve/create')

cli
  .command(
    '',
    'create a leetcode question answer',
  )
  .option(
    '--id <question-id>',
    'question id in leetcode website',
  )
  .action(async (options: { id: number | undefined }) => {
    const { id: questionId } = options

    if (!questionId) {
      throw new Error(chalk.redBright(`
        need specify the question ID, like \`npx @leetsolve/create --id 1\`
      `))
    }

    const question: QuestionData = await getQuesionDataById(String(questionId), spinner)
    await createSolution(question, spinner)
    spinner.stop()
  })

cli.help()

cli.parse()
