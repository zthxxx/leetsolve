module.exports = [
  {
    input: [[]],
    expect: 0
  },
  {
    input: [[1]],
    expect: 0
  },
  {
    input: [[1, 2]],
    expect: 2
  },
  {
    input: [[1, 2, 3]],
    expect: 1
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expect: 9
  },
  {
    input: [[1, 23, 4, 5, 6, 7, 8, 9, -10, -11, -12]],
    expect: 51
  },
  {
    input: [[1, 2, -3, 4, 5, -6, 7, 8, 9, -10, -11, -12]],
    expect: 97
  },
  {
    input: [[1, 2, -3, null, 4, 5, -6, null, null, 7, 8, null, 9, -10, -11, -12]],
    expect: 71
  }
]
