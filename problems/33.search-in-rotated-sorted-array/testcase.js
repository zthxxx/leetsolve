module.exports = [
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 0],
    expect: 4
  },
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 3],
    expect: -1
  },
  {
    input: [[7, 9, 11, 13, 1, 3, 5], 7],
    expect: 0
  },
  {
    input: [[7, 9, 11, 13, 1, 3, 5], 11],
    expect: 2
  },
  {
    input: [[3, 5, 7, 9, 11, 13, 1], 11],
    expect: 4
  },
  {
    input: [[13, 1, 3, 5, 7, 9, 11], 11],
    expect: 6
  },
  {
    input: [[3, 3, 5, 7, 9, 11, 11, 13, 1, 3], 11],
    expect: 5
  },
  {
    input: [[5, 7, 9, 11, 1, 1, 1, 3], 1],
    expect: 5
  },
  {
    input: [[5, 5, 5, 7, 9, 11, 1, 1, 3, 5, 5, 5, 5], 5],
    expect: 9
  },
  {
    input: [[1], 1],
    expect: 0
  },
  {
    input: [[1], 2],
    expect: -1
  },
  {
    input: [[2, 1], 1],
    expect: 1
  },
  {
    input: [[], 1],
    expect: -1
  },
  {
    input: [[5, 1, 3], 5],
    expect: 0
  },
  {
    input: [[5, 1, 3], 3],
    expect: 2
  },
]
