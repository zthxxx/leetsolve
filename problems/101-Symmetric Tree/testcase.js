module.exports = [
  {
    input: [[]],
    expect: true
  },
  {
    input: [[1]],
    expect: true
  },
  {
    input: [[1, 2, 2]],
    expect: true
  },
  {
    input: [[1, 2, 2, 3, 4, 4, 3]],
    expect: true
  },
  {
    input: [[1, 2, 2, null, 3, null, 3]],
    expect: false
  }
]
