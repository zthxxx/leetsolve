require('../../libs/runDirect')


const MAX = Math.pow(2, 31)

/**
 * @param {number} x
 * @return {number}
 */
let reverse = function (x) {
  let rever = 0
  while (x !== 0) {
    rever *= 10
    rever += x % 10
    x /= 10
    x = x > 0 ? Math.floor(x) : Math.ceil(x)
    if (rever > MAX || rever < -MAX) return 0
  }
  return rever
}

module.exports = reverse
