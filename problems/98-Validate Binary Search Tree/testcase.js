module.exports = [
  {
    input: [[]],
    expect: true
  },
  {
    input: [[1]],
    expect: true
  },
  {
    input: [[1, 2, 3]],
    expect: false
  },
  {
    input: [[2, 1, 3]],
    expect: true
  },
  {
    input: [[1, null, 2, null, 3]],
    expect: true
  },
  {
    input: [[1, null, 2, 3]],
    expect: false
  },
  {
    input: [[1, 1, 1, 1, 1, null, 1]],
    expect: false
  },
  {
    input: [[10, 5, 15, null, null, 6, 20]],
    expect: false
  },
  {
    input: [[3, 2, 5, 1, null, 4]],
    expect: true
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 6]],
    expect: true
  },
  {
    input: [[3, 2, 5, 1, null, 4, null, 6]],
    expect: false
  },
  {
    input: [[5, 3, 8, 2, 4, 7, 9, 1, null, null, null, 10, 6]],
    expect: false
  }
]
