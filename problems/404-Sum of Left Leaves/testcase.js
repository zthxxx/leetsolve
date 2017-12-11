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
    expect: 2
  },
  {
    input: [[3, 9, 20, null, null, 15, 7]],
    expect: 24
  },
  {
    input: [[3, 1, 9, 20, 2, null, null, 3, 15, 7]],
    expect: 10
  },
  {
    input: [[3, 1, 5, 9, 20, 2, null, null, 3, 15, 7]],
    expect: 17
  }
]
