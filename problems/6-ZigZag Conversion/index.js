require('../../libs/runDirect')

/**
 * convert ZigZag string
 * 0 1 2 3 4 5 6 7 8 10 11 12 13 14
 *
 * 0     6       12
 * 1   5 7    11 13
 * 2 4   8 10    14
 * 3     9
 *
 * 很简单的找规律
 * 输入 n 为行数
 * 那么一个循环内的字符数为 m = (n + n - 2)
 * s 最后循环不满的话，布满一个循环
 * i 为原来数组下标的话，
 * 转换后，首行需要满足下标 i = km 即 i % m == 0
 * 尾行需要满足下标 i = 尾行序号 + km 即 (i - 尾行序号) % m == 0
 * 中间每行有两种满足的下标
 * i = 本行序号 + km 或 i = loop - 本行序号 + km
 * 即 (i - 本行序号) % m 或 (i - (loop - 本行序号)) % m
 * 最后把每行拼接起来成字符串就好
 * 因为提出序号是 O(n)，遍历行号是 O(m)，总的是 O(n * m)
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert_naive = function (s, numRows) {
  if (numRows <= 0) return ''
  if (numRows === 1) return s
  let loop = (numRows + numRows - 2)
  let fillLen = (loop - s.length % loop) % loop
  s = [...s]
  s.push(...new Array(fillLen).fill(''))
  let result = []
  result.push(...s.filter((chr, i) => i % loop === 0))
  let row = 1
  while (row < numRows - 1) {
    result.push(...s.filter((chr, i) => {
      return (i - row) % loop === 0 || (i + row - loop) % loop === 0
    }))
    row += 1
  }
  result.push(...s.filter((chr, i) => (i - row) % loop === 0))
  return result.join('')
}


/**
 * 有了上面的下标序号关系
 * 直接计算新数组到原数组的下标关系
 * row 为行号，col 为列号
 * 每行竖直的那列 new[i] = s[row + loop * col]
 * 除开首尾中间那些，每行多一种
 * new[i] = s[loop - row + loop * col]
 * loop = n + n - 2
 * 对每个数只访问一次，显然 O(n)
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert = function (s, numRows) {
  if (numRows <= 0) return ''
  if (numRows === 1) return s
  let loop = (numRows + numRows - 2)
  let fillLen = (loop - s.length % loop) % loop
  s = [...s]
  s.push(...new Array(fillLen).fill(''))
  let k = s.length / loop
  let result = []
  let row = 0
  let col = 0
  while (row < numRows) {
    col = 0
    while (col < k) {
      result.push(s[row + loop * col])
      if (row !== 0 && row !== numRows - 1) {
        result.push(s[loop - row + loop * col])
      }
      col += 1
    }
    row += 1
  }
  return result.join('')
}

module.exports = [
  convert_naive,
  convert
]
