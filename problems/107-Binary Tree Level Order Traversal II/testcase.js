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
    expect: [[2, 2], [1]]
  },
  {
    input: [[1, null, 2]],
    expect: [[2], [1]]
  },
  {
    input: [[1, 2, 2, 3, 4, 4, 3]],
    expect: [[3, 4, 4, 3], [2, 2], [1]]
  },
  {
    input: [[1, 2, 2, null, 3, null, 3]],
    expect: [[3, 3], [2, 2], [1]]
  },
  {
    input: [[3, 9, 20, null, null, 15, 7]],
    expect: [[15, 7], [9, 20], [3]]
  }
]
