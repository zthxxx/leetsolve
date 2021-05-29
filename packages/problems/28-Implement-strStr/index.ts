/**
 * 28. Implement strStr()
 * [Easy] https://leetcode.com/problems/implement-strstr
 *
 * --------------------------------
 *
 * Implement [strStr()](http://www.cplusplus.com/reference/cstring/strstr/).
 *
 * Return the index of the first occurrence of needle in haystack, or `-1` if `needle` is not part of `haystack`.
 *
 * **Clarification:**
 *
 * What should we return when `needle` is an empty string? This is a great question to ask during an interview.
 *
 * For the purpose of this problem, we will return 0 when `needle` is an empty string. This is consistent to C's [strstr()](http://www.cplusplus.com/reference/cstring/strstr/) and Java's [indexOf()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#indexOf(java.lang.String)).
 *
 * **Example 1:**
 *
 *     Input: haystack = "hello", needle = "ll"
 *     Output: 2
 *
 *
 * **Example 2:**
 *
 *     Input: haystack = "aaaaa", needle = "bba"
 *     Output: -1
 *
 *
 * **Example 3:**
 *
 *     Input: haystack = "", needle = ""
 *     Output: 0
 *
 *
 * **Constraints:**
 *
 * -   `0 <= haystack.length, needle.length <= 5 * 104`
 * -   `haystack` and `needle` consist of only lower-case English characters.
 */


/**
 * KMP 搜索算法
 * https://www.zhihu.com/question/21923021/answer/1032665486
 */
function strStr(haystack: string, patten: string): number {
  if (!patten) return 0
  if (haystack.length < patten.length) return -1

  /**
   * KMP 中的前缀表
   * 每个元素值代表模式串中对应位置往前推的最大前缀长度
   *
   *           now              i
   *            |               |
   *  a b c a b d d d a b c a b c
   *  0 0 0 1 2 0 0 0 1 2 3 4 5 3
   *
   *
   *           now    i
   *            |     |
   *  a b c a b c a b d a d b c a b c
   *  0 0 0 1 2 3 4 5 0 1 0
   *
   *               now    i
   *              |     |
   *  a b c a b c a b c a d b c a b c
   *  0 0 0 1 2 3 4 5 6 7
   */
  const next: number[] = [0]
  /**
   * 前缀表解析中的 now 指针
   * 指向当前要判断是否匹配的字符的位置
   */
  let now: number = 0
  for (let i = 1; i < patten.length; i++) {
    // 对应位置字符不匹配则按 now = next[now - 1] 缩小 now
    while (now > 0 && patten[i] !== patten[now]) {
      now = next[now - 1]
    }

    // 如果还是对应不匹配，now 一定为 0；
    // 如果匹配，则当前位置的最大前缀长度即为 now 指向位置的长度，
    // 因为 now 从 0 开始，所以 +1
    if (patten[i] === patten[now]) {
      now += 1
    }

    next[i] = now
  }

  // 主串的搜索位置
  let m = 0
  // 模式串搜索位置
  let n = 0
  while (m < haystack.length) {
    // 当模式串位置字符和主串匹配时，两边位置同时走一步
    if (patten[n] === haystack[m]) {
      n += 1
      m += 1
    } else if (n !== 0) {
      // 失配时，模式串位置回溯到最大前缀长度，继续尝试匹配
      n = next[n - 1]
    } else {
      // 模式串都回溯到 0 位置了
      // 主串从下一个字符开始从头尝试匹配子串
      m += 1
    }

    if (n === patten.length) {
      return m - n
    }
  }

  return -1
}

export default strStr
