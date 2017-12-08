require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 层序遍历，取每一层最后一个
 * @param {TreeNode} root
 * @return {number[]}
 */
let rightSideView = function (root) {
  if (!root) return []
  let levels = [root]
  let rightSide = []
  while (levels.length) {
    rightSide.push(levels[levels.length - 1].val)
    let nextLevels = []
    for (let i = 0; i < levels.length; i++) {
      let node = levels[i]
      if (node.left) nextLevels.push(node.left)
      if (node.right) nextLevels.push(node.right)
    }
    levels = nextLevels
  }
  return rightSide
}

module.exports = rightSideView

module.exports.before = levels => [TreeNode.gen(levels)]

