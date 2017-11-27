module.exports = [
  {
    input: [[1, 1, 2]],
    expect: [2]
  },
  {
    input: [[1, 1, 2, 3, 3]],
    expect: [2]
  },
  {
    input: [[1, 2, 3, 4]],
    expect: [1, 2, 3, 4]
  },
  {
    input: [[1, 2, 3, 4, 4]],
    expect: [1, 2, 3]
  },
  {
    input: [[1, 1, 1, 1, 2]],
    expect: [2]
  },
  {
    input: [[1, 1, 2, 2, 3, 3, 4, 4]],
    expect: []
  },
  {
    input: [[]],
    expect: []
  },
  {
    input: [[1]],
    expect: [1]
  },
  {
    input: [[1, 1]],
    expect: []
  }
]
