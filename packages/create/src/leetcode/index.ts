import chalk from 'chalk'
import type { Ora } from 'ora'
import {
  type QuestionListItem,
  type QuestionData,
} from './query'
import {
  fetchQuestionList,
  fetchQuestionData,
} from './api'

export type { QuestionData } from './query'

export const genQuestionURL = (
  titleSlug: string,
  host: string = 'https://leetcode.com/problems',
) => `${host}/${titleSlug}`

export const getQuesionDataById = async (quesionId: string, spinner?: Ora): Promise<QuestionData> => {
  spinner?.start('Loading quesions list ...')
  const questionList: QuestionListItem[] = await fetchQuestionList()
  spinner?.succeed(`Load quesions list ${chalk.yellowBright(`(total: ${questionList.length})`)}`)
  const questionItem = questionList.find(({ id }) => id === quesionId)

  if (!questionItem) {
    throw new Error(`question (ID: ${quesionId}) not found in Leetcode, please check.`)
  }

  const { title, titleSlug } = questionItem
  const questionURL = genQuestionURL(titleSlug)

  spinner?.start(`Loading detail of quesion (${quesionId}. ${title}) ...
    ${chalk.gray(questionURL)}\
  `)
  const questionData: QuestionData = await fetchQuestionData(titleSlug)
  spinner?.succeed(`Load quesion detail ${chalk.yellowBright(`(${quesionId}. ${title})`)}
    ${chalk.gray(questionURL)}\
  `)

  return questionData
}
