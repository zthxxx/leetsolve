require('../../libs/runDirect')
const ListNode = require('../../libs/ListNode')


/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let solution = function (head) {
  if (!head) return null
  return head
}

module.exports = solution

module.exports.before = list => [ListNode.gen(list)]

module.exports.after = [result => result || [], result => [...result]]
