module.exports = [
  {
    input: [[1, 2, 3, 4], 1],
    expect: [1, 2, 3, 4]
  },
  {
    input: [[1, 2, 3, 4], 2],
    expect: [2, 1, 4, 3]
  },
  {
    input: [[1, 2, 3, 4, 5], 2],
    expect: [2, 1, 4, 3, 5]
  },
  {
    input: [[1, 2, 3, 4, 5], 3],
    expect: [3, 2, 1, 4, 5]
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 3],
    expect: [3, 2, 1, 6, 5, 4]
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 6],
    expect: [6, 5, 4, 3, 2, 1]
  },
  {
    input: [[1, 2], 2],
    expect: [2, 1]
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
    input: [[1, 2, 3], 4],
    expect: [1, 2, 3]
  }
]
