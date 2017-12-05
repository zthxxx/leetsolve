require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let levelOrderBottom = function (root) {
  if (!root) return []
  let levels = []
  let level = [root]
  let nextLevel = []
  while (level.length) {
    levels.unshift(level.map(item => item.val))
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

module.exports = levelOrderBottom

module.exports.before = levels => [TreeNode.gen(levels)]

