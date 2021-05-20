import chalk from 'chalk'

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
