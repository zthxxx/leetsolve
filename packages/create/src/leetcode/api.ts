import { GraphQLClient } from 'graphql-request'
import {
  type QuestionList,
  questionListQuery,
  type QuestionData,
  questionDataQuery,
  type QuestionListItem,
} from './query'

export const endpoint = 'https://leetcode.com/graphql'

export const client = new GraphQLClient(endpoint)

export const fetchQuestionList = async (): Promise<QuestionListItem[]> => {
  const {
    questionList: {
      data,
    },
  } = await client.request<QuestionList>(questionListQuery)

  return data
}

export const fetchQuestionData = async (titleSlug: string): Promise<QuestionData> => {
  const {
    question,
  } = await client.request<
    { question: QuestionData },
    { titleSlug: string }
  >(
    questionDataQuery,
    { titleSlug },
  )

  return question
}
