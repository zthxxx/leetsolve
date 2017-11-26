module.exports = [
  {
    input: [[1, 2, 3, 4, 5], 2],
    expect: [1, 2, 3, 5]
  },
  {
    input: [[1, 2, 3, 4], 2],
    expect: [1, 2, 4]
  },
  {
    input: [[1, 2, 3, 4], 1],
    expect: [1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4], 4],
    expect: [2, 3, 4]
  },
  {
    input: [[1, 2, 3, 4], 3],
    expect: [1, 3, 4]
  },
  {
    input: [[1, 2, 3, 4], 6],
    expect: [2, 3, 4]
  },
  {
    input: [[1], 1],
    expect: []
  },
  {
    input: [[1, 2], 1],
    expect: [1]
  }
]
