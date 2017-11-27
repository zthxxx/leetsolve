module.exports = [
  {
    input: [[1, 2, 3, 4], 0],
    expect: [1, 2, 3, 4]
  },
  {
    input: [[1, 2, 3, 4], 1],
    expect: [4, 1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4], 2],
    expect: [3, 4, 1, 2]
  },
  {
    input: [[1, 2, 3, 4], 7],
    expect: [2, 3, 4, 1]
  },
  {
    input: [[1, 2, 3, 4, 5], 2],
    expect: [4, 5, 1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4, 5], 3],
    expect: [3, 4, 5, 1, 2]
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 3],
    expect: [4, 5, 6, 1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 6],
    expect: [1, 2, 3, 4, 5, 6]
  },
  {
    input: [[1, 2], 2],
    expect: [1, 2]
  },
  {
    input: [[1], 2],
    expect: [1]
  },
  {
    input: [[], 2],
    expect: []
  },
  {
    input: [[], 0],
    expect: []
  },
  {
    input: [[1, 2, 3], 4],
    expect: [3, 1, 2]
  }
]
