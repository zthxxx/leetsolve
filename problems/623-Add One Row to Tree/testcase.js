module.exports = [
  {
    input: [[], 1, 1],
    expect: []
  },
  {
    input: [[1], 2, 1],
    expect: [2, 1]
  },
  {
    input: [[4, 3, 3, 2, null, null, null, 3, 1], 5, 3],
    expect: [4, 3, 3, 5, 5, 5, 5, 2, null, null, null, null, null, null, null, 3, 1]
  },
  {
    input: [[4, 2, null, 3, 1], 3, 2],
    expect: [4, 3, 3, 2, null, null, null, 3, 1]
  },
  {
    input: [[3, 4, 5, 1, 2, null, null, 0], 3, 2],
    expect: [3, 3, 3, 4, null, null, 5, 1, 2, null, null, 0]
  },
  {
    input: [[3, 4, 5, 1, 2, null, null, 0], 5, 5],
    expect: [3, 4, 5, 1, 2, null, null, 0, null, null, null, 5, 5]
  }
]
