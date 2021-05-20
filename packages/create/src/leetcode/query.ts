import { gql } from 'graphql-request'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface QuestionData {
  id: string;
  title: string;
  titleSlug: string;
  content: string;
  isPaidOnly: boolean;
  difficulty: Difficulty;
  exampleTestcases: string;
  sampleTestCase: string;
  categoryTitle: string;
  topicTags: Array<{
    name: string;
  }>
  codeSnippets: Array<{
    lang: string;
    code: string;
  }>
  hints: string[];
}

export const questionDataQuery = gql`
  query ($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      id: questionFrontendId
      title
      titleSlug
      content
      isPaidOnly
      difficulty
      exampleTestcases
      sampleTestCase
      categoryTitle
      topicTags {
        name
      }
      codeSnippets {
        lang
        code
      }
      hints
    }
  }
`

export interface QuestionListItem {
  id: string;
  title: string;
  titleSlug: string;
  difficulty: Difficulty;
}

export interface QuestionList {
  questionList: {
    data: QuestionListItem[];
  };
}

export const questionListQuery = gql`
  query (
    $categorySlug: String = "algorithms",
    $limit: Int = -1,
    $filters: QuestionListFilterInput = {}
  ) {
    questionList(
      categorySlug: $categorySlug
      limit: $limit
      filters: $filters
    ) {
      data {
        id: questionFrontendId
        title
        titleSlug
        difficulty
      }
    }
  }
`
