/**
 * 投机写法，使用原生正则对象
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let isMatch_naive = function (s, p) {
  p = `^${p}$`
  return !!s.match(p)
}


/**
 * 顺序匹配测试，
 * 只有文本和单字符匹配符 `.`
 * 没有多字符匹配符 `*`
 * @param s
 * @param p
 * @returns {boolean}
 */
function inturnMatch (s, p) {
  if (!s.length) return false
  if (s.length < p.length) return false
  if (s === p) return true
  let i = 0
  while (i < s.length) {
    if (p[i] !== '.') {
      if (s[i] !== p[i]) return false
    }
    i += 1
  }
  return true
}


/**
 * 把匹配字符串根据 `*` 切割成匹配栈
 * 匹配栈的每一项要么是固定长元素，要么是两个字符的 `x*`
 * @param p
 * @returns {Array}
 */
function patternStack (p) {
  p = [...p]
  let stack = []
  while (p.length) {
    let index = p.indexOf('*')
    if (index > 1) stack.push(p.splice(0, index - 1))
    if (index > 0) stack.push(p.splice(0, 2))
    if (index < 0) stack.push(p.splice(0))
  }
  return stack.map(item => item.join(''))
}

/**
 * 根据模式栈匹配字符串
 * 对于匹配模式为固定项的，直接匹配，然后字符串和匹配模式都进入下一项
 * 对于不定长模式，确认下退出条件然后按字符顺序试探是否要进入下一个模式
 * 如果字符串已经耗尽了，不定长项是最后一项，那么匹配成功，
 * 如果不是最后一项，那么依次试探下一项是不是不定长项
 * 如果匹配项不定长，但又不是 `.*` 的任意匹配，那么第一个字符一定是个
 * 给定的匹配字符，如果不定长项的匹配字符和当前字符串位置的字符不一样
 * 那么应该依次试探下一个匹配模式
 * 应为遇到不定长项时会连续重复的试探是否进入下一项，
 * 导致总的时间复杂度为 O(n^2)
 * @param {string} s
 * @param {string[]} stack
 * @returns {boolean}
 */
function matchStackCore (s, stack) {
  let i = 0
  let j = 0
  while (j < stack.length) {
    let pattern = stack[j]
    if (pattern[1] !== '*') {
      let now = s.slice(i, i + pattern.length)
      if (!inturnMatch(now, pattern)) return false
      i += pattern.length
    } else {
      if (i >= s.length) {
        if (j === stack.length - 1) { return true }
        else {
          j += 1
          continue
        }
      }
      if (pattern[0] !== '.' && pattern[0] !== s[i]) {
        j += 1
        continue
      }
      return matchStackCore(s.slice(i), stack.slice(j + 1)) ||
        matchStackCore(s.slice(i + 1), stack.slice(j))
    }
    j += 1
    if (i === s.length && j === stack.length) return true
  }
  return false
}


/**
 * 只有 `*` 不是单个字符操作
 * 以 `*` 和 `*` 前一个字符为分割点，
 * 分割匹配模式串（如果 `*` 前是 `*`，那么模式不合格）
 * 为定长项和不定长项
 * abc*b.c -> [ab, c*, b.c]
 * 只有包含 `*` 的组不定长，其余均定长
 * 再依次匹配各个模式
 * 遇到不定长项时试探是否进入下一项
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let isMatch_stack = function (s, p) {
  if (!s.length && !p.length) return true
  if (p.includes('**')) return false
  let stack = patternStack(p)
  return matchStackCore(s, stack)
}

/**
 * 回溯法
 * 和用模式栈的思想一致，只是变成逐字判断
 * 写法简洁一点
 * 时间复杂度为 O(n^2)
 * @param {string} s
 * @param {string} p
 * @returns {boolean}
 */
function matchCore (s, p) {
  let i = 0
  let j = 0
  while (j < p.length) {
    if (p[j + 1] !== '*') {
      if (p[j] !== s[i] && (p[j] !== '.' || !s[i])) return false
      i++
      j++
    } else {
      if (i >= s.length) return matchCore(s.slice(i), p.slice(j + 2))
      if (p[j] === s[i] || p[j] === '.' && s[i]) {
        return matchCore(s.slice(i), p.slice(j + 2)) ||
          matchCore(s.slice(i + 1), p.slice(j))
      }
      return matchCore(s.slice(i), p.slice(j + 2))
    }
  }
  return i >= s.length
}

let isMatch_backtracking = function (s, p) {
  if (!s.length && !p.length) return true
  return matchCore(s, p)
}

/**
 * 动态规划法
 * https://discuss.leetcode.com/topic/17852/9-lines-16ms-c-dp-solutions-with-explanations
 * 核型是建立一个 dp[n][m] 的 boolean 矩阵
 * 用 dp[i][j] 表示从 p[0,j) 是否匹配 s[0, i)
 * 两层遍历，复杂度 O(n x m)
 * @param {string} s
 * @param {string} p
 * @returns {boolean}
 */
let isMatch_DP = function (s, p) {
  let dp = [...new Array(s.length + 1)].map(
    () => new Array(p.length + 1).fill(false)
  )
  dp[0][0] = true
  let i = 0
  let j = 1
  while (i <= s.length) {
    j = 1
    while (j <= p.length) {
      if (p[j - 1] !== '*') {
        if (i > 0) {
          if (p[j - 1] === s[i - 1] || p[j - 1] === '.') dp[i][j] = dp[i - 1][j - 1]
        }
      } else {
        if (dp[i][j - 2]) {
          dp[i][j] = true
        }
        else if (i > 0) {
          if (p[j - 2] === s[i - 1] || p[j - 2] === '.') dp[i][j] = dp[i - 1][j]
        }
      }
      j++
    }
    i++
  }
  return dp[s.length][p.length]
}

module.exports = [
  isMatch_naive,
  isMatch_stack,
  isMatch_backtracking,
  isMatch_DP
]

require('../../libs/runDirect')
