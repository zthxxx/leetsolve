module.exports = [
  {
    input: [[3, 2, 3, null, 3, null, 1]],
    expect: 7
  },
  {
    input: [[3, 6, 3, null, 3, null, 1]],
    expect: 9
  },
  {
    input: [[3, 4, 5, 1, 3, null, 1]],
    expect: 9
  },
  {
    input: [[3, 4, 5, 1, 3, null, 3]],
    expect: 10
  },
  {
    input: [[8, 9, 6, 1, null, 6, null, 4, 9, null, 6, 1, 6, 3, 8]],
    expect: 39
  },
  {
    input: [[8, 4, 9, null, 6, null, 1, 6, 3, 8, 6, 1, null, 6, null, 4]],
    expect: 39
  },
  {
    input: [[8, 4, 9, 1, null, 6, 1, 6, 3, null, 8, 6, 1, 6, null, 4, 1, 1, 1, 1, 1]],
    expect: 39
  }
]
