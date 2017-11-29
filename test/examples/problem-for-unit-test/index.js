
function successWithExpectTrue () {
  return true
}

function alwaysNotExpect () {
  return 'not anything'
}

function timeoutWithInputFalse (flag) {
  if (flag === false) {
    while (true)
      ;
  }
  return true
}

module.exports = [
  successWithExpectTrue,
  alwaysNotExpect,
  timeoutWithInputFalse
]

timeoutWithInputFalse.timeout = 500
