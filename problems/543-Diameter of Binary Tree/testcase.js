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
    expect: 1
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expect: 3
  },
  {
    input: [[1, 2, null, 3, null, 4, 5, 6, null, 7, 8, 9, 10, 11]],
    expect: 6
  },
  {
    input: [[1, null, 2, 3, 4, null, 5, 6, null, 7, 8, 9, 10, 11]],
    expect: 7
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]],
    expect: 6
  }
]
