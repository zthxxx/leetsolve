require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 由于是 BST
 * 所以从上到下查找的时候
 * 最低公共祖先一定是
 * 第一个值在两个节点值范围之中的节点
 * （因为显然左子树一定会小于右子树）
 * 即 v <= LCA <= w   (v <= w)
 * 所以查找的时候
 * 如果当前节点值大于 w，LCA 就一定在左子树
 * 如果当前节点值小于 v，LCA 就一定在右子树
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let lowestCommonAncestor = function (root, p, q) {
  if (!root || !p || !q) return null
  if (p.val > q.val) return lowestCommonAncestor(root, q, p)
  if (root.val < p.val) return lowestCommonAncestor(root.right, p, q)
  if (root.val > q.val) return lowestCommonAncestor(root.left, p, q)
  return root
}

module.exports = lowestCommonAncestor

module.exports.before = (levels, p, q) => {
  let tree = TreeNode.gen(levels)
  function findNode (root, val) {
    if (!root) return null
    let stack = [root]
    while (stack.length) {
      root = stack.pop()
      if (root.val === val) return root
      if (root.left) stack.push(root.left)
      if (root.right) stack.push(root.right)
    }
    return null
  }
  p = findNode(tree, p)
  q = findNode(tree, q)
  return [tree, p, q]
}

module.exports.after = [result => result || [], result => [...result]]
