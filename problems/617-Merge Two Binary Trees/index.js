require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
let mergeTrees = function (t1, t2) {
  if (!t1 && !t2) return null
  if (!t1 ^ !t2) return t1 || t2
  let root = new TreeNode(t1.val + t2.val)
  root.left = mergeTrees(t1.left, t2.left)
  root.right = mergeTrees(t1.right, t2.right)
  return root
}

module.exports = mergeTrees

module.exports.before = (t1, t2) => [TreeNode.gen(t1), TreeNode.gen(t2)]

module.exports.after = [result => result || [], result => [...result]]
