const fs = require('fs')
const path = require('path')
const { config } = require('../libs/configs')
const Leetsolve = require('./master')


const pathBase = path.join(__dirname, '..')
const problemBase = path.join(pathBase, config.problemBase)
const getIndex = name => name.match(/\d+(?=-)/) || 0
const problems = fs.readdirSync(problemBase)
  .filter(item => fs.statSync(path.join(problemBase, item)).isDirectory())
  .sort((a, b) => getIndex(b) - getIndex(a))

const cores = require('os').cpus().length
new Leetsolve(problemBase, problems, cores).run()

