require('../../libs/runDirect')


/**
 * 快排的 partition 函数 (左右交换法)
 * 功能：确定一个 pivot 点，把所有小于 pivot 值的点交换到它左边，所有大于它值的点交换到右边
 *
 * pivot 的点位置是在交换中不断变化的
 * 一趟交换中同时把
 * 「左边第一个不小于 pivot 的点」和「右边第一个小于 pivot 的点」分别同 pivot 点交换
 *
 * 之所以不直接交换左右两个点，目的是两次交换过程中可以把 pivot 点始终放在中间合适点位置
 * 注意判断 「不小于」、「小于」pivot 时只有一个等于符号，通常放在第二次判断
 *
 * @param {number[]} list
 * @param {number} start
 * @param {number} end
 * @return {number} pivot
 */
const partition = function (list, start, end) {
  let pivot = start
  while (start < end) {
    while (list[start] < list[pivot] && start < end) {
      start++
    }
    [list[pivot], list[start]] = [list[start], list[pivot]]
    pivot = start

    while (list[end] >= list[pivot] && start < end) {
      end--
    }
    [list[pivot], list[end]] = [list[end], list[pivot]]
    pivot = end
  }
  return pivot
}


/**
 * 快排的 partition 函数（顺序遍历法）
 * 功能：确定一个 pivot 点，把所有小于 pivot 值的点交换到它左边，所有大于它值的点交换到右边
 *
 * 不同于上面交换法的 partition 思想复杂,
 * 遍历法的 partition 完全类同于 148 题链表的快排 partition
 *
 * 可以理解为 创造两个数组 left 和 right，
 * 顺序遍历一遍，比 pivot 小的点就 push 到 left 中，大的就 push 到 right 中，
 * 只不过由于实际只在原数组上修改，把 push 变成交换，left 和 right 看成公用一个空间的两个反向栈
 * left 多一个数，right 就少一个数
 * 结束后 left 最后一个点就是中间点
 * pivot 可以设置为任意点，为了简单，这里就直接把 pivot 设置为起始点或者结束点
 *
 * left        ...          right
 * [] [9, 0, 17, 5, 10, 6(pivot)]   init
 * [0]   [9, 17, 5, 10, 6(pivot)]   swap 0 9, push 0 to left
 * [0, 5]   [17, 9, 10, 6(pivot)]   swap 5 9, push 5 to left
 * [0, 5, 6(pivot)]   [9, 10, 17]   swap 6 17, push 6 to left, end
 *
 *
 * @param {number[]} list
 * @param {number} start
 * @param {number} end
 * @return {number} pivot
 */
const partitionOrder = function (list, start, end) {
  let pivot = end
  let middle = start

  for (let i = start; i <= end; i++) {
    if (list[i] <= list[pivot]) {
      [list[i], list[middle]] = [list[middle], list[i]]
      middle++
    }
  }

  return middle - 1
}


/**
 * @param {number[]} list
 * @param {number} start
 * @param {number | null} end
 * @return {number[]}
 */
const quickSort = function (list, start = 0, end = null) {
  end = end === null ? list.length - 1 : end
  if (start >= end) return list
  const pivot = partition(list, start, end)
  quickSort(list, start, pivot - 1)
  quickSort(list, pivot + 1, end)
  return list
}

/**
 * @param {number[]} list
 * @param {number} start
 * @param {number | null} end
 * @return {number[]}
 */
const quickSort2 = function (list, start = 0, end = null) {
  end = end === null ? list.length - 1 : end
  if (start >= end) return list
  const pivot = partitionOrder(list, start, end)
  quickSort2(list, start, pivot - 1)
  quickSort2(list, pivot + 1, end)
  return list
}

module.exports = [
  quickSort,
  quickSort2,
]
