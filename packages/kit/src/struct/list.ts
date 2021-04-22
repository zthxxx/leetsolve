export class ListNode {
  val: number
  next: ListNode | null

  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val
    this.next = next
  }
}

export const genList = (values: number[]): ListNode | null => {
  if (!values.length) return null
  const nodes = values.map(val => new ListNode(val))
  const head = nodes[0]

  nodes.reduce((last, next) => {
    last.next = next
    return next
  })
  return head
}

export function *iterateList(head: ListNode): Generator<ListNode> {
  let node: ListNode | null = head
  while(node) {
    yield node
    node = node.next
  }
}
