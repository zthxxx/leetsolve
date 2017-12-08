module.exports = [
  {
    input: [[1], 1],
    expect: 1
  },
  {
    input: [[2, 1, 3], 2],
    expect: 2
  },
  {
    input: [[1, null, 2, null, 3], 2],
    expect: 2
  },
  {
    input: [[3, 2, 5, 1, null, 4], 4],
    expect: 4
  },
  {
    input: [[6, 5, 15, null, null, 10, 20], 3],
    expect: 10
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6], 6],
    expect: 6
  }
]
