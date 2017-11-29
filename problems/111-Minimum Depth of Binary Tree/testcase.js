module.exports = [
  {
    input: [[1, null, 2, 3]],
    expect: 3
  },
  {
    input: [[1, 2, 3]],
    expect: 2
  },
  {
    input: [[1, 2, 3, 4, 5, 6]],
    expect: 3
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8]],
    expect: 3
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6]],
    expect: 4
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6, null, null, 7]],
    expect: 4
  },
  {
    input: [[1, null, 2, null, 3, null, 4, 5, 6, null, null, 7]],
    expect: 5
  },
  {
    input: [[]],
    expect: 0
  },
  {
    input: [[1]],
    expect: 1
  }
]
