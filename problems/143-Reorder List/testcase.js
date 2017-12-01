module.exports = [
  {
    input: [[]],
    expect: []
  },
  {
    input: [[0]],
    expect: [0]
  },
  {
    input: [[0, 1]],
    expect: [0, 1]
  },
  {
    input: [[0, 1, 2]],
    expect: [0, 2, 1]
  },
  {
    input: [[0, 1, 2, 3]],
    expect: [0, 3, 1, 2]
  },
  {
    input: [[0, 1, 2, 3, 4]],
    expect: [0, 4, 1, 3, 2]
  },
  {
    input: [[0, 1, 2, 3, 4, 5]],
    expect: [0, 5, 1, 4, 2, 3]
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]],
    expect: [0, 20, 1, 19, 2, 18, 3, 17, 4, 16, 5, 15, 6, 14, 7, 13, 8, 12, 9, 11, 10]
  }
]
