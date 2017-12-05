module.exports = [
  {
    input: [[]],
    expect: []
  },
  {
    input: [[1]],
    expect: [[1]]
  },
  {
    input: [[1, 2, 2]],
    expect: [[1], [2, 2]]
  },
  {
    input: [[1, null, 2]],
    expect: [[1], [2]]
  },
  {
    input: [[1, 2, 2, 3, 4, 4, 3]],
    expect: [[1], [2, 2], [3, 4, 4, 3]]
  },
  {
    input: [[1, 2, 2, null, 3, null, 3]],
    expect: [[1], [2, 2], [3, 3]]
  },
  {
    input: [[3, 9, 20, null, null, 15, 7]],
    expect: [[3], [9, 20], [15, 7]]
  }
]
