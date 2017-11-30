require('../../libs/runDirect')

/**
 * [0] = 1
 * [1] = 1
 * [2] = ([0] x [1]) x 2 = 2
 * [3] = ([0] x [2]) x 2 + [1] x [1] = 5
 * [4] = ([0] x [3] + [1] x [2]) x 2 = 14
 * [5] = ([0] x [4] + [1] x [3]) x 2 + [2] x [2] = 42
 * [6] = ([0] x [5] + [1] x [4] + [2] x [3]) x 2 = 132
 * 一颗树的可能情况等于这颗树左右可能情况的乘积
 * 一棵树的左子树节点数可能情况从 0 ~ n - 1
 * 同理右侧也一样
 * @param {number} n
 * @return {number}
 */
let numTrees = function (n) {
  let counts = [1, 1]
  function multiCount (n) {
    if (n === 0 || n === 1) return 1
    multiCount(n - 1)
    let total = 0
    for (let i = 0; i < n; i++) {
      total += counts[i] * counts[n - 1 - i]
    }
    counts.push(total)
    return total
  }
  return multiCount(n)
}

module.exports = numTrees
