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
    input: [[1, 2, 5, 3, 4, null, 6]],
    expect: [1, null, 2, null, 3, null, 4, null, 5, null, 6]
  },
  {
    input: [[-2, null, -3]],
    expect: [-2, null, -3]
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]],
    expect: [5, null, 4, null, 11, null, 7, null, 2, null, 8, null, 13, null, 4, null, 1]
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]],
    expect: [5, null, 4, null, 11, null, 7, null, 2, null, 8, null, 13, null, 4, null, 5, null, 1]
  },
  {
    input: [[1, 2, 3, 5, null, 6, 7]],
    expect: [1, null, 2, null, 5, null, 3, null, 6, null, 7]
  }
]
