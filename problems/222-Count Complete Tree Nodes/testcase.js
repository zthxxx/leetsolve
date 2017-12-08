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
    input: [[1, 2, 3]],
    expect: 3
  },
  {
    input: [[1, 2, 3, 4]],
    expect: 4
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expect: 5
  },
  {
    input: [[1, 2, 3, 4, 5, 6]],
    expect: 6
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    expect: 10
  },
  {
    input: [new Array(1000).fill(1)],
    expect: 1000
  }
]
