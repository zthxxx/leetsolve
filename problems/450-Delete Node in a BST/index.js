require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 删除 BST 的根节点
 * 1. 如果当前节点为叶子节点，删除后什么都不剩
 * 2. 如果当前根只有一棵子树，删除根后就拼接上那棵子树
 * 3. 如果左右子树都存在的话，就用当前节点的中序后继替代根节点
 *    BST 中，根的后继一定是右子树最左侧的那个节点
 *    (如果用前驱来代替的话，前驱就是左子树最右)
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function deleteRoot (root) {
  if (!root.left && !root.right) return null
  if (!root.left ^ !root.right) return root.left || root.right
  let nextParent = root.right
  while (nextParent.left && nextParent.left.left) {
    nextParent = nextParent.left
  }
  let next = nextParent.left
  if (!next) {
    next = nextParent
  } else {
    nextParent.left = next.right
    next.right = root.right
  }
  next.left = root.left
  return next
}

/**
 * 删除指定的子树根节点，
 * 如果发现左右子树根节点为 key 就删除其根节点
 * 仅限对子树删除，这样避免每次递归判断根节点
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
function deleteChild (root, key) {
  if (!root) return null
  let { val, left, right } = root
  if (left && left.val === key) root.left = deleteRoot(left)
  else if (right && right.val === key) root.right = deleteRoot(right)
  else if (key < val) deleteChild(left, key)
  else deleteChild(right, key)
  return root
}

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
let deleteNode = function (root, key) {
  if (!root) return null
  if (root.val === key) return deleteRoot(root)
  else deleteChild(root, key)
  return root
}

module.exports = deleteNode

module.exports.before = (levels, key) => [TreeNode.gen(levels), key]

module.exports.after = [result => result || [], result => [...result]]
