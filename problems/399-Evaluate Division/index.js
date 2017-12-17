require('../../libs/runDirect')

/**
 * 构建双向带权有向图
 * 不连通的节点就不再同一参考系，不能比较
 * 弧的方向 a -> b 中的 weight 表示 a / b = weight
 * 计算问题的值就是查找两个节点从除数到被除数的路径
 * 再把路径上的权重相乘
 * 这里要查找路径，应该选 dfs + stack 的方式
 * 因为题意说了不会有冲突，所以两节点间任意一条路径即可
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
let calcEquation = function (equations, values, queries) {
  let map = new Map()
  for (let [i, [num, den]] of equations.entries()) {
    // dividend / divisor = quotient
    if (!map.has(num)) map.set(num, new Map())
    if (!map.has(den)) map.set(den, new Map())
    let quotient = values[i]
    map.get(num).set(den, quotient)
    map.get(den).set(num, 1 / quotient)
  }

  function division (num, den) {
    if (!map.has(num) || !map.has(den)) return -1
    if (num === den) return map.has(num) ? 1 : -1
    let weights = []
    let set = new Set()
    let stack = [num]
    while (stack.length) {
      let from = stack[0]
      if (from === den) return weights.reduce((a, b) => a * b)
      let next = null
      for (let [node, val] of map.get(from)) {
        if (!set.has(node)) {
          stack.unshift(node)
          set.add(node)
          weights.unshift(val)
          next = node
          break
        }
      }
      if (next === null) {
        stack.shift()
        weights.shift()
      }
    }
    return -1
  }

  return queries.map(([num, den]) => division(num, den))
}

/**
 * 跟上面同样的图模型
 * 只是不用求路径了
 * 直接用 floyd 建立临接 hash 矩阵
 * 不过 floyd 是 O(n^3) time
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
let calcEquation_floyd = function (equations, values, queries) {
  let map = new Map()
  for (let [i, [num, den]] of equations.entries()) {
    if (!map.has(num)) map.set(num, new Map([[num, 1]]))
    if (!map.has(den)) map.set(den, new Map([[den, 1]]))
    let quotient = values[i]
    map.get(num).set(den, quotient)
    map.get(den).set(num, 1 / quotient)
  }
  for (let [k, quot] of map) {
    for (let i of quot.keys()) {
      for (let [j, val] of map.get(k)) {
        map.get(i).set(j, map.get(i).get(k) * val)
      }
    }
  }
  return queries.map(([num, den]) => {
    if (map.has(num) && map.has(den)) return map.get(num).get(den) || -1
    else return -1
  })
}

module.exports = [
  calcEquation,
  calcEquation_floyd
]
