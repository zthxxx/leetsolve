require('../../libs/runDirect')

/**
 * 和上一道题 #207 一样的拓扑排序， 没有区别
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
let findOrder = function (numCourses, prerequisites) {
  let indegree = new Array(numCourses).fill(0)
  let outArc = new Array(numCourses).fill(0).map(() => [])
  for (let [to, from] of prerequisites) {
    indegree[to] += 1
    outArc[from].push(to)
  }
  let order = []
  let stack = indegree
    .map((i, index) => i > 0 && -1 || index)
    .filter(i => i >= 0)
  while (stack.length) {
    let node = stack.pop()
    order.push(node)
    if (order.length >= numCourses) return order
    for (let to of outArc[node]) {
      if (--indegree[to] === 0) stack.push(to)
    }
  }
  return []
}

module.exports = findOrder

module.exports.after = result => result.sort((a, b) => a - b)
