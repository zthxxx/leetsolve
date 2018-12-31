require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * @param {TreeNode} t
 * @return {string}
 */
let tree2str = function (t) {
  if (!t) return ''
  let left = tree2str(t.left)
  let right = tree2str(t.right)
  left = left ? '(' + left + ')' : right ? '()' : ''
  right = right ? '(' + right + ')' : ''
  let result = [t.val, left, right]
  return result.join('')
}

module.exports = tree2str

module.exports.before = levels => [TreeNode.gen(levels)]
