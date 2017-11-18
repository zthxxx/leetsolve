/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function (nums, target) {
  for (let [index, num] of nums.entries()) {
    let other = target - num
    let otherIndex = nums.indexOf(other)
    if (otherIndex !== -1 && otherIndex !== index) {
      return [index, otherIndex]
    }
  }
}

module.exports = twoSum
