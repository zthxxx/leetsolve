module.exports = [
  {
    input: [
      [1, 2, 3],
      [4, 5, 6]
    ],
    expect: [5, 7, 9]
  },
  {
    input: [
      [4, 2, 3],
      [4, 5, 6]
    ],
    expect: [8, 7, 9]
  },
  {
    input: [
      [9, 7, 3],
      [4, 5, 6]
    ],
    expect: [3, 3, 0, 1]
  }
]
