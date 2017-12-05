require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 根据中序遍历的左子树分割前序遍历的左右部分
 * @param {number[]} preorder
 * @param {number[]} inleft
 * @return {[number[], number[]]} - 前序遍历的左右子树部分
 */
function splitPreorder (preorder, inleft) {
  let right = preorder.splice(inleft.length)
  let left = preorder
  return [left, right]
}

/**
 * 根据根节点值分割中序遍历左右部分
 * @param {number[]} inorder
 * @param {number} val - 根节点的值
 * @return {[number[], number[]]} - 中序遍历的左右子树部分
 */
function splitInorder (inorder, val) {
  let index = inorder.indexOf(val)
  let right = inorder.splice(index)
  let left = inorder
  right.shift()
  return [left, right]
}

/**
 * 前序遍历中的第一个值一定是根节点的值
 * 找到根节点的值在中序遍历中的位置
 * 根据中序遍历定义，这个值左边就整个左子树的中序遍历，右边同理
 * 一棵树不管怎么遍历，节点数都相同
 * 所以根据中序遍历中划分的左子树节点
 * 划分前序遍历中的左子树部分和右子树部分
 * 这样我们就分别有了左子树和右子树的前序及中序遍历
 * 然后依次递归即可
 * 时间复杂度 O(n)
 * 空间复杂度，如果可以改变原数组直接划分，就是 O(1)
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
let buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null
  let root = new TreeNode(preorder.shift())
  let [inleft, inright] = splitInorder(inorder, root.val)
  let [preleft, preright] = splitPreorder(preorder, inleft)
  root.left = buildTree(preleft, inleft)
  root.right = buildTree(preright, inright)
  return root
}

module.exports = buildTree

module.exports.after = [result => result || [], result => [...result]]
