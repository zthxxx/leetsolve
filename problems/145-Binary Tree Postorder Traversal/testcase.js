module.exports = [
  {
    input: [[1, null, 2, 3]],
    expect: [3, 2, 1]
  },
  {
    input: [[1, 2, 3]],
    expect: [2, 3, 1]
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6]],
    expect: [5, 3, 6, 4, 2, 1]
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6, null, null, 7]],
    expect: [5, 3, 7, 6, 4, 2, 1]
  },
  {
    input: [[]],
    expect: []
  },
  {
    input: [[1]],
    expect: [1]
  }
]
