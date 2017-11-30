module.exports = [
  {
    input: [null],
    expect: false
  },
  {
    input: [[1]],
    expect: false
  },
  {
    input: [[1, 2]],
    expect: false
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: false
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7], 5],
    expect: true
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 5],
    expect: true
  }
]

