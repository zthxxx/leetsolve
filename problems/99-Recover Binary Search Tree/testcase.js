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
    input: [[1, 2]],
    expect: [2, 1]
  },
  {
    input: [[1, 2, 3]],
    expect: [2, 1, 3]
  },
  {
    input: [[10, 5, 15, null, null, 6, 20]],
    expect: [6, 5, 15, null, null, 10, 20]
  },
  {
    input: [[7, 3, 8, 2, 4, 5, 9, 1, null, null, null, 6]],
    expect: [5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]
  },
  {
    input: [[5, 7, 8, 2, 4, 3, 9, 1, null, null, null, 6]],
    expect: [5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]
  },
  {
    input: [[5, 8, 3, 2, 4, 7, 9, 1, null, null, null, 6]],
    expect: [5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]
  }
]
