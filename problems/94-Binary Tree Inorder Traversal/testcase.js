module.exports = [
  {
    input: [[1, null, 2, 3]],
    expect: [1, 3, 2]
  },
  {
    input: [[1, 2, 3]],
    expect: [2, 1, 3]
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6]],
    expect: [1, 5, 3, 2, 4, 6]
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6, null, null, 7]],
    expect: [1, 5, 3, 2, 4, 7, 6]
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
