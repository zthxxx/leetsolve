export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(
    val: number = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val
    this.left = left
    this.right = right
  }
}

/**
 * deserialize to binary tree from level-order values
 */
export const genTree = (levels: number[]): TreeNode | null => {
  if (!levels || !levels.length) return null
  const nodes: (TreeNode | null)[] = levels.map(val =>
    val !== null && new TreeNode(val) || null
  )
  for (let i = 0, j = 1; j < nodes.length; i++) {
    let node = nodes[i]
    if (node) {
      node.left = nodes[j]
      node.right = nodes[j + 1] || null
      j += 2
    }
  }
  return nodes[0]
}

export function *treeLevelOrder(node: TreeNode): Generator<number | null> {
  const queue: (TreeNode | null)[] = [node]
  while (queue.length) {
    let now = queue.shift()
    if (now) {
      yield now.val
      queue.push(now.left, now.right)
    } else {
      yield null
    }
  }
}


export const findTreeNode = (root: TreeNode, val: number): TreeNode | null => {
  let node = root
  if (!node) return null
  let stack: TreeNode[] = [node]
  while (stack.length) {
    node = stack.pop()!
    if (node.val === val) return node

    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }
  return null
}
