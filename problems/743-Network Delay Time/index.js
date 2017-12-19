/**
 * 从一个点出发遍历，
 * 能否遍历所有的点
 * 能遍历的情况下求最大权重距离
 * 显然可以用 Dijkstra 或 floyd
 * floyd 矩阵 m 中
 * [i,j] = min([i,j], [i,k] + [k,j])
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
let networkDelayTime = function (times, N, K) {
  if (N === 1) return 0
  let map = new Map()
  for (let [u, v, w] of times) {
    if (!map.has(u)) map.set(u, new Map([[u, 0]]))
    map.get(u).set(v, w)
  }
  for (let [k, distK] of map) {
    for (let [, distI] of map) {
      if (!distI.has(k)) continue
      for (let [j, ktoj] of distK) {
        let itoj = distI.has(j) ? distI.get(j) : Infinity
        let itok = distI.get(k)
        distI.set(j, Math.min(itoj, itok + ktoj))
      }
    }
  }
  let delays = map.get(K)
  if (!delays || delays.size < N) return -1
  return Math.max(...delays.values())
}


/**
 * floyd 的数组写法
 * 虽然上面 map 的写法时间复杂度更低
 * 但实际测试中，似乎数组写法反而更高效点
 * （可能是 map 中添加元素效率太低）
 * leetcode 51 test case 情况下
 *   map 写法: 962 ms
 * array 写法: 158 ms
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
let networkDelayTime_array = function (times, N, K) {
  let dist = new Array(N + 1).fill(0).map(() => new Array(N + 1).fill(Infinity))
  for (let i = 0; i < dist.length; i++) {
    dist[i][i] = 0
  }
  for (let [u, v, w] of times) {
    dist[u][v] = w
  }
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }
  dist[K].shift()
  let delay = Math.max(...dist[K])
  return delay < Infinity ? delay : -1
}


/**
 * dfs 的写法
 * floyd 会计算所有的点到点的距离
 * 而本题其实只需要从给定的入口顺序遍历一遍所有节点
 * 所以 dfs 显然会高效很多，毕竟只有 O(n) time
 * 这里就按照题意把传递看成信号
 * 每到一个新节点，信号就会广播一次
 * 如果后面还有信号再到这个节点，不再广播
 * 也就是只广播第一次到这个点的信号
 * 于是我们可以用记录每个节点接收到信号的延迟时间
 * 然后通过 dfs 模拟这个广播过程（注意递归爆栈）
 * 广播过程中更新记录的延迟时间
 * 最后如果哪个节点的时间没有更新过，也就说明它不可到达
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
let networkDelayTime_dfs = function (times, N, K) {
  let graph = new Map()
  for (let [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, [])
    graph.get(u).push([v, w])
  }
  let delays = new Map(new Array(N).fill(0).map((v, i) => [i + 1, Infinity]))

  function broadcast (node, time) {
    if (time > delays.get(node)) return
    delays.set(node, time)
    if (!graph.has(node)) return
    graph.get(node).map(([v, w]) => broadcast(v, time + w))
  }

  broadcast(K, 0)
  let delay = Math.max(...delays.values())
  return delay < Infinity ? delay : -1
}


/**
 * Dijkstra 的写法
 * 写法上只有中间过程和 dfs 的广播不同
 * 比 dfs 多了一个每次遍历找可达到点的过程
 * 所以是 O(n^2) time
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
let networkDelayTime_Dijkstra = function (times, N, K) {
  let graph = new Map()
  for (let [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, [])
    graph.get(u).push([v, w])
  }
  let dist = new Map(new Array(N).fill(0).map((v, i) => [i + 1, Infinity]))
  dist.set(K, 0)

  let seen = new Array(N + 1).fill(false)
  while (true) {
    let node = 0
    let delay = Infinity
    for (let i = 1; i <= N; i++) {
      if (!seen[i] && dist.get(i) < delay) {
        delay = dist.get(i)
        node = i
      }
    }
    seen[node] = true
    if (node < 1) break
    if (!graph.has(node)) continue
    for (let [v, w] of graph.get(node)) {
      if (dist.get(node) + w < dist.get(v)) {
        dist.set(v, dist.get(node) + w)
      }
    }
  }

  let delay = Math.max(...dist.values())
  return delay < Infinity ? delay : -1
}


module.exports = [
  networkDelayTime,
  networkDelayTime_array,
  networkDelayTime_dfs,
  networkDelayTime_Dijkstra
]

require('../../libs/runDirect')

