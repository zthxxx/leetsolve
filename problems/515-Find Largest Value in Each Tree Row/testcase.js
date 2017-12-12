module.exports = [
  {
    input: [[]],
    expect: []
  },
  {
    input: [[1]],
    expect: [1]
  },
  {
    input: [[2, 1, 3]],
    expect: [2, 3]
  },
  {
    input: [[1, 2, 3, 4, null, 5, 6, null, null, 7]],
    expect: [1, 3, 6, 7]
  },
  {
    input: [[1, 2, 3, 4, null, 5, 6, null, null, null, 7]],
    expect: [1, 3, 6, 7]
  },
  {
    input: [[1, 2, 3, 4, null, 5, 6, null, null, 8, 7]],
    expect: [1, 3, 6, 8]
  },
  {
    input: [[1, 2, 3, 4, null, 5, 6, null, null, 8, 7, null, null, null, null, 9]],
    expect: [1, 3, 6, 8, 9]
  },
  {
    input: [[-1, -2, -3, -4, null, -5, -6, null, null, -8, -7]],
    expect: [-1, -2, -4, -7]
  }
]
