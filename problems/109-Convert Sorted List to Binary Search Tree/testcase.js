module.exports = [
  {
    input: [[1, 2, 3, 4, 5]],
    expect: [3, 2, 5, 1, null, 4]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
    expect: [5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8]],
    expect: [5, 3, 7, 2, 4, 6, 8, 1]
  },
  {
    input: [[1]],
    expect: [1]
  },
  {
    input: [[1, 2]],
    expect: [2, 1]
  },
  {
    input: [[]],
    expect: []
  }
]
