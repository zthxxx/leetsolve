module.exports = [
  {
    input: [null],
    expect: null
  },
  {
    input: [[1]],
    expect: null
  },
  {
    input: [[1, 2]],
    expect: null
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7]],
    expect: null
  },
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7], 5],
    expect: 5
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 1],
    expect: 1
  },
  {
    input: [[0, 1, 2, 3, 4, 5], 5],
    expect: 5
  }
]

