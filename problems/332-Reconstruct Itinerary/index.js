require('../../libs/runDirect')

const ENTRY = 'JFK'

/**
 * 等价于一笔走过所有路径
 * 不太准确，因为路径可以因为机票重复而重复
 * 换个说法应该是一次性用完所有连续的机票
 * 也就是有向图的遍历
 * 因为要保证是连续，显然应该是用 dfs 而不是 bfs
 * dfs 的下一步应该是权重最小的 (字符顺序)，不重复的路径
 * 没有下一步的时候回溯上一个点
 * 不重复的条件是到下一节点的路径还有剩余次数
 * 完成的条件是走完了所有的路径得到了节点顺序
 * 把节点想象成独立的，通过路径顺序连通
 * 显然最终节点数应该是路径数 + 1
 * 而 js 中的 map 和 set 遍历顺序都是插入顺序 (有序字典)
 * 就很方便我们 dfs 的时候按权重 (字符) 来遍历
 * 先用 map 保存这个有向图
 * 记录每个可经过的节点到节点的剩余次数
 * 然后 dfs 有条件的遍历
 * @param {string[][]} tickets
 * @return {string[]}
 */
let findItinerary = function (tickets) {
  tickets.sort()
  let len = tickets.length
  let arcs = new Map()
  for (let [from, to] of tickets) {
    if (!arcs.has(from)) arcs.set(from, new Map())
    let times = arcs.get(from).get(to) || 0
    arcs.get(from).set(to, times + 1)
  }

  function dfs (entry, path) {
    if (path.length === len + 1) return path
    if (!arcs.has(entry)) return null
    for (let [to, times] of arcs.get(entry)) {
      if (times > 0) {
        path.push(to)
        arcs.get(entry).set(to, times - 1)
        if (dfs(to, path)) return path
        path.pop()
        arcs.get(entry).set(to, times)
      }
    }
    return null
  }

  return dfs(ENTRY, [ENTRY])
}


/**
 * 换一个思路，只要有到下一站的票就一直飞
 * 如果到某个点票用完了不能飞了，那这个点一定是最后一个点
 * 而它的前一个点一定是倒数第二个点
 * 即每次将最后的点输出掉，栈顶就是新的最后一个点
 * （如果这个点还能走其他分支，那最后一定还会回到这个点）
 * J --> D ==> E --> A
 *       ↖  ↙
 *         B
 * 入度大于出度的点一定是终点
 * 如果所有的点出入度都平衡，那么 JFK 就一定是终点
 * @param {string[][]} tickets
 * @return {string[]}
 */
let findItinerary_stack = function (tickets) {
  tickets.sort()
  let arcs = new Map()
  for (let [from, to] of tickets) {
    if (!arcs.has(from)) arcs.set(from, [])
    if (!arcs.has(to)) arcs.set(to, [])
    arcs.get(from).push(to)
  }
  let path = []
  let stack = [ENTRY]

  while (stack.length) {
    let from = stack[0]
    while (arcs.get(from).length) {
      let to = arcs.get(from).shift()
      stack.unshift(to)
      from = to
    }
    path.unshift(stack.shift())
  }

  return path
}


module.exports = [
  findItinerary,
  findItinerary_stack
]

