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
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    expect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    input: [[1, 2, null, 3, 4, 5, null, null, null, 6, 7, 8, 9, 10]],
    expect: [1, 2, null, 3, 4, 5, null, null, null, 6, 7, 8, 9, 10]
  },
  {
    input: [[1, null, 2, 3, 4, 5, 6, 7, null, 8, 9, null, 10]],
    expect: [1, null, 2, 3, 4, 5, 6, 7, null, 8, 9, null, 10]
  },
  {
    input: [[1, 2, 3, null, 4, 5, null, 6, 7, 8, 9, null, null, null, null, 10]],
    expect: [1, 2, 3, null, 4, 5, null, 6, 7, 8, 9, null, null, null, null, 10]
  }
]
