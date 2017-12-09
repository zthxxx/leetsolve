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
    input: [[1, 2]],
    expect: 2
  },
  {
    input: [[1, 3, 2]],
    expect: 3
  },
  {
    input: [[1, 5, 2]],
    expect: 5
  },
  {
    input: [[2, 1, 1, 2]],
    expect: 4
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: 16
  },
  {
    input: [[2, 1, 3, 2, 2, 6, 5, 7]],
    expect: 18
  },
  {
    input: [[1, 2, 2, 3, 6, 2, 7, 4]],
    expect: 16
  }
]
