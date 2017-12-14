/**
 * Definition for undirected graph.
 * function UndirectedGraphNode(label) {
 *     this.label = label;
 *     this.neighbors = [];   // Array of UndirectedGraphNode
 * }
 */

class UndirectedGraphNode {
  constructor (label) {
    this.label = label
    /**
     * list of its neighbors
     * @type {UndirectedGraphNode[]}
     */
    this.neighbors = []
  }

  /**
   * generate graph from serialized
   * @param {string} serial - '{node,neighbors#node,neighbors#}'
   * use # as a separator for each node,
   * and , as a separator for node label and each neighbor of the node
   * @return {UndirectedGraphNode} graph
   */
  static gen (serial) {
    if (serial.length < 3) return null
    if (!/^\{.*\}$/.test(serial)) return null
    let map = new Map()
    let nodes = serial.match(/^\{(.*)\}$/)[1]
      .split('#')
      .map(s => s.split(','))
      .map(([label, ...neighbors]) => {
        let node = new this(label)
        map.set(label, node)
        return [node, neighbors]
      })
      .map(([node, edges]) => {
        node.neighbors = edges.map(label => map.get(label))
        return node
      })
    return nodes[0]
  }

  /**
   * visit graph order by bfs
   * @param {UndirectedGraphNode} graph
   * @yield {string[]} - node, neighbors
   */
  static* bfs (graph) {
    let set = new Set([graph])
    let queue = [graph]
    while (queue.length) {
      let node = queue.shift()
      let edges = node.neighbors.map(v => {
        if (!set.has(v)) {
          queue.push(v)
          set.add(v)
        }
        return v.label
      })
      yield [node.label, ...edges]
    }
  }

  /**
   * serialize a graph as a serialized string which to generate
   * @param {UndirectedGraphNode} graph
   * @param {function} visit
   * @return {string} serialized
   */
  static serial (graph, visit = this.bfs) {
    let serial = [...visit(graph)]
      .map(edges => edges.join(','))
      .join('#')
    return ['{', serial, '}'].join('')
  }

  serial () {
    let visit = this.constructor.bfs
    return this.constructor.serial(this, visit)
  }
}

module.exports = {
  UndirectedGraphNode
}
