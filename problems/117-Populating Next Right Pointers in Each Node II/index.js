require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

class TreeLinkNode extends TreeNode {
  constructor (val) {
    super(val)
    this.next = null
  }

  static* levorder (node) {
    let queue = [node]
    let valids = 1
    while (queue.length && valids > 0) {
      let now = queue.shift()
      if (now) {
        yield [now.val, now.next && now.next.val]
        valids -= 1
        if (now.left) valids += 1
        if (now.right) valids += 1
        queue.push(now.left)
        queue.push(now.right)
      } else {
        yield null
      }
    }
  }
}


/**
 * 层序遍历
 * 用队列保存当前层和下一层
 * 遍历当前层时依次串联层节点
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
let connect_BFS = function (root) {
  if (!root) return
  let level = [root]
  while (level.length) {
    let nextLevel = []
    while (level.length) {
      let node = level.shift()
      node.next = level[0] || null
      if (node.left) nextLevel.push(node.left)
      if (node.right) nextLevel.push(node.right)
    }
    level = nextLevel
  }
}

/**
 * 用一个辅助节点，放在下一层的开头
 * 用一个指针在遍历当前层时，依次串联下一层的节点
 * 遍历当前层时，由于在上一层时已经串联好了当前层的节点
 * 所以只需要按照 next 指针依次走就是层序遍历了
 * 遍历完当前层走到尽头后，只需要通过辅助节点就跳转到下一层开头了
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
let connect = function (root) {
  while (root) {
    let head = new TreeLinkNode()
    let p = head
    while (root) {
      if (root.left) {
        p.next = root.left
        p = p.next
      }
      if (root.right) {
        p.next = root.right
        p = p.next
      }
      root = root.next
    }
    root = head.next
  }
}

module.exports = [
  head => connect_BFS(head) || head,
  head => connect(head) || head
]

module.exports.beforeEach = levels => [TreeLinkNode.gen(levels)]

module.exports.afterEach = [result => result || [], result => [...result]]
