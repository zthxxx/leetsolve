module.exports = [
  {
    input: [[1, 2, 3, 4, 5, null, 7]],
    expect: [[1, null], [2, 3], [3, null], [4, 5], [5, 7], null, [7, null]]
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]],
    expect: [
      [5, null], [4, 8], [8, null], [11, 13], null, [13, 4], [4, null], [7, 2], [2, 1], null, null, null, [1, null]
    ]
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]],
    expect: [
      [5, null], [4, 8], [8, null], [11, 13], null, [13, 4], [4, null], [7, 2], [2, 5], null, null, [5, 1], [1, null]
    ]
  },
  {
    input: [[1, 2, 3, 5, null, 6, 7]],
    expect: [[1, null], [2, 3], [3, null], [5, 6], null, [6, 7], [7, null]]
  }
]
