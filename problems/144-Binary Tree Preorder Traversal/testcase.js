module.exports = [
  {
    input: [[1, null, 2, 3]],
    expect: [1, 2, 3]
  },
  {
    input: [[1, 2, 3]],
    expect: [1, 2, 3]
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6]],
    expect: [1, 2, 3, 5, 4, 6]
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6, null, null, 7]],
    expect: [1, 2, 3, 5, 4, 6, 7]
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
