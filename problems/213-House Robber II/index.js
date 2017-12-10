require('../../libs/runDirect')

const max = Math.max

/**
 * 用 #198 的规则
 * 只计算给定范围（包含起始）内的最大值
 * @param {number[]} nums
 * @param {number} start - 起始位置
 * @param {number} end - 结束位置
 * @return {number}
 */
let robRange = function (nums, start, end) {
  let dp = [nums[start], max(nums[start], nums[start + 1])]
  for (let i = start + 2; i <= end; i++) {
    let j = i - start
    dp[j] = max(dp[j - 1], dp[j - 2] + nums[i])
  }
  let last = end - start
  return max(dp[last - 1], dp[last])
}

/**
 * 和上一题 #198 类似
 * 只是我们要让第一个和最后一个不能同时选中
 * 那么很简单，只需要我们完全排除掉第一项或最后一项就行
 * 去掉第一项就表示一定不选择第一项，但可能选最后一项
 * 去掉最后一项的思想同理
 * 这样就绝对避免了重复选中的问题
 * 且之前的计算关系也没有任何影响
 * @param {number[]} nums
 * @return {number}
 */
let rob = function (nums) {
  if (!nums) return 0
  let len = nums.length
  if (len < 3) return max(nums[0] || 0, nums[1] || 0)
  return max(robRange(nums, 0, len - 2), robRange(nums, 1, len - 1))
}

module.exports = rob
