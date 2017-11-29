module.exports = [
  {
    input: [[1, null, 2, 3]],
    expect: false
  },
  {
    input: [[1, 2, 3]],
    expect: true
  },
  {
    input: [[1, 2, 3, 4, 5, 6]],
    expect: true
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8]],
    expect: true
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6]],
    expect: false
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6, null, null, 7]],
    expect: false
  },
  {
    input: [[]],
    expect: true
  },
  {
    input: [[1]],
    expect: true
  }
]
