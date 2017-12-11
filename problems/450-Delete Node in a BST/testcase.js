module.exports = [
  {
    input: [[], 0],
    expect: []
  },
  {
    input: [[1], 0],
    expect: [1]
  },
  {
    input: [[1], 1],
    expect: []
  },
  {
    input: [[2, 1, 3], 1],
    expect: [2, null, 3]
  },
  {
    input: [[2, 1, 3], 2],
    expect: [3, 1]
  },
  {
    input: [[2, 1, 4, null, null, 3], 2],
    expect: [3, 1, 4]
  },
  {
    input: [[3, 1, 4, null, 2], 2],
    expect: [3, 1, 4]
  },
  {
    input: [[1, null, 2, null, 3], 2],
    expect: [1, null, 3]
  },
  {
    input: [[3, 2, 5, 1, null, 4], 4],
    expect: [3, 2, 5, 1]
  },
  {
    input: [[6, 5, 15, null, null, 10, 20], 15],
    expect: [6, 5, 20, null, null, 10]
  },
  {
    input: [[6, 5, 15, null, null, 10, 20], 22],
    expect: [6, 5, 15, null, null, 10, 20]
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6], 7],
    expect: [5, 3, 8, 2, 4, 6, 9, 1]
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6], 3],
    expect: [5, 4, 8, 2, null, 7, 9, 1, null, 6]
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6], 8],
    expect: [5, 3, 9, 2, 4, 7, null, 1, null, null, null, 6]
  },
  {
    input: [[5, 3, 6, 2, 4, null, 7], 3],
    expect: [5, 4, 6, 2, null, null, 7]
  }
]
