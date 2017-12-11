require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 和 DFS 有一定差距
 * 依次判断当前值是否是符合值，子树值是否符合要求
 * 但对子树都会判断两遍
 * 从下一项左做开头，或者是接替上一项继续
 * 两次判断让效率变低，时间复杂度 O(n^2)
 * @param {TreeNode} root
 * @param {number} sum
 * @param {boolean} follow - 是否接着上一项
 * @return {number}
 */
let pathSum = function (root, sum, follow = false) {
  if (!root) return 0
  let count = 0
  count += root.val === sum
  count += pathSum(root.left, sum - root.val, true)
  count += pathSum(root.right, sum - root.val, true)
  if (!follow) {
    count += pathSum(root.left, sum)
    count += pathSum(root.right, sum)
  }
  return count
}

/**
 * 在前缀 map 中查找能得到指定值的共有多少路径
 * prefix map 中保存的是
 * <前缀累加值: 能达到该值的路径数>
 * 能达到该值的条件是 前缀累加值等于这个指定值
 * 前缀是从根节点加到当前节点的总和
 * 假设我们有一条路径
 * r -> a -> b -> c -> d -> e
 * 从跟节点 r 到当前节点的累加和为
 * R -> A -> B -> C -> D -> E
 * 如果有其中一段满足我们查找的需要，比如
 * 从 b 到 e，即 b + c + d + e = target
 * 显然可知 E - A = target，这里的 A 就应该理解为 b 的前缀值
 * 那么如果我们需要和为 target 的值，就知道了从 b 到 e 这条路径可以
 * 那么如果有多条路径本身累加能达到 A，就有同样的条数多一条的路径能达到 target
 * 显然 A = E - target，这里 E 就是指到当前点的累加值
 * 而从 a 搜索到 e 的过程中，我们已经逐步计算过能到达 A 的路径条数了
 * 直接从 prefix map 中获取就好
 * 遍历完这个节点的所有子树后，
 * 能走到这个累计值的路径显然就应该少一条了，
 * 所以遍历后应该删去一条能到达当前累加值的路径条数
 * @param {TreeNode} root
 * @param {number} follow - 当前节点的之前所有的累加值 (前缀值)
 * @param {number} target
 * @param {Map<number: number>} prefix
 * @return {number}
 */
function prefixFind (root, follow, target, prefix) {
  if (!root) return 0
  let total = follow + root.val
  let pretotal = total - target
  let count = prefix.has(pretotal) ? prefix.get(pretotal) : 0
  prefix.set(total, (prefix.get(total) || 0) + 1)
  count += prefixFind(root.left, total, target, prefix)
  count += prefixFind(root.right, total, target, prefix)
  prefix.set(total, prefix.get(total) - 1)
  return count
}

/**
 * 使用前缀数组，还是上面方法的思想
 * 但是用 hash map 空间换时间，
 * 抵消掉对两种情况的遍历判断
 * 时间复杂度 O(n)
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
let pathSum_prefix = function (root, sum) {
  if (!root) return 0
  let prefix = new Map()
  prefix.set(0, 1)
  return prefixFind(root, 0, sum, prefix)
}


module.exports = [
  pathSum,
  pathSum_prefix
]

module.exports.beforeEach = (levels, sum) => [TreeNode.gen(levels), sum]
