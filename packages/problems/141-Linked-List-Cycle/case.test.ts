import {
  defineTest,
  Cases,
  Hook,
  ListNode,
  genList,
  iterateList,
} from '@leetsolve/kit'

import solution from '.'


const testcases: Cases<[number[], number?], boolean> = [
  {
    input: [[1]],
    expect: false,
  },
  {
    input: [[1, 2]],
    expect: false,
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: false,
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7], 5],
    expect: true,
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 5],
    expect: true,
  },
  {
    input: [[0, 1, 2, 3], -1],
    expect: false,
  },
]

const hook: Hook<[ListNode], boolean> = {
  /**
   * trackIndex - 表示原链的尾节点的下一项要指向链中哪个序号的节点，以成环；
   * 如参数 ([1,2,3,4,5], 3) 最后的 3 表示原本尾节点的下一项
   * 现在指向第 4 个节点（序号为 3，值为 4）
   * 不传此项或超出序号则不成环
   */
   input: (values: number[], trackIndex?: number): [ListNode] => {
    const head = genList(values)!
    if (trackIndex !== undefined) {
      const nodes = [...iterateList(head)]
      const last = nodes[nodes.length - 1]
      last.next = nodes[trackIndex] ?? null
    }
    return [head]
  },
}

// prettier-ignore
describe(
  `141. Linked List Cycle (https://leetcode.com/problems/linked-list-cycle)`,
  () => defineTest(solution, testcases, hook),
)
