require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 暴力保存所有子树可能的情况再对比
 * 把子树用字符串保存作为 map 的键 (string hash)
 * 需要空间很大 O(n^2) space，但是只有 O(n) time
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
let findDuplicateSubtrees = function (root) {
  let trees = new Map()
  function getid (root) {
    if (!root) return
    let id = [root.val, getid(root.left), getid(root.right)].join()
    if (!trees.has(id)) trees.set(id, [])
    trees.get(id).push(root)
    return id
  }
  getid(root)
  let result = []
  for (let roots of trees.values()) {
    if (roots.length > 1) result.push(roots[0])
  }
  return result
}

module.exports = findDuplicateSubtrees

module.exports.before = levels => [TreeNode.gen(levels)]
