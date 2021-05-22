import chalk from 'chalk'
import ora from 'ora'
import type { Ora } from 'ora'

/**
 * https://github.com/sindresorhus/ora
 */
export const spinner: Ora = ora()

export const logger = {
  info: (...messages: any[]) => console.info(
    chalk.greenBright.bold('[@leetsolve/create]'),
    ...messages,
  ),

  error: (...messages: any[]) => {
    console.error(
      chalk.redBright.bold('[@leetsolve/create][error]'),
      ...messages,
    )
  },
}
