/**
 * 本质还是树形图，没有区别
 * 思路和上一题 #684 基本一样，还是找环
 * 还是可以用剪叶子、并查集
 * u -> v [in, out]
 * 上一题用剪叶子只需要判断最后成环的情况
 * 这题还需要判断非成环，但是多个父节点的情况
 * 如果能找到还有一个顶点的入度大于 1
 * 那最后指向这个点的就一边定是要求的多余的边
 * （因为题意说了只有一条多余的边，
 * 所有最后这样的点最多也就只有一个，且入度只能是 2）
 * 找到这个点了，再找最后哪两个点指向它
 * 剪完叶子后
 * 指向它的两个顶点中肯定至少有一个点是有两条弧的
 * 因为没有父节点的顶点唯一的弧肯定不能是多余的，否则它就是孤立点了
 * 如果最后没有这样的点，也就是所有点的入度都为 1
 * 就说明最后成顺序一圈的环了，处理方式和上一题一样，
 * 就是倒序查找在环中的边，环中点只可能是出入度都为 1
 * 是叶子的条件为：出入度之和为 1
 * @param {number[][]} edges
 * @return {number[]}
 */
let findRedundantDirectedConnection = function (edges) {
  let graph = new Array(edges.length + 1).fill(0).map(() => [[], []])
  for (let [u, v] of edges) {
    graph[u][1].push(v)
    graph[v][0].push(u)
  }
  let degree = graph.map(([ins, outs]) => [ins.length, outs.length])
  let leaves = degree
    .map(([i, o], index) => i + o === 1 && index || -1)
    .filter(i => i > 0)

  let redun = null
  for (let [node, [i]] of degree.entries()) {
    if (i > 1) {
      redun = node
      break
    }
  }

  while (leaves.length) {
    let nexts = []
    for (let leaf of leaves) {
      degree[leaf][0] = degree[leaf][1] = 0
      for (let from of graph[leaf][0]) {
        if (--degree[from][1] + degree[from][0] === 1) nexts.push(from)
      }
      for (let to of graph[leaf][1]) {
        if (--degree[to][0] + degree[to][1] === 1) nexts.push(to)
      }
    }
    leaves = nexts
  }
  if (redun) {
    for (let [u, v] of edges.reverse()) {
      if (v === redun && degree[u][0] + degree[u][1] > 1) return [u, v]
    }
  } else {
    let cycle = new Set(degree.map(([i, o], index) => i + o > 0 && index || -1).filter(i => i > 0))
    for (let [u, v] of edges.reverse()) {
      if (cycle.has(u) && cycle.has(v)) return [u, v]
    }
  }
}

/**
 * 上面思维的简化逻辑
 * 这题其实比上一题的情况还明确
 * 只可能有两种情况
 * 两顶点指向同一顶点 或 顺序成环
 * 对第一种情况，先找有两个入度的点，（称为重入点）
 * 如果有的话，先找到它的两个父顶点
 * 如果重入点也指向它的一个父顶点，那么这么父顶点就是所求
 * 否则的话只需要找最后一个离了重入点不会孤立的点
 * 图中没有重入点的话，就一定是顺序成环的情况
 * 这就更简单了，第一条连通两个环内节点的弧一定是成环的弧
 * 无向图成环的充要条件是：边数 >= 顶点数
 * 这里是有向图，但是题意可知有且只有一个环，所以上面公式也可以满足
 * 顺序成环弧数 >= 顶点数
 * @param {number[][]} edges
 * @return {number[]}
 */
let findRedundantDirectedConnection_II = function (edges) {
  let graph = new Array(edges.length + 1).fill(0).map(() => [[], []])
  for (let [u, v] of edges) {
    graph[u][1].push(v)
    graph[v][0].push(u)
  }
  let degree = graph.map(([ins, outs]) => [ins.length, outs.length])

  let redun = null
  for (let [node, [indeg]] of degree.entries()) {
    if (indeg > 1) {
      redun = node
      break
    }
  }
  if (redun) {
    let [[u, v], [out]] = graph[redun]
    if (out === u || out === v) return [out, redun]
    if (degree[v][0] + degree[v][1] > 1) return [v, redun]
    else return [u, redun]
  }

  let set = new Set()
  for (let [i, [u, v]] of edges.entries()) {
    set.add(u).add(v)
    if (i + 1 >= set.size) return [u, v]
  }
}

module.exports = [
  findRedundantDirectedConnection_II,
  findRedundantDirectedConnection
]

require('../../libs/runDirect')
