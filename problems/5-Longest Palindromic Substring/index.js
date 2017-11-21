require('../../libs/runDirect')

/**
 * 判断字符串是否是回文
 * 前后同时遍历，O(n)
 * @param {string} s
 * @returns {boolean}
 */
function palindromic (s) {
  let i = 0
  let j = s.length - 1
  if (i === j) return true
  while (j > i) {
    if (s[i] === s[j]) {
      if (++i === j) return true
      if (--j === i) return true
    } else {
      return false
    }
  }
  return false
}

/**
 * 暴力来回扫，因为从两侧都要遍历，所以是 O(n^3)
 * 从第一个字符开始遍历 [O(n)]，
 * 依次判断从当前字符到从末尾向前遍历 [O(n)] 的字符串是否是回文 [O(n)]
 * 是则再比较最大长度，然后更新最长回文
 * @param {string} s
 * @return {string}
 */
let longestPalindrome_force = function (s) {
  if (!s.length) return ''
  let i = 0
  let j = s.length
  let maxSub = ''
  while (i < s.length - maxSub.length) {
    j = s.length
    while (j - i > maxSub.length) {
      let sub = s.slice(i, j)
      let is = palindromic(sub)
      if (is) {
        maxSub = sub
      }
      j -= 1
    }
    i += 1
  }
  return maxSub
}


/**
 * 探测从当前左右节点开始
 * 向两边延伸的最长回文端点 O(n)
 * @param {string} s
 * @param {number} left
 * @param {number} right
 * @returns {[number,number]} left, right
 */
function detectPalindrome (s, left, right) {
  if (s[left] !== s[right]) return [left + 1, right - 1]
  while (left > 0 && right < s.length - 1) {
    if (s[left - 1] !== s[right + 1]) break
    left -= 1
    right += 1
  }
  return [left, right]
}

/**
 * 朴素算法，O(n^2)
 * 以一个字符作为中心向两边扩展判断
 * 区分单个字符作为中心和两个字符作为中心
 * @param {string} s
 * @returns {string}
 */
let longestPalindrome_naive = function (s) {
  if (!s.length) return ''
  let i = 0
  let j = 0
  let maxSub = ''
  while (j < s.length - ~~(maxSub.length / 2)) {
    let [left, right] = detectPalindrome(s, i, j)
    if (right - left + 1 > maxSub.length) {
      maxSub = s.slice(left, right + 1)
    }
    [i, j] = [j, j + (i === j ? 1 : 0)]
  }
  return maxSub
}


/**
 * Manacher算法，O(n)
 * 类似于 KMP 思想，首先在每个字符件插入 '#'，屏蔽奇偶差异
 * 把原始每个字符变成对应现在的奇数下标
 * 用一个半径数组，记录以每个下标为中心的最长回文长度
 * 计算下一个字符（为中心的最长回文长度）时
 * 通过回文对称性，避免掉以当前字符为中心，对称点记录长度范围内的回文判断
 * 直接从对称回文长度外的位置开始探测，
 * 对每个未探测位置，只有 O(n) 的遍历性
 * @param {string} s
 * @returns {string}
 */
let longestPalindrome_Manacher = function (s) {
  if (!s.length) return ''
  let fill = ['', ...s, ''].join('#')
  let pos = 0
  let maxRight = 0
  let radius = new Array(fill.length).fill(0)
  let i = 0
  while (maxRight < fill.length) {
    let j = Math.max(2 * pos - i, 0)
    let rstart = Math.min(radius[j] + i, maxRight)
    rstart = Math.max(rstart, i)
    let lstart = 2 * i - rstart
    let [, right] = detectPalindrome(fill, lstart, rstart)
    radius[i] = right - i
    if (right > maxRight) {
      maxRight = right
      pos = i
    }
    i++
  }
  let len = Math.max(...radius)
  let center = radius.indexOf(len)
  let left = (center - len) / 2
  let right = (center + len) / 2
  return s.slice(left, right)
}

module.exports = [
  longestPalindrome_force,
  longestPalindrome_naive,
  longestPalindrome_Manacher
]
