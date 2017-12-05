require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * 先获取链表长度
 * 然后计算一下均分后每段的长度
 * 不能整除均分的话，余数往前面每段 +1
 * 有了每段长度，接下来挨着遍历着切一遍
 * @param {ListNode} root
 * @param {number} k
 * @return {ListNode[]}
 */
let splitListToParts = function (root, k) {
  let total = 0
  let p = root
  while (p) {
    total += 1
    p = p.next
  }
  let lens = new Array(k).fill(~~(total / k))
  let residue = total % k
  for (let i = 0; i < residue; i++) {
    lens[i] += 1
  }
  p = root
  let splits = []
  for (let len of lens) {
    splits.push(p)
    while (--len > 0) {
      p = p.next
    }
    if (p) {
      let next = p.next
      p.next = null
      p = next
    }
  }
  return splits
}

module.exports = splitListToParts

module.exports.before = (list, k) => [ListNode.gen(list), k]

module.exports.after = result => result.map(list => list && [...list] || [])
