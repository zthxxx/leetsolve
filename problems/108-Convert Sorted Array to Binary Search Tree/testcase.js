module.exports = [
  {
    input: [[1, 2, 3, 4, 5]],
    expect: [3, 1, 4, null, 2, null, 5]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
    expect: [5, 2, 7, 1, 3, 6, 8, null, null, null, 4, null, null, null, 9]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8]],
    expect: [4, 2, 6, 1, 3, 5, 7, null, null, null, null, null, null, null, 8]
  },
  {
    input: [[1]],
    expect: [1]
  },
  {
    input: [[1, 2]],
    expect: [1, null, 2]
  },
  {
    input: [[]],
    expect: []
  }
]
