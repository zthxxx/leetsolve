module.exports = [
  {
    input: [[1, 2, 3], [1, 2, 3]],
    expect: true
  },
  {
    input: [[1, 2], [1, null, 2]],
    expect: false
  },
  {
    input: [[1, 2, 1], [1, 1, 2]],
    expect: false
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6], [1, null, 2, 3, 4, 5, null, null, 6]],
    expect: true
  },
  {
    input: [[1, null, 2, 3, 4, 5, null, null, 6], [1, null, 2, 3, 4, 5, null, null, 6, 7]],
    expect: false
  },
  {
    input: [[], []],
    expect: true
  },
  {
    input: [[1], [1]],
    expect: true
  }
]
