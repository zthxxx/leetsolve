module.exports = [
  {
    input: [],
    expect: true
  },
  {
    input: [[1]],
    expect: true
  },
  {
    input: [[1, 2]],
    expect: false
  },
  {
    input: [[1, 2, 1]],
    expect: true
  },
  {
    input: [[1, 2, 2, 1]],
    expect: true
  },
  {
    input: [[1, 2, 3, 2, 1]],
    expect: true
  },
  {
    input: [[1, 2, 3, 4, 1]],
    expect: false
  },
  {
    input: [[1, 2, 3, 3, 2, 1]],
    expect: true
  },
  {
    input: [[1, 2, 3, 3, 4, 1]],
    expect: false
  }
]
