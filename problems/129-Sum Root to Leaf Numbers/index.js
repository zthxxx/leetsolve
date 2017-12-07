require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 返回所有到叶子的路径
 * @param {TreeNode} root
 * @return {Array<number>[]}
 */
function leafsPath (root) {
  if (!root) return []
  if (!root.left && !root.right) return [[root.val]]
  let lefts = leafsPath(root.left)
  let rights = leafsPath(root.right)
  let paths = [...lefts, ...rights]
  for (let path of paths) {
    path.push(root.val)
  }
  return paths
}

/**
 * 遍历一遍生成所有 root-to-leaf 路径
 * 每条路径算出数字
 * 最后相加
 * @param {TreeNode} root
 * @return {number}
 */
let sumNumbers = function (root) {
  let paths = leafsPath(root)
  let numbers = paths.map(path => path.reduce(
    (low, high, i) => low + high * Math.pow(10, i), 0)
  )
  return numbers.reduce((a, b) => a + b, 0)
}


/**
 * DFS 遍历求子树路径代表的数值和
 * 接受一个前缀数, 表示父节点到根节点表示的数的高位
 * 每次往下时，先计算下一项的前缀值，再分发给下一项
 * 保证子树能通过前缀值正确计算当前的和
 * 下一项的前缀数就是把当前的前缀末尾补上当前节点的值
 * @param {TreeNode} root
 * @param {number} prefix
 * @return {number}
 */
let sumNumbers_DFS = function (root, prefix = 0) {
  if (!root) return 0
  prefix = prefix * 10 + root.val
  if (!root.left && !root.right) return prefix
  return sumNumbers_DFS(root.left, prefix) + sumNumbers_DFS(root.right, prefix)
}



module.exports = [
  sumNumbers,
  sumNumbers_DFS
]

module.exports.beforeEach = levels => [TreeNode.gen(levels)]

