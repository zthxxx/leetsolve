require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 比较两棵树是否相同
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
function sameTree (s, t) {
  if (!s && !t) return true
  if (!s ^ !t) return false
  if (s.val !== t.val) return false
  return sameTree(s.left, t.left) &&
    sameTree(s.right, t.right)
}

/**
 * 类似于 #100
 * 寻找相似的树，也有点类似于 KMP 查找字符串
 * 如果从上到下依次查询子树的话，效率很低，是 O(n^2 * m)
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
let isSubtree = function (s, t) {
  if (!s) return false
  return sameTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t)
}


/**
 * 稍微优化一下, 只获取 s 中和 t 有相同高度的子树
 * 然后只判断他们，不再递归判断其子树
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
let isSubtree_depth = function (s, t) {
  function getDepth (root, handle = null) {
    if (!root) return 0
    let depth = Math.max(
      getDepth(root.left, handle),
      getDepth(root.right, handle)
    ) + 1
    if (handle) handle(root, depth)
    return depth
  }

  let depthT = getDepth(t)
  let subtrees = []

  getDepth(s, (root, depth) => {
    if (depth === depthT) subtrees.push(root)
  })

  for (let tree of subtrees) {
    if (sameTree(tree, t)) return true
  }

  return false
}


module.exports = [
  isSubtree,
  isSubtree_depth
]

module.exports.beforeEach = (s, t) => [TreeNode.gen(s), TreeNode.gen(t)]
