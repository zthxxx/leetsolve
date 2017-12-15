require('../../libs/runDirect')

/**
 * 显然最小高度就是最长路径的一半
 * 因为选择其他节点都会免不了超过最长路径的一半
 * 所以本质也就是找到最长路径，也就是求树的直径
 * 可以选择的 root 自然也就是直径的中间节点（偶数的话就有两个）
 * 因为写明了节点值从 0 到 n - 1，
 * 所以可以用数组保存图，可以不用 map
 * 因为是无向图，所以每个节点都要保存所有连通节点
 * 找直径需要至少 2 次 bfs 遍历
 * 第一次从入口 bfs 找最远的点，这个点一定是直径的端点
 * （想象一个椭圆，离任意一点最远的过中心点一定是个直径上的顶点）
 * 第二次从这个端点 bfs 找到最远点，也就是这条直径另一个端点
 * （这一次可以通过保存访问路径得到直径节点）
 * 如果没有保存路径的话，可以用 dfs 获取直径路径 （这样就是第三次遍历了）
 * 因为树形图两点只有一条路径
 * 同样因为是树形图，bfs / dfs 的写法可以简化很多
 * 最后直径取中间点
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
let findMinHeightTrees = function (n, edges) {
  let links = new Array(n).fill(0).map(() => [])
  for (let [from, to] of edges) {
    links[from].push(to)
    links[to].push(from)
  }

  function findLongest (entry) {
    let set = new Set([entry])
    let queue = [entry]
    while (queue.length) {
      let node = queue.shift()
      for (let v of links[node]) {
        if (!set.has(v)) {
          queue.push(v)
          set.add(v)
        }
      }
      if (!queue.length) return node
    }
  }

  let top = findLongest(0)
  let end = findLongest(top)

  function findDiameter (top, end) {
    let path = [top]
    let set = new Set([top])
    while (path.length) {
      let node = path[0]
      if (node === end) break
      let next = null
      for (let v of links[node]) {
        if (!set.has(v)) {
          path.unshift(v)
          set.add(v)
          next = v
          break
        }
      }
      if (next === null) path.shift()
    }
    return path
  }

  let diameter = findDiameter(top, end)
  let len = diameter.length
  let half = ~~(len / 2)
  return diameter.slice(half - (len + 1) % 2, half + 1)
}

/**
 * 找直径的写法效率很低，因为要 3 遍 bfs / dfs，还有 set 操作
 * 这里我们只需要找中点，可以用类似双指针的思想
 * 用头尾指针向中间走直到汇合
 * 头尾指的都是叶子节点了
 * 更进一步的想法，用剪支的方法
 * 每次都把叶子节点全部剪掉，就相当于是在往中间逼近
 * 每次被剪掉的叶子里包括直径的端点，也包括其他分支的端点
 * 但直径上的节点肯定后于其他分支被剪掉
 * 所以最后剩下的一定是直径中间的节点
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
let findMinHeightTrees_cut_map = function (n, edges) {
  let links = new Array(n).fill(0).map(() => [])
  for (let [from, to] of edges) {
    links[from].push(to)
    links[to].push(from)
  }
  let degree = new Map(links.map(arc => arc.length).entries())
  while (degree.size > 2) {
    let cuts = []
    for (let [v, deg] of degree) {
      if (deg <= 1) {
        degree.delete(v)
        cuts.push(v)
      }
    }
    for (let v of cuts) {
      for (let to of links[v]) {
        if (degree.has(to)) degree.set(to, degree.get(to) - 1)
      }
    }
  }
  return [...degree.keys()]
}

/**
 * 同样的剪叶子思路，不用 map 的写法
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
let findMinHeightTrees_cut = function (n, edges) {
  let links = new Array(n).fill(0).map(() => [])
  for (let [from, to] of edges) {
    links[from].push(to)
    links[to].push(from)
  }
  let degree = links.map(arc => arc.length)
  let leaves = degree.map((deg, i) => deg > 1 && -1 || i).filter(i => i >= 0)
  let len = n
  while (len > 2) {
    let nextLeaves = []
    len -= leaves.length
    for (let leaf of leaves) {
      for (let v of links[leaf]) {
        if (--degree[v] === 1) nextLeaves.push(v)
      }
    }
    leaves = nextLeaves
  }
  return leaves
}

module.exports = [
  findMinHeightTrees,
  findMinHeightTrees_cut_map,
  findMinHeightTrees_cut
]

module.exports.afterEach = result => result.sort((a, b) => a - b)
