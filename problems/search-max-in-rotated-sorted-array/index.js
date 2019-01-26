require('../../libs/runDirect')


const binarySearch = (nums, start, end) => {
  const middle = ~~((end + start) / 2)
  if (middle === start) return nums[start]

  if (nums[start] <= nums[middle]) {
    return binarySearch(nums, middle, end)
  }
  if (nums[middle] <= nums[end]) {
    return binarySearch(nums, start, middle)
  }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
const searchMax = function (nums) {
  return binarySearch(nums, 0, nums.length - 1)
}

module.exports = searchMax
