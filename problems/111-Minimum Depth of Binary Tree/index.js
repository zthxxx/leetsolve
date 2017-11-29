require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * @param {TreeNode} root
 * @param {number} depth
 * @return {number}
 */
let minDepth = function (root, depth = 0) {
  if (!root) return 0
  if (root.left && root.right) {
    let l = minDepth(root.left, depth + 1)
    let r = minDepth(root.right, depth + 1)
    return Math.min(l, r)
  }
  if (root.left) return minDepth(root.left, depth + 1)
  if (root.right) return minDepth(root.right, depth + 1)
  return depth + 1
}

module.exports = minDepth

module.exports.before = levels => [TreeNode.gen(levels)]
