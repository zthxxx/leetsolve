require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 同时依次按层序遍历两个树
 * 依次判断同层同个位置是否相等
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
let isSameTree = function (p, q) {
  let queueP = [p]
  let queueQ = [q]
  while (queueP.length) {
    p = queueP.shift()
    q = queueQ.shift()
    if (!p ^ !q) return false
    if (p) {
      if (p.val !== q.val) return false
      if (!p.left ^ !q.left) return false
      if (p.left) {
        queueP.push(p.left)
        queueQ.push(q.left)
      }
      if (!p.right ^ !q.right) return false
      if (p.right) {
        queueP.push(p.right)
        queueQ.push(q.right)
      }
    }
  }
  return true
}


/**
 * 递归版更简洁
 * 先异或判断
 * 再判断值和左右子树
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
let isSameTree_recursive = function (p, q) {
  if (!p ^ !q) return false
  if (!p && !q) return true
  if (p.val !== q.val) return false
  return isSameTree_recursive(p.left, q.left) &&
    isSameTree_recursive(p.right, q.right)
}

module.exports = [
  isSameTree,
  isSameTree_recursive
]

module.exports.beforeEach = (...args) => args.map(level => TreeNode.gen(level))
