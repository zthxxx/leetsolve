require('../../libs/runDirect')

const MAX_INTEGER = Math.pow(2, 38)

/**
 * @param {number} x
 * @return {boolean}
 */
let isPalindrome = function (x) {
  if (x < 0 || x > MAX_INTEGER) return false
  let rever = 0
  let origin = x
  while (x > 0) {
    rever *= 10
    rever += x % 10
    x = Math.floor(x / 10)
  }
  return rever === origin
}

module.exports = isPalindrome
