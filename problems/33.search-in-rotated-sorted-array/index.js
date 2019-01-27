/**
 * https://leetcode.com/problems/search-in-rotated-sorted-array/
 */

require('../../libs/runDirect')


/**
 *      __
 *     /  |
 *    /   |
 * __/    |
 *        |      /
 *        |  ___/
 *        | /
 *        |/
 *
 * 显然是用二分查找，但是有变化
 * 不管是在有旋转的还是完全单调的分段上，
 * 只要 *start < *middle  (* 符号表示取指针指向的值)
 * 或者 *middle < *end
 * 那么在 [start, middle] 和 [middle, end] 的闭区间内就严格单调
 *
 * 于是只需判断 target 是否落在单调区间中就能逐步缩小范围
 * 不在单调区间内需要判断 middle 和首位的大小关系
 * (注意比较符号和等号关系，比较复杂)
 *
 * 终止条件是 start > end：即已经完成搜索
 * 或，*middle == target：即找到目标
 *
 * 局限是当有连续相同的 target 值时，
 * 不能保证查找位置为重复段的首或尾
 */

const binarySearch = (nums, target, start, end) => {
  if (start > end) return -1

  const middle = ~~((end + start) / 2)
  if (nums[middle] === target) return middle

  if (target < nums[middle]) {
    if (nums[start] <= target || nums[middle] < nums[start]) {
      return binarySearch(nums, target, start, middle - 1)
    } else {
      return binarySearch(nums, target, middle + 1, end)
    }
  } else {
    if (target <= nums[end] || nums[end] < nums[middle]) {
      return binarySearch(nums, target, middle + 1, end)
    } else {
      return binarySearch(nums, target, start, middle - 1)
    }
  }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  return binarySearch(nums, target, 0, nums.length - 1)
}


const binarySearchMaxIndex = (nums, start, end) => {
  const middle = ~~((end + start) / 2)
  if (middle === start) return middle

  if (nums[start] <= nums[middle]) {
    return binarySearchMaxIndex(nums, middle, end)
  }
  if (nums[middle] <= nums[end]) {
    return binarySearchMaxIndex(nums, start, middle)
  }
}

const commonBinarySearch = (nums, target, start, end) => {
  if (start > end) return -1
  const middle = ~~((end + start) / 2)
  if (nums[middle] === target) return middle
  if (nums[middle] > target) return commonBinarySearch(nums, target, start, middle - 1)
  else return commonBinarySearch(nums, target, middle + 1, end)
}

/**
 * 另一种简单的思想，
 * 先分割出两个单调区间，
 * 再分别应用经典二分查找
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchTwoSteps = function (nums, target) {
  const maxIndex = binarySearchMaxIndex(nums, 0, nums.length - 1)
  return Math.max(
    commonBinarySearch(nums, target, 0, maxIndex),
    commonBinarySearch(nums, target, maxIndex + 1, nums.length - 1),
  )
}


module.exports = [
  search,
  searchTwoSteps
]
