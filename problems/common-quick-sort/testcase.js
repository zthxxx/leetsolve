module.exports = [
  {
    input: [[7, 9, 11, 1, 3, 5]],
    expect: [1, 3, 5, 7, 9, 11],
  },
  {
    input: [[7, 1, 9, 11, 1, 3, 5]],
    expect: [1, 1, 3, 5, 7, 9, 11],
  },
  {
    input: [[7, 9, 4, 11, 1, 3, 5]],
    expect: [1, 3, 4, 5, 7, 9, 11],
  },
  {
    input: [[9, 17, 0, 6, 10, 5]],
    expect: [0, 5, 6, 9, 10, 17],
  },
  {
    input: [[]],
    expect: [],
  },
  {
    input: [[1]],
    expect: [1],
  },
]
