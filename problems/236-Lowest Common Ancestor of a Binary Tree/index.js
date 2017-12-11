require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * 查找从根到指定节点的路径
 * @param {TreeNode} root
 * @param {TreeNode} node
 * @return {TreeNode[]} path
 */
function findPath (root, node) {
  if (!root || !node) return []
  if (root === node) return [root]
  let left = findPath(root.left, node)
  let right = findPath(root.right, node)
  if (left.length) {
    return left.unshift(root) && left
  } else if (right.length) {
    return right.unshift(root) && right
  }
  return []
}

/**
 * 跟上一题 #236 不同
 * 不是 BST 的情况下不能直接判断左右查找
 * 但我们可以遍历两次，
 * 分别保存从根到两个节点的路径
 * 然后获取两条路径中最低的公共节点
 * 时间复杂度 O(n) 空间复杂度 O(log(n))
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let lowestCommonAncestor_path = function (root, p, q) {
  if (!root || !p || !q) return null
  let pathP = findPath(root, p)
  let pathQ = findPath(root, q)
  let i = 0
  while (pathP[i] === pathQ[i] && pathP[i]) {
    i += 1
  }
  return pathP[i - 1] || null
}

/**
 * DFS 递归的解法
 * 效率比起上面更高一点，不过也是 O(n)
 * 空间复杂度不算递归的栈的话，只有 O(1)
 * 写法比起上面更优美
 * 只有左右同时包含公共节点的情况下（包含自身）
 * 当前节点才是 LCA
 * 如果左右能找到任意一个指定节点
 * 那么就依次向上返回这个节点，
 * 使得顶层可以判断子树是否包含指定节点
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let lowestCommonAncestor = function (root, p, q) {
  if (!root) return null
  if (root === p || root === q) return root
  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)
  return left && right ? root : left || right
}


/**
 * 使用 Map 结构
 * 直接虚拟创造所有节点指向父节点的指针
 * 然后依次向上查找两节点的父节点
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let lowestCommonAncestor_map = function (root, p, q) {
  if (!root) return null
  let stack = [root]
  let parent = new Map()
  while (stack.length) {
    let node = stack.pop()
    if (node.left) {
      parent.set(node.left, node)
      stack.push(node.left)
    }
    if (node.right) {
      parent.set(node.right, node)
      stack.push(node.right)
    }
  }
  let ancestor = new Set()
  while (p) {
    ancestor.add(p)
    p = parent.get(p)
  }
  while (!ancestor.has(q) && q) {
    q = parent.get(q)
  }
  return q
}


module.exports = [
  lowestCommonAncestor_path,
  lowestCommonAncestor,
  lowestCommonAncestor_map
]

module.exports.beforeEach = (levels, p, q) => {
  let tree = TreeNode.gen(levels)

  function findNode (root, val) {
    if (!root) return null
    let stack = [root]
    while (stack.length) {
      root = stack.pop()
      if (root.val === val) return root
      if (root.left) stack.push(root.left)
      if (root.right) stack.push(root.right)
    }
    return null
  }

  p = findNode(tree, p)
  q = findNode(tree, q)
  return [tree, p, q]
}

module.exports.afterEach = [result => result || [], result => [...result]]
