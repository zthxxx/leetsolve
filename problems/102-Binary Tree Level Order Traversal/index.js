require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 层序遍历输出，已经用过很多次了
 * 完全类似于#101
 * @param {TreeNode} root
 * @return {number[][]}
 */
let levelOrder = function (root) {
  if (!root) return []
  let levels = []
  let level = [root]
  let nextLevel = []
  while (level.length) {
    levels.push(level.map(item => item.val))
    while (level.length) {
      let node = level.shift()
      if (node.left) nextLevel.push(node.left)
      if (node.right) nextLevel.push(node.right)
    }
    level = nextLevel
    nextLevel = []
  }
  return levels
}

module.exports = levelOrder

module.exports.before = levels => [TreeNode.gen(levels)]

