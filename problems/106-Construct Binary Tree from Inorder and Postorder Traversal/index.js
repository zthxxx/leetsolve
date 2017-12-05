require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 根据中序遍历的左子树分割后序遍历的左右部分
 * @param {number[]} postorder
 * @param {number[]} inleft
 * @return {[number[], number[]]} - 前序遍历的左右子树部分
 */
function splitPostorder (postorder, inleft) {
  let right = postorder.splice(inleft.length)
  let left = postorder
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
 * 与上一题 #105 几乎没有区别
 * 唯一一点不同只有后序遍历的根节点值是最后一个值
 * 其余划分方式完全一样，没有任何不同
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
let buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) return null
  let root = new TreeNode(postorder.pop())
  let [inleft, inright] = splitInorder(inorder, root.val)
  let [postleft, postright] = splitPostorder(postorder, inleft)
  root.left = buildTree(inleft, postleft)
  root.right = buildTree(inright, postright)
  return root
}

module.exports = buildTree

module.exports.after = [result => result || [], result => [...result]]
