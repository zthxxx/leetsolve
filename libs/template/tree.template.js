require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
let solution = function (root) {
  if (!root) return null
  return root
}

module.exports = solution

module.exports.before = levels => [TreeNode.gen(levels)]

module.exports.after = [result => result || [], result => [...result]]
