/**
 * https://leetcode.com/problems/maximal-square/
 */

require('../../libs/runDirect')

/**
 * dp[x][y] 二维数组用于保存「以点 (x, y) 为右下角的最大矩阵的宽度」
 * 依次从左上角遍历到右下角
 * 当递推时，若能组成更大的正方形，
 * 必然是左上、左、上 三个元素都有值，且对应 dp 值(正方形宽度)一样
 * 那么当前形成正方形宽度比之前 +1
 * 如果左上、左、上三个位置的 dp 值不同，
 * 当前能形成的最大正方形一定最多只能与较小的正方形形成新的正方形
 * 所以只能比 左上、左、上 中最小的宽度 +1
 *
 * 递推公式：
 * dp[x][y] = min(dp[x-1][y-1], dp[x-1][y], dp[x][y-1]) + 1
 * 且 matrix[x][y] 本身有值
 * 边界条件 dp 左、上边界完全等于原矩阵左上边界
 *
 * 时间复杂度 O(M x N)
 *
 *   x
 *  ----->             dp[][]
 * y| 1 0 1 0 0       1 0 1 0 0
 *  | 1 0 1 1 1  -->  1 0 1 1 1
 *  v 1 1 1 1 1       1 1 1 2 1
 *    1 0 0 1 0       1 0 0 1 0
 *
 *   x
 *  ----->             dp[][]
 * y| 1 1 1 1 0       1 1 1 1 0
 *  | 1 1 1 1 1  -->  1 2 2 2 1
 *  v 1 1 1 1 1       1 2 3 3 2
 *    1 1 1 1 0       1 2 3 4 0
 */

/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalSquare = function (matrix) {
  if (!matrix.length || !matrix[0].length) return 0

  const dp = matrix.map(items => items.map((v, i) => i || v === '0' ? 0 : 1))
  dp[0] = matrix[0].map(value => value === '0' ? 0 : 1)

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (matrix[i][j] !== '0') {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1
      }
    }
  }

  const maxWidth = Math.max(...dp.map(values => Math.max(...values)))
  return maxWidth ** 2
}

module.exports = maximalSquare
