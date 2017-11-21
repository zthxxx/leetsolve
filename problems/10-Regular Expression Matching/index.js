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

function matchCore (s, stack) {
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
        if (j === stack.length - 1) return true
        else {
          j += 1
          continue
        }
      }
      if (pattern[0] !== '.' && pattern[0] !== s[i]) {
        j += 1
        continue
      }
      return matchCore(s.slice(i), stack.slice(j + 1)) ||
        matchCore(s.slice(i + 1), stack.slice(j))
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
 * abc*b.c -> [ab, c*, b.c]
 * 只有包含 `*` 的组不定长，其余均定长
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let isMatch = function (s, p) {
  if (!s.length && !p.length) return true
  if (p.includes('**')) return false
  let stack = patternStack(p)
  return matchCore(s, stack)
}

module.exports = [
  // isMatch_naive,
  isMatch
]

require('../../libs/runDirect')
