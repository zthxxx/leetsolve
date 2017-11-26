module.exports = [
  {
    input: [[1, 2, 3, 4]],
    expect: [2, 1, 4, 3]
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expect: [2, 1, 4, 3, 5]
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
