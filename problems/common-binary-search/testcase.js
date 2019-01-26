module.exports = [
  {
    input: [[1, 3, 5, 7, 9, 11], 11],
    expect: 5,
  },
  {
    input: [[1, 3, 5, 7, 9, 11], 1],
    expect: 0,
  },
  {
    input: [[1, 3, 5, 7, 9, 11], 6],
    expect: null,
  },
  {
    input: [[], 1],
    expect: null,
  },
  {
    input: [[1], 1],
    expect: 0,
  },
]
