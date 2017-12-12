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
    input: [[1, null, 2, 2]],
    expect: [2]
  },
  {
    input: [[1, null, 2, 2, 3, null, null, 3]],
    expect: [2, 3]
  },
  {
    input: [[1, null, 2, 2, 3, null, null, 3, 3]],
    expect: [3]
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]],
    expect: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    input: [[5, 3, 8, 2, 4, 6, 9, 1, null, null, null, 6]],
    expect: [6]
  }
]
