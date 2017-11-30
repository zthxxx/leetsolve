require('../../libs/runDirect')
const RandomListNode = require('../../libs/RandomListNode')

/**
 * 复制复杂链表，基本思想是用三趟遍历
 * 第一趟在原来每个节点后插入一个值一样的节点
 * 第二趟复制原节点中的 random 指针
 * 即复制节点的 random 应该指向原节点的 random 的下一节点
 * 第三趟拆分还原原链表和复制链表
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
let copyRandomList = function (head) {
  if (!head) return null
  let p = head
  while (p) {
    let faker = new RandomListNode(p.label)
    faker.next = p.next
    p.next = faker
    p = p.next.next
  }

  p = head
  while (p) {
    let faker = p.next
    if (p.random) faker.random = p.random.next
    p = p.next.next
  }

  let copied = head.next
  p = head
  while (p) {
    let faker = p.next
    p.next = p.next.next
    p = p.next
    faker.next = p && p.next
  }

  return copied
}

module.exports = copyRandomList

module.exports.before = list => [RandomListNode.gen(list)]

module.exports.after = [result => result || [], result => [...result]]
