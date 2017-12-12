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
    input: [[2, 1]],
    expect: [2, 3]
  },
  {
    input: [[2, 1, 3]],
    expect: [5, 6, 3]
  },
  {
    input: [[3, 2, 4, 1]],
    expect: [7, 9, 4, 10]
  },
  {
    input: [[3, 2, 5, 1, null, 4]],
    expect: [12, 14, 5, 15, null, 9]
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]],
    expect: [35, 42, 17, 44, 39, 24, 9, 45, null, null, null, 30]
  }
]
