module.exports = [
  {
    input: [[], 1],
    expect: false
  },
  {
    input: [[1], 1],
    expect: true
  },
  {
    input: [[-2, null, -3], -5],
    expect: true
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22],
    expect: true
  },
  {
    input: [[1, 2, 3, 5, 4, 6, 7], 10],
    expect: true
  },
  {
    input: [[1, 2, 3, 5, 4, 6, 7], 3],
    expect: false
  },
  {
    input: [[1, 2, 3, 5, null, 6, 7], 8],
    expect: true
  }
]
