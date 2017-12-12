require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 层序遍历到最后一层再取最左边
 * @param {TreeNode} root
 * @return {number}
 */
let findBottomLeftValue = function (root) {
  let level = [root]
  while (level.length) {
    let nextLevel = []
    for (let node of level) {
      if (node.left) nextLevel.push(node.left)
      if (node.right) nextLevel.push(node.right)
    }
    if (!nextLevel.length) {
      return level[0].val
    }
    level = nextLevel
  }
}

module.exports = findBottomLeftValue

module.exports.before = levels => [TreeNode.gen(levels)]
