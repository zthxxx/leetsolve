/**
 * https://leetcode.com/problems/trapping-rain-water/description/
 */

require('../../libs/runDirect')

/**
 * 简单的思想甚至用不上动态规划
 * 只需遍历计算每个点的最大蓄水深度即可
 * 每个点的最大蓄水深度 = 该点左右两边两个最高点中最低的那个高度 - 该点的高度
 *
 * 遍历两遍，用两个相同长度的数组，
 * 分别保存每个点向左和向右中最高的点的高度
 * 再遍历一遍就能计算蓄水的和
 *
 * 数组中有一个最高的点，
 * 向右的最大高度数组中，索引小于这个点的所有值肯定是这个最大高度，
 * 只有最右边的索引可能有不同，
 * 所以只需要从右往左(从后往前)遍历，依次记录当前的最大值就行
 *
 * 同理向左最大值也反过来遍历一遍即可
 *
 * 原数组
 *            ____
 *    __    _|    |
 *   |  |__|      |__
 * __|               |__
 *
 * 向右最大值数组
 * _______________
 *                |
 *                |__
 *                   |__
 *
 */

/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
  if (!height.length) return 0
  const rights = []
  const lefts = []
  let sum = 0

  for (let max = 0, i = height.length - 1; i >= 0; i--) {
    max = Math.max(height[i], max)
    rights.unshift(max)
  }

  for (let max = 0, i = 0; i < height.length; i++) {
    max = Math.max(height[i], max)
    lefts.push(max)
  }

  for (let i = 0; i < height.length; i++) {
    sum += Math.min(lefts[i], rights[i]) - height[i]
  }

  return sum
}

module.exports = trap
