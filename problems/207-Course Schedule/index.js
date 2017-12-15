require('../../libs/runDirect')

/**
 * 查找图中入度为 0 的节点
 * @param {Map} graph - Map<node: [Set<inarc>, Set<outarc>]>
 * @return {number| null} node
 */
function findZeroIn (graph) {
  for (let [node, [inarc]] of graph.entries()) {
    if (inarc.size === 0) return node
  }
  return null
}

/**
 * 典型的拓扑排序
 * 拓扑排序也就是依次选择入度为 0 的节点输出，再删除它的出弧
 * 用 map 保存所有节点的入弧和出弧 [in, out]
 * [0, 1] means 1 -> 0
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
let canFinish_map = function (numCourses, prerequisites) {
  let graph = new Map()
  let order = []
  for (let node = 0; node < numCourses; node++) {
    graph.set(node, [new Set(), new Set()])
  }
  for (let [to, from] of prerequisites) {
    graph.get(to)[0].add(from)
    graph.get(from)[1].add(to)
  }
  let entry = findZeroIn(graph)
  while (graph.size) {
    if (entry === null) return false
    order.push(entry)
    let next = null
    let outarc = graph.get(entry)[1]
    for (let node of outarc) {
      let inarc = graph.get(node)[0]
      inarc.delete(entry)
      if (inarc.size === 0) next = node
    }
    graph.delete(entry)
    entry = next || findZeroIn(graph)
  }
  return order.length > 0
}


/**
 * 同样的思路做拓扑排序
 * 只是这里完全可以不用 map 结构，
 * （因为写明了节点值从 0 到 n - 1）
 * 更简洁更高效的写法
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
let canFinish = function (numCourses, prerequisites) {
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
    if (order.length >= numCourses) return true
    for (let to of outArc[node]) {
      if (--indegree[to] === 0) stack.push(to)
    }
  }
  return false
}


module.exports = [
  canFinish_map,
  canFinish
]
