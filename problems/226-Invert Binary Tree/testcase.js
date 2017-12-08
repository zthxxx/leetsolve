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
    expect: [1, null, 2]
  },
  {
    input: [[1, null, 2]],
    expect: [1, 2]
  },
  {
    input: [[4, 7, 2, 9, 6, 3, 1]],
    expect: [4, 2, 7, 1, 3, 6, 9]
  },
  {
    input: [[4, 2, 7, 1, 3, 6, 9]],
    expect: [4, 7, 2, 9, 6, 3, 1]
  },
  {
    input: [[4, 2, 7, 1, 3, 6, 9, 10]],
    expect: [4, 7, 2, 9, 6, 3, 1, null, null, null, null, null, null, null, 10]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, null, null, null, 10]],
    expect: [1, 3, 2, 7, 6, 5, 4, null, null, 10, null, null, null, 9, 8]
  }
]
