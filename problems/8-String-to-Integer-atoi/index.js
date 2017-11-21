require('../../libs/runDirect')

const NUM_ASCILL_START = '0'.charCodeAt(0)
const NUM_ASCILL_END = '9'.charCodeAt(0)

/**
 * 转换核心函数，不判断特殊字符，
 * 遇到不认识的字符就返回已有数字
 * @param {string} str
 * @return {number}
 */
function atoiCore (str) {
  let i = 0
  let integer = 0
  while (i < str.length) {
    let code = str.charCodeAt(i++)
    if (code < NUM_ASCILL_START || code > NUM_ASCILL_END) return integer
    integer *= 10
    integer += code - NUM_ASCILL_START
  }
  return integer
}

const MAX_INTEGER = Math.pow(2, 31) - 1
const MIN_INTEGER = -Math.pow(2, 31)

/**
 * 字符串转整形
 * 判断开头字符情况
 * 去掉一些特殊字符
 * 中间转换交给转换核心
 * 判断最终数值范围
 * @param {string} str
 * @return {number}
 */
let myAtoi = function (str) {
  let minus = false
  str = str.trim()
  if (!str.length) return 0
  if (str[0] === '-' || str[0] === '+') {
    minus = str[0] === '-'
    str = str.slice(1)
  }
  while (str[0] === '0') {
    str = str.slice(1)
  }
  let integer = atoiCore(str)
  return minus ?
    Math.max(-integer, MIN_INTEGER) :
    Math.min(integer, MAX_INTEGER)
}

module.exports = myAtoi
