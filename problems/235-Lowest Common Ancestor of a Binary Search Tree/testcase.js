module.exports = [
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 5, 9],
    expect: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 3, 8],
    expect: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 0, 3],
    expect: [2, 0, 4, null, null, 3, 5]
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 5],
    expect: [2, 0, 4, null, null, 3, 5]
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 7, 6],
    expect: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 8, 7],
    expect: [8, 7, 9]
  },
  {
    input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 4, 4],
    expect: [4, 3, 5]
  }
]
