/**
 * 1047. Remove All Adjacent Duplicates In String
 * [Easy] https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string
 *
 * --------------------------------
 *
 * You are given a string `s` consisting of lowercase English letters. A **duplicate removal** consists of choosing two **adjacent** and **equal** letters and removing them.
 *
 * We repeatedly make **duplicate removals** on `s` until we no longer can.
 *
 * Return *the final string after all such duplicate removals have been made*. It can be proven that the answer is **unique**.
 *
 * **Example 1:**
 *
 *
 *     Input: s = "abbaca"
 *     Output: "ca"
 *     Explanation:
 *     For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
 *
 *
 * **Example 2:**
 *
 *
 *     Input: s = "azxxzy"
 *     Output: "ay"
 *
 *
 * **Constraints:**
 *
 * -   `1 <= s.length <= 105`
 * -   `s` consists of lowercase English letters.
 */


/**
 * NOTE: this solution is add more limit rule for origin leetcode problem:
 *   Origin problem rule is only two pair duplicates chars will be removed,
 *   so will leaved one char if odd number of chars,
 *      like "aaa" => "a", "aacccb" => "cb"
 *   However solution will really remove all duplicates,
 *      "aaa" => "", "aacccb" => "b"
 */
function removeDuplicates(str: string): string {
  if (str.length < 2) {
    return str
  }

  let index = -1
  const stack: string[] = []

  while (index < str.length) {
    const current: string = str[index]
    const next: string = str[index + 1]

    if (current !== next) {
      const top = stack.at(-1)
      if (stack.at(-2) === top) {
        while (stack.length && stack.at(-1) === top) {
          stack.pop()
        }
      }
    }

    if (index != str.length - 1) {
      stack.push(next)
    }

    index += 1
  }

  return stack.join('')
}

export default removeDuplicates
