require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 和上一题 #112 做法一样
 * 仅仅是最后返回子树路径加当前节点作为新路径
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
let pathSum = function (root, sum) {
  if (!root) return []
  let need = sum - root.val
  if (!need && !root.left && !root.right) return [[root.val]]
  let paths = []
  for (let path of pathSum(root.left, need)) {
    paths.push([root.val, ...path])
  }
  for (let path of pathSum(root.right, need)) {
    paths.push([root.val, ...path])
  }
  return paths
}

module.exports = pathSum

module.exports.before = (levels, sum) => [TreeNode.gen(levels), sum]
