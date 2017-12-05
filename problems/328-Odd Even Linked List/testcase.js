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
    expect: [1, 2]
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expect: [1, 3, 5, 2, 4]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
    expect: [1, 3, 5, 7, 9, 2, 4, 6, 8]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    expect: [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]
  }
]
