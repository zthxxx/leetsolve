const fs = require('fs')
const path = require('path')
const assert = require('assert')
const logger = require('./lib/logger')

const TEST_CASE = 'testcase.js'
const problemPath = path.resolve('problems')
const problems = fs.readdirSync(problemPath)

for (let problem of problems) {
    let solution = require(path.join(problemPath, problem));
    let testcases = require(path.join(problemPath, problem, TEST_CASE));
    for (let {input, expect} of testcases) {
        console.time('#################');
        let answer = solution(...input);
        console.timeEnd('#################');
        logger.info('Get Answer', answer, ' Expect to', expect);
        assert.deepEqual(answer, expect, `

        Error at ${problem}:
        with input ${JSON.stringify(input)}
        get answer ${JSON.stringify(answer)} , but expect ${JSON.stringify(expect)}

        `);
        logger.success('testcase ok.');
        logger.log();

    }
    logger.success(problem, 'all testcase are ok!');
}
