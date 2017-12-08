require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * level order traversal
 * @param {TreeNode} node
 * @yield {number} val
 */
function* levorder (node) {
  if (!node) return
  let queue = [node]
  let valids = 1
  while (queue.length && valids > 0) {
    let now = queue.shift()
    if (now) {
      yield now.val
      valids += !!now.left + !!now.right - 1
      queue.push(now.left, now.right)
    } else {
      yield null
    }
  }
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
let serialize = function (root) {
  return JSON.stringify([...levorder(root)])
}


/**
 * deserialize a binary tree
 * @param {number[]} levels
 * @return {TreeNode} root
 */
function gen (levels) {
  if (!levels || !levels.length) return null
  let nodes = levels.map(val =>
    val !== null && new TreeNode(val) || null
  )
  for (let i = 0, j = 1; j < nodes.length; i++) {
    let node = nodes[i]
    if (node) {
      node.left = nodes[j++]
      node.right = nodes[j++] || null
    }
  }
  return nodes[0]
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
let deserialize = function (data) {
  return gen(JSON.parse(data))
}

module.exports = root => deserialize(serialize(root))

module.exports.before = levels => [TreeNode.gen(levels)]

module.exports.after = [result => result || [], result => [...result]]
