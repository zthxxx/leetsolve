const run = require('./libs/cluster')

function loop () {
  while (true)
    ;
}

function ask () {
  return { answer: 100 }
}

run(loop)
// run(ask)
