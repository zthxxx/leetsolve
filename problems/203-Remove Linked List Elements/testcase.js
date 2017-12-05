module.exports = [
  {
    input: [[], 0],
    expect: []
  },
  {
    input: [[1], 1],
    expect: []
  },
  {
    input: [[1, 2], 1],
    expect: [2]
  },
  {
    input: [[1, 1, 1, 1, 2], 1],
    expect: [2]
  },
  {
    input: [[1, 1, 1, 1, 2, 2, 2, 2], 2],
    expect: [1, 1, 1, 1]
  },
  {
    input: [[1, 2, 6, 3, 4, 5, 6], 6],
    expect: [1, 2, 3, 4, 5]
  }
]
