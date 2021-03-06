module.exports = [
  {
    input: [[]],
    expect: []
  },
  {
    input: [[1]],
    expect: ['1']
  },
  {
    input: [[1, null, 2]],
    expect: ['1->2']
  },
  {
    input: [[1, 2, 3, null, 5]],
    expect: ['1->2->5', '1->3']
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
    expect: ['1->2->4->8', '1->2->4->9', '1->2->5', '1->3->6', '1->3->7']
  },
  {
    input: [[1, 2, null, 3, 4, 5, 6, null, null, 7, 8, null, 9]],
    expect: ['1->2->3->5->7', '1->2->3->5->8', '1->2->3->6->9', '1->2->4']
  }
]
