require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 构建二叉搜索树，那就二分去递归
 * @param {number[]} nums
 * @param {number} start
 * @param {number} end
 * @return {TreeNode}
 */
let sortedArrayToBST = function (nums, start = 0, end = nums.length) {
  if (!nums || !nums.length) return null
  if (start >= end) return null
  let mid = ~~((end + start - 1) / 2)
  let root = new TreeNode(nums[mid])
  root.left = sortedArrayToBST(nums, start, mid)
  root.right = sortedArrayToBST(nums, mid + 1, end)
  return root
}

module.exports = sortedArrayToBST

module.exports.after = [result => result || [], result => [...result]]
