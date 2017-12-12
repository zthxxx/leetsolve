require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


function inorder (root, handle) {
  if (root.left) inorder(root.left, handle)
  handle(root.val)
  if (root.right) inorder(root.right, handle)
}

/**
 * 只能使用 O(1) 的额外空间
 * 初步想法是用两次遍历
 * 第一次用来确定最长重复长度是多少
 * 第二次遍历遇到重复这么多次的就输出
 * 因为是 BST 所以中序遍历的的时候
 * 重复项也会挨在一起，
 * 这样就能在遍历时计算重复长度了
 * O(n) time, O(1) space
 * @param {TreeNode} root
 * @return {number[]}
 */
let findMode = function (root) {
  if (!root) return []
  let last = null
  let currCount = 1
  let maxCount = 1
  let modes = []

  function find (val) {
    if (val === last) {
      currCount += 1
      if (currCount > maxCount) maxCount = currCount
    } else {
      currCount = 1
      last = val
    }
  }

  function output (val) {
    if (val === last) {
      currCount += 1
    } else {
      currCount = 1
      last = val
    }
    if (currCount === maxCount) modes.push(val)
  }

  inorder(root, find)

  last = null
  currCount = 1

  inorder(root, output)

  return modes
}

module.exports = findMode

module.exports.before = levels => [TreeNode.gen(levels)]
