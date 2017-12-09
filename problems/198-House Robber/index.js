require('../../libs/runDirect')

let max = Math.max

/**
 * 典型的动态规划
 * 用 dp[i] 来保存到每个位置 i 时
 * 能获取到的最大值
 * 因为不能两两相连
 * 所以如果不选当前，那么当前最大值一定和前一项一样
 * dp[i] = dp[i - 1]  (当前值没有做贡献)
 * 如果选了当前值，就一定不能选上一项
 * 那么当前最大值一定是 前隔一项的最大值值加当前值本身
 * 即 dp[i] = dp[i - 2] + nums[i] (当前值参与贡献)
 * 可以看出这里条件中的 i 一定大于第二项
 * 显然前两项没有前置条件，并且本身互斥
 * 所以第一项最大值只有其本身
 * 所以第二项的最大值就是前两个值中较大的那个
 * dp[0|1] = nums[0|1]
 * @param {number[]} nums
 * @return {number}
 */
let rob = function (nums) {
  if (!nums.length) return 0
  if (nums.length === 1) return nums[0]
  let dp = [nums[0], max(nums[0], nums[1])]
  for (let i = 2; i < nums.length; i++) {
    dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return max(...dp)
}

module.exports = rob

