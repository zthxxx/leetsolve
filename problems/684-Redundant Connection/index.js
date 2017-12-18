/**
 * 朴素思想，如果用拓扑排序，
 * 剩下的成环的边中，返回最后一个
 * 或者顺着叶子删，叶子的条件是度只有 1
 * 删到没有叶子，剩下的就是成环的，于是返回最后一条边
 * 因为是无向图，所以更适合后一种方法
 * @param {number[][]} edges
 * @return {number[]}
 */
let findRedundantConnection = function (edges) {
  let graph = new Array(edges.length + 1).fill(0).map(() => [])
  for (let [u, v] of edges) {
    graph[u].push(v)
    graph[v].push(u)
  }
  let degree = graph.map(edges => edges.length)
  let leaves = degree.map((d, i) => d === 1 && i || -1).filter(i => i > 0)
  while (leaves.length) {
    let nexts = []
    for (let leaf of leaves) {
      for (let to of graph[leaf]) {
        if (--degree[to] === 1) nexts.push(to)
      }
    }
    leaves = nexts
  }
  let cycle = new Set(degree.map((d, i) => d > 1 && i || -1).filter(i => i > 0))
  for (let [u, v] of edges.reverse()) {
    if (cycle.has(u) && cycle.has(v)) return [u, v]
  }
}


/**
 * 简单的想法，直接构建图，
 * 那么第一个造成闭环的边一定是出现在最后的
 * 成环的冲要条件是：当前图中 边数 => 顶点数
 * 但是在构建中，可能是产生多个不连通的图，
 * 也就不适用与这种统计判断成环
 * 为了获取顶点连通性，典型的适用于 union find 并查集写法
 * 由于并查每次都要遍历整个节点集，
 * 所有是 O(n^2) time
 * @param {number[][]} edges
 * @return {number[]}
 */
let findRedundantConnection_unionFind = function (edges) {
  let union = new Array(edges.length + 1).fill(0).map((v, i) => i)
  for (let [u, v] of edges) {
    if (union[u] === union[v]) return [u, v]
    let connect = union[u]
    for (let [i, val] of union.entries()) {
      if (val === connect) union[i] = union[v]
    }
  }
}



/**
 * 用 set 改进 union find 写法
 * 并查集的时间复杂度主要来源是每次都要遍历一遍顶点数组
 * 而且占的空间也是 O(n) space
 * 同样的 O(n) space 改用 set 判断节点连通性
 * 本质思路和 union find 一样，都是判断节点是否连通
 * 只是数组写法通过改写值来实现连通
 * 这里只要在同一个 set 中就表示连通
 * 大大的降低了时间复杂度
 * @param {number[][]} edges
 * @return {number[]}
 */
let findRedundantConnection_unionSet = function (edges) {
  let union = new Set()
  for (let [u, v] of edges) {
    let GraphU = null
    let GraphV = null
    for (let graph of union) {
      if (graph.has(u)) GraphU = graph
      if (graph.has(v)) GraphV = graph
    }

    if (!GraphU && !GraphV) union.add(new Set([u, v]))
    else if (GraphU === GraphV) return [u, v]
    if (!GraphU ^ !GraphV) (GraphU || GraphV).add(u).add(v)
    if (GraphU && GraphV) {
      [GraphU, GraphV] = [GraphU, GraphV].sort((u, v) => u.size - v.size)
      union.delete(GraphU)
      GraphU.forEach(u => GraphV.add(u))
    }
  }
}

module.exports = [
  findRedundantConnection_unionFind,
  findRedundantConnection_unionSet,
  findRedundantConnection
]

require('../../libs/runDirect')

