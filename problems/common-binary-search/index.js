require('../../libs/runDirect')


/**
 * 经典二分查找
 *
 * @param nums
 * @param target
 * @param start
 * @param end
 * @returns {*}
 */
const binarySearch = (nums, target, start, end) => {
  if (start > end) return null
  const middle = ~~((end + start) / 2)
  if (nums[middle] === target) return middle
  if (nums[middle] > target) return binarySearch(nums, target, start, middle - 1)
  else return binarySearch(nums, target, middle + 1, end)
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  return binarySearch(nums, target, 0, nums.length - 1)
}

module.exports = search
