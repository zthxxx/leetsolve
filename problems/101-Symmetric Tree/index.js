require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 判断树的一层是否是对称
 * @param {TreeNode[]} level
 * @return {boolean}
 */
function isPalindrome (level) {
  if (level.length < 2) return true
  let end = level.length - 1
  for (let i = 0; i < end - i; i++) {
    let left = level[i] && level[i].val
    let right = level[end - i] && level[end - i].val
    if (left !== right) return false
  }
  return true
}

/**
 * 想到层序遍历
 * 每层判断对称
 * O(n) 的出入队列导致效率有点低
 * @param {TreeNode} root
 * @return {boolean}
 */
let isSymmetric_level = function (root) {
  if (!root) return true
  let level = [root]
  let nextLevel = []
  while (level.length) {
    if (!isPalindrome(level)) return false
    while (level.length) {
      let node = level.shift()
      if (node) {
        nextLevel.push(node.left)
        nextLevel.push(node.right)
      }
    }
    level = nextLevel
    nextLevel = []
  }
  return true
}

/**
 * 判断左右两树是否镜像
 * @param left
 * @param right
 * @return {*}
 */
function mirror (left, right) {
  if (!left ^ !right) return false
  if (!left && !right) return true
  if (left.val !== right.val) return false
  return mirror(left.left, right.right) &&
    mirror(left.right, right.left)
}

/**
 * 每次递归分别判断两边是否对称
 * 通过递归的方式改善上面用数组做队列的效率问题
 * @param {TreeNode} root
 * @return {boolean}
 */
let isSymmetric = function (root) {
  if (!root) return true
  return mirror(root.left, root.right)
}

module.exports = [
  isSymmetric_level,
  isSymmetric
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]

