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
    input: [[5, 2, -3]],
    expect: [-3, 2, 4]
  },
  {
    input: [[5, 2, -5]],
    expect: [2]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1]],
    expect: [1, 2, 3, 4, 5, 6, 7, 8, 10, 13, 16, 19, 26, 37, 64]
  },
  {
    input: [[1, 2, 3, 4, null, 3, 2, null, null, 1]],
    expect: [4]
  },
  {
    input: [[1, 2, 3, 4, null, 3, 2, null, null, null, null, 1]],
    expect: [3]
  },
  {
    input: [[1, 2, 3, 3, 3, 2, 2, 4, 4]],
    expect: [2, 4]
  }
]
