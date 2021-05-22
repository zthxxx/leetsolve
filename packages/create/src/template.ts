/* eslint-disable no-await-in-loop */
import path from 'path'
import { promises as fs, existsSync } from 'fs'
import glob from 'fast-glob'
import {
  resolveConfig,
  format,
  type Options as PrettierOptions,
} from 'prettier'


/** template variables context */
export interface TemplateContext {
  questionTitle: string;
  questionURL: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  codeSnippet: string;
  testcases: string;
}


export const topicTemplateMap: { [key: string]: string } = {
  'Linked List': 'linked-list',
  'Binary Tree': 'binary-tree',
}

export const findTopicTemplate = (topics: string[]): string => {
  for (const topic of topics) {
    if (topicTemplateMap[topic]) {
      return topicTemplateMap[topic]
    }
  }
  return 'default'
}

export const getTemplateDir = (mode: string) =>
  path.join(__dirname, '..', 'templates', mode)

/**
 * compile the template text with Handlebars like syntax
 * https://handlebarsjs.com/guide/expressions.html#basic-usage
 */
export const compileTemplateText = (template: string, context: TemplateContext): string => {
  let result = template

  for (const [key, value] of Object.entries(context)) {
    result = result.replaceAll(`{{${key}}}`, value)
  }

  return result
}

export const appleTemplateProject = async ({ sourceDir, targetDir, context }: {
  /** absolute path for template project dir */
  sourceDir: string;
  /** path relative from cwd */
  targetDir: string;
  /** template variables context */
  context: TemplateContext;
}) => {
  // path relative from templateProject
  const files = await glob(['**/*', '**/.*'], { cwd: sourceDir })
  const prettierOptions: PrettierOptions | undefined = await resolveConfig(process.cwd()) ?? undefined

  for (const file of files) {
    const sourceFilePath = path.join(sourceDir, file)
    const targetFilePath = path.join(targetDir, file)
    const sourceFile = await fs.readFile(sourceFilePath, { encoding: 'utf-8' })

    const targetFile = compileTemplateText(sourceFile, context)
    const formatted = format(
      targetFile,
      {
        ...prettierOptions,
        filepath: targetFilePath,
      },
    )

    const targetFileDir = path.dirname(targetFilePath)
    if (!existsSync(targetFileDir)) {
      await fs.mkdir(targetFileDir, { recursive: true })
    }

    await fs.writeFile(
      targetFilePath,
      formatted,
      { flag: 'w', encoding: 'utf-8' },
    )
  }


}
