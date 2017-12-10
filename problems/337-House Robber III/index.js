require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

const max = Math.max

/**
 * 把二叉树倒过来看成多条链表
 * 由 #198 的 dp 可知，每一层只跟上一层或上上一层有关
 * 每次返回两个数保存上一层和上上一层的状态
 * 当前层的最大值可能是使用根节点但跳过下一层两个子树根节点值
 * 或跳过当前根节点值，只使用下一层两个子树根节点值
 * @param root
 * @return {[number, number]} - 当前层做贡献的最大值，当前层不做贡献的最大值
 */
function robDFS (root) {
  if (!root) return [0, 0]
  let [leftRoot, leftSkip] = robDFS(root.left)
  let [rightRoot, rightSkip] = robDFS(root.right)
  let rootSkip = leftRoot + rightRoot
  return [max(root.val + leftSkip + rightSkip, rootSkip), rootSkip]
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
let rob = function (root) {
  if (!root) return 0
  return robDFS(root)[0]
}

module.exports = rob

module.exports.before = levels => [TreeNode.gen(levels)]
