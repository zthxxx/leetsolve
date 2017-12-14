require('../../libs/runDirect')
const { UndirectedGraphNode } = require('../../libs/GraphNode')


/**
 * 两次 bfs 遍历
 * 第一遍的时候，建立创建所有节点，并保存关联他们连接点的标签
 * 第二次遍历的时候，串联所有的 neighbors
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
let cloneGraph_2bfs = function (graph) {
  if (!graph) return null
  let nodeMap = new Map()
  let edgeMap = new Map()
  let set = new Set()
  let queue = [graph]
  while (queue.length) {
    let node = queue.shift()
    if (!set.has(node)) {
      set.add(node)
      let edges = node.neighbors.map(v => {
        if (!set.has(v)) queue.push(v)
        return v.label
      })
      nodeMap.set(node.label, new UndirectedGraphNode(node.label))
      edgeMap.set(node.label, edges)
    }
  }
  for (let [label, edges] of edgeMap.entries()) {
    let node = nodeMap.get(label)
    node.neighbors = edges.map(edge => nodeMap.get(edge))
  }
  return nodeMap.get(graph.label)
}

/**
 * 只用一遍 bfs 遍历的写法
 * 思想和上面一样，只是换种写法，
 * 虽然都是 O(n) time 但是这种写法更简洁更高效
 * map 中保存原图节点到新节点的关系
 * 遍历的时候只遍历一遍图，没有节点就创建新节点
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
let cloneGraph = function (graph) {
  if (!graph) return null
  let entry = new UndirectedGraphNode(graph.label)
  let map = new Map([[graph, entry]])
  let visited = new Set([graph])
  let queue = [graph]
  while (queue.length) {
    let node = queue.shift()
    for (let edge of node.neighbors) {
      if (!visited.has(edge)) {
        queue.push(edge)
        visited.add(edge)
      }
      if (!map.has(edge)) {
        map.set(edge, new UndirectedGraphNode(edge.label))
      }
      map.get(node).neighbors.push(map.get(edge))

    }
  }
  return entry
}

module.exports = [
  cloneGraph_2bfs,
  cloneGraph
]

module.exports.beforeEach = serial => [UndirectedGraphNode.gen(serial)]

module.exports.afterEach = result => result && result.serial() || '{}'
