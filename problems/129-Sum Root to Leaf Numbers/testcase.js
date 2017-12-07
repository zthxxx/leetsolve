module.exports = [
  {
    input: [[]],
    expect: 0
  },
  {
    input: [[1]],
    expect: 1
  },
  {
    input: [[1, 2, 5, 3, 4, null, 6]],
    expect: 403
  },
  {
    input: [[2, null, 3]],
    expect: 23
  },
  {
    input: [[2, 1, 3]],
    expect: 44
  },
  {
    input: [[1, 2, null, 3]],
    expect: 123
  },
  {
    input: [[0, 2, null, 3]],
    expect: 23
  },
  {
    input: [[2, null, 3, 4]],
    expect: 234
  },
  {
    input: [[5, 4, 8, 9, null, 9, 4, 7, 2, null, null, null, 1]],
    expect: 17419
  },
  {
    input: [[5, 4, 8, 9, null, 8, 4, 7, 2, null, null, 5, 1]],
    expect: 23263
  },
  {
    input: [[1, 2, 3, 5, null, 6, 7]],
    expect: 398
  }
]
