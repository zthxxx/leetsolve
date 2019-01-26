module.exports = [
  {
    input: [[7, 9, 11, 13, 1, 3, 5]],
    expect: 13,
  },
  {
    input: [[3, 5, 7, 9, 11, 13, 1]],
    expect: 13,
  },
  {
    input: [[13, 1, 3, 5, 7, 9, 11]],
    expect: 13,
  },
  {
    input: [[5, 7, 9, 11, 11, 11, 11, 1, 3]],
    expect: 11,
  },
  {
    input: [[5, 7, 9, 11, 1, 1, 1, 1, 3]],
    expect: 11,
  },
  {
    input: [[1]],
    expect: 1,
  },
  {
    input: [[2, 1]],
    expect: 2,
  },
]
