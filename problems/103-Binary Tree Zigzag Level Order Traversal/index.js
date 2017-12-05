require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let zigzagLevelOrder = function (root) {
  if (!root) return []
  let levels = []
  let level = [root]
  let nextLevel = []
  let reverse = true
  while (level.length) {
    levels.push(level.map(item => item.val))
    while (level.length) {
      let node = reverse ? level.shift() : level.pop()
      if (node.left) reverse ? nextLevel.unshift(node.left) : nextLevel.push(node.left)
      if (node.right) reverse ? nextLevel.unshift(node.right) : nextLevel.push(node.right)
    }
    level = nextLevel
    nextLevel = []
    reverse = !reverse
  }
  return levels
}

module.exports = zigzagLevelOrder

module.exports.before = levels => [TreeNode.gen(levels)]

