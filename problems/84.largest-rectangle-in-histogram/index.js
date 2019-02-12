/**
 * https://leetcode.com/problems/largest-rectangle-in-histogram/
 */

require('../../libs/runDirect')

/**
 * 典型的单调栈思路
 *
 * 栈单调递增
 * 新元素大于等于栈首时直接入栈
 * 小于栈首时，依次把栈顶出栈，直到栈顶不大于新元素
 * 出栈时更新最大值
 * 栈内存元素下标，不存元素本身
 *
 * 因为是单调栈，所以栈里每一项元素的
 * 上一个值表示以该项高度向左扩展的最大边界索引(开区间)
 * 下一个值表示以该项高度向右扩展的最大边界索引(开区间)
 * 所以栈里每一项的前一个值后一值中间的长度，就是以该项高度为矩形的宽
 *
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
  const stack = [0]
  let max = 0

  heights.unshift(0)
  heights.push(0)
  for (let i = 0; i <= heights.length; i++) {
    while (heights[i] < heights[stack[0]]) {
      const last = stack.shift()
      max = Math.max(max, heights[last] * (i - stack[0] - 1))
    }
    stack.unshift(i)
  }

  return max
}

module.exports = largestRectangleArea
