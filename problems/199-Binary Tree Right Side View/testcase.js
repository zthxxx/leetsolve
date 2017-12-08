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
    input: [[1, 2, 3, null, 5, null, 4]],
    expect: [1, 3, 4]
  },
  {
    input: [[1, 2, 3, null, 5]],
    expect: [1, 3, 5]
  },
  {
    input: [[2, 1, 3]],
    expect: [2, 3]
  },
  {
    input: [[3, 2, 5, 1, null, 4]],
    expect: [3, 5, 4]
  },
  {
    input: [[6, 5, 15, null, null, 10, 20]],
    expect: [6, 15, 20]
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]],
    expect: [5, 8, 9, 6]
  }
]
