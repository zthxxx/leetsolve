require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * 层序遍历 emmmmmm
 * 获取到上一层，然后插入分支就好
 * @param {TreeNode} root
 * @param {number} v
 * @param {number} d
 * @return {TreeNode}
 */
let addOneRow = function (root, v, d) {
  if (!root) return null
  if (d === 1) {
    let tree = new TreeNode(v)
    tree.left = root
    return tree
  }
  let depth = 0
  let level = [root]
  while (level.length) {
    depth += 1
    if (depth >= d - 1) break
    let nextLevel = []
    for (let node of level) {
      if (node.left) nextLevel.push(node.left)
      if (node.right) nextLevel.push(node.right)
    }
    level = nextLevel
  }
  for (let node of level) {
    let insertLeft = new TreeNode(v)
    insertLeft.left = node.left
    node.left = insertLeft
    let insertRight = new TreeNode(v)
    insertRight.right = node.right
    node.right = insertRight
  }
  return root
}

module.exports = addOneRow

module.exports.before = (levels, v, d) => [TreeNode.gen(levels), v, d]

module.exports.after = [result => result || [], result => [...result]]
