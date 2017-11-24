require('../../libs/runDirect')


const romanDigit = [
  ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
  ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
  ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
  ['', 'M', 'MM', 'MMM', 'MMMM', 'MMMMM']
]

/**
 * 查表法。。。O(1)
 * 因为能直接列举几个有穷列
 * @param {number} num
 * @return {string}
 */
let intToRoman_table = function (num) {
  let result = ''
  let digit = 0
  while (num) {
    result = romanDigit[digit][num % 10] + result
    num = Math.floor(num / 10)
    digit += 1
  }
  return result
}


const romanMap = ['I', 'V', 'X', 'L', 'C', 'D', 'M']

/**
 * 有了上面的表，很容易就能写出解析规律
 * 基本上能看成一种 `3 进制`
 * 5 以上和 5 以下是重复的规律
 * 只需要在 4 那里判断一下改下规律
 * @param {number} num
 * @return {string}
 */
let intToRoman_parse = function (num) {
  let result = ''
  let digit = 0
  while (num) {
    let unit = num % 10
    let carry = false
    let roman = null
    if (unit >= 5) {
      unit -= 5
      carry = true
    }
    if (unit < 4) {
      roman = (carry ? romanMap[digit + 1] : '') + new Array(unit).fill(romanMap[digit]).join('')
    } else {
      roman = romanMap[digit] + romanMap[digit + (carry ? 2 : 1)]
    }
    result = roman + result
    num = Math.floor(num / 10)
    digit += 2
  }
  return result
}


module.exports = [
  intToRoman_table,
  intToRoman_parse
]
