require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 对每行操作的当然是用层序遍历了
 * @param {TreeNode} root
 * @return {number[]}
 */
let largestValues = function (root) {
  if (!root) return []
  let largest = []
  let level = [root]
  while (level.length) {
    let nextLevel = []
    let max = -Infinity
    for (let node of level) {
      if (node.val > max) max = node.val
      if (node.left) nextLevel.push(node.left)
      if (node.right) nextLevel.push(node.right)
    }
    largest.push(max)
    level = nextLevel
  }
  return largest
}

module.exports = largestValues

module.exports.before = levels => [TreeNode.gen(levels)]
