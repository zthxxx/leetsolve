module.exports = {
  /**
   * set problems base directory relative this root
   */
  problemBase: './problems',

  /**
   * set common testcase file name
   */
  casefile: 'testcase.js',

  /**
   * set time limit to run per solve a test case (ms)
   */
  timeout: 2000,

  /**
   * how long per a case to be considered long that will
   * give a warning displayed (ms)
   */
  timewarn: 15,

  /**
   * whether or not to allow worker output stdio
   */
  workerLog: true,

  /**
   * whether or not to show worker debug level logging
   */
  workerDebug: false,

  /**
   * is allow to display feedback tips per problems
   */
  problemTips: true,

  /**
   * is allow to display feedback tips per test case
   */
  testcaseTips: true
}
