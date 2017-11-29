require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 用 DFS 的方法，再递归过程中
 * 分别判断左右两支深度
 * 不平衡则设置标志位
 * 每个节点只遍历一次，因此时间复杂度 O(n)
 * @param {TreeNode} root
 * @return {boolean}
 */
let isBalanced = function (root) {
  let balance = true
  function depth (root) {
    if (!root) return 0
    let l = depth(root.left)
    let r = depth(root.right)
    if (Math.abs(l - r) > 1) balance = false
    return Math.max(l, r) + 1
  }
  depth(root)
  return balance
}

module.exports = isBalanced

module.exports.before = levels => [TreeNode.gen(levels)]
