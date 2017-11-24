require('../../libs/runDirect')


/**
 * 一左一右两块木板
 * 因为是寻找容量最大
 * 所以要么是跨度长，要么是挡板高
 * 我们从跨度开始，一左一右跨度最大
 * 然后每次把矮的那块挡板往中间移动
 * 相当于测试增加高度减少跨度
 * 遍历一遍，每次更新最大容量
 * 时间复杂度 O(n)
 * @param {number[]} height
 * @return {number}
 */
let maxArea = function (height) {
  let left = 0
  let right = height.length - 1
  let maxVol = 0
  while (left < right) {
    let vol = Math.min(height[left], height[right]) * (right - left)
    maxVol = vol > maxVol ? vol : maxVol
    if (height[left] > height[right]) right--
    else left++
  }
  return maxVol
}

module.exports = maxArea
