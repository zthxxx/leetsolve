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
    input: [[4, 2, 1, 5, 3, 6, 7], [4, 2, 5, 7, 6, 3, 1]],
    expect: [1, 2, 3, 4, null, 5, 6, null, null, null, null, null, 7]
  },
  {
    input: [[2, 4, 1, 3, 6, 5, 7], [4, 2, 6, 7, 5, 3, 1]],
    expect: [1, 2, 3, null, 4, null, 5, null, null, 6, 7]
  }
]
