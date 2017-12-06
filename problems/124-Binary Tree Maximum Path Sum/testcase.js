module.exports = [
  {
    input: [[]],
    expect: null
  },
  {
    input: [[1]],
    expect: 1
  },
  {
    input: [[1, 2, 5, 3, 4, null, 6]],
    expect: 18
  },
  {
    input: [[-2, null, -3]],
    expect: -2
  },
  {
    input: [[-1, -2, null, -3]],
    expect: -1
  },
  {
    input: [[-2, null, -3, 4]],
    expect: 4
  },
  {
    input: [[-2, -5, -3, null, null, -1]],
    expect: -1
  },
  {
    input: [[-2, -5, -3, null, null, -1, 1]],
    expect: 1
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]],
    expect: 48
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]],
    expect: 48
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1, 100, 100]],
    expect: 207
  },
  {
    input: [[1, 2, 3, 5, null, 6, 7]],
    expect: 18
  },
  {
    input: [[1, 2, 5, 3, 4, null, 6, 7, 8, null, null, 9, 10]],
    expect: 35
  }
]
