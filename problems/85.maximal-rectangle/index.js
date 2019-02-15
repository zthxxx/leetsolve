/**
 * https://leetcode.com/problems/maximal-rectangle/
 */

require('../../libs/runDirect')

/**
 * 84 题求直方图最大矩形面积
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
  const stack = [0]
  let max = 0

  heights = [0, ...heights, 0]
  for (let i = 0; i <= heights.length; i++) {
    while (heights[i] < heights[stack[0]]) {
      const last = stack.shift()
      max = Math.max(max, heights[last] * (i - stack[0] - 1))
    }
    stack.unshift(i)
  }

  return max
}

/**
 * 把矩阵连续的每列累加，
 * 如果遇到断行 ('0') 就重新开始累加
 *
 * 这样把矩阵转为向上连续的多行直方图，
 * 进而可以使用 84 题的求直方图中最大矩阵面积来计算
 *
 * 累加操作是 O(M x N)
 * 直方图求面结也是 O(M x N)
 *
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalRectangle = function (matrix) {
  if (!matrix.length) return 0

  const serials = [matrix[0].map(item => (item === '0' ? 0 : 1))]
  for (let row = 1; row < matrix.length; row++) {
    serials[row] = matrix[row]
      .map((value, col) => value !== '0' ?
        serials[row - 1][col] + 1 :
        0,
      )
  }
  return Math.max(...serials.map(largestRectangleArea))
}

module.exports = maximalRectangle
