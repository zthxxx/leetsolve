module.exports = [
  {
    input: [[], []],
    expect: []
  },
  {
    input: [[1], [1]],
    expect: [1]
  },
  {
    input: [[1, 2, 4, 3, 5, 6, 7], [4, 2, 1, 5, 3, 6, 7]],
    expect: [1, 2, 3, 4, null, 5, 6, null, null, null, null, null, 7]
  },
  {
    input: [[1, 2, 4, 3, 5, 6, 7], [2, 4, 1, 3, 6, 5, 7]],
    expect: [1, 2, 3, null, 4, null, 5, null, null, 6, 7]
  }
]
