module.exports = [
  {
    input: [[1, 2, 3, 4, 5, 6]],
    expect: [6, 5, 4, 3, 2, 1]
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expect: [5, 4, 3, 2, 1]
  },
  {
    input: [[1, 2]],
    expect: [2, 1]
  },
  {
    input: [[1]],
    expect: [1]
  },
  {
    input: [[]],
    expect: []
  }
]
