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
    input: [[1, 2, 2]],
    expect: 2
  },
  {
    input: [[1, 5, 2]],
    expect: 5
  },
  {
    input: [[2, 1, 1, 2]],
    expect: 3
  },
  {
    input: [[2, 3, 2, 3, 3, 3, 4]],
    expect: 10
  },
  {
    input: [[7, 3, 2, 3, 3, 3, 4]],
    expect: 13
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: 15
  },
  {
    input: [[2, 1, 3, 2, 2, 6, 5, 7]],
    expect: 16
  },
  {
    input: [[1, 2, 2, 3, 6, 2, 7, 4]],
    expect: 16
  },
  {
    input: [[5, 1, 6, 2, 7, 3, 8, 4, 9]],
    expect: 30
  }
]
