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

export const getQuesionDataById = async (quesionId: string, spinner?: Ora): Promise<QuestionData> => {
  spinner?.start('Loading quesions list ...')
  const questionList: QuestionListItem[] = await fetchQuestionList()
  spinner?.succeed(`Load quesions list ${chalk.yellowBright(`(total: ${questionList.length})`)}`)
  const questionItem = questionList.find(({ id }) => id === quesionId)

  if (!questionItem) {
    throw new Error(`question (ID: ${quesionId}) not found in Leetcode, please check.`)
  }

  const { title, titleSlug } = questionItem
  spinner?.start(`Loading detail of quesion (${quesionId}. ${title}) ...`)
  const questionData: QuestionData = await fetchQuestionData(titleSlug)
  spinner?.succeed(`Load quesion detail ${chalk.yellowBright(`(${quesionId}. ${title})`)}`)

  return questionData
}
