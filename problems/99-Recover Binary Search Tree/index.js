require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')


/**
 * BST 的中序遍历应为有序
 * 即所有节点的前驱应该小于节点本身
 * 记录中序遍历每一趟递归的前驱
 * 如果前驱大于当前节点，则说明前驱和当前节点有误，
 * 但不能直接确定是哪一个，分两种情况
 * 有可能是前驱和当前均为错，这样遍历完后只需要交换两者
 * 这属于两个错误点挨着的情况，后面再遍历也没有错误了
 * 第二种可能是两个错误点没有挨着
 * 这样再继续遍历还能遇到两个大小有误的节点
 * 第二种情况的两组错误节点中，有两个前驱两个后继
 * 由于题意只有两个节点被错误的交换了
 * 在有序列中不相连的两个节点交换后
 * 如 1, 5, 3, 4, 2, 6 中
 * 两处逆序错误组 [5, 3] [4, 2]
 * 显然是第一组的第一个点和第二组的第二个点是交换点
 * 再遍历中，也就是第一次发现的前驱，和第二次发现的当前节点
 * 同样，遍历完后交换它们
 * 时间复杂度 O(n) 不考虑栈的空间复杂度 O(1)
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
let recoverTree = function (root) {
  if (!root) return
  let pre = null
  let mistakes = []

  function inorder (root) {
    if (!root) return
    inorder(root.left)
    if (pre && root.val <= pre.val) {
      if (!mistakes.length) mistakes = [pre, root]
      else mistakes[1] = root
    }
    pre = root
    inorder(root.right)
  }

  inorder(root)
  if (mistakes.length) {
    let [left, right] = mistakes;
    [left.val, right.val] = [right.val, left.val]
  }
}

module.exports = head => recoverTree(head) || head

module.exports.before = levels => [TreeNode.gen(levels)]

module.exports.after = [result => result || [], result => [...result]]
