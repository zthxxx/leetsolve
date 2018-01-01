module.exports = [
  {
    input: [
      [1, 3, 2, 5],
      [2, 1, 3, null, 4, null, 7]
    ],
    expect: [3, 4, 5, 5, 4, null, 7]
  },
  {
    input: [
      [1, 3, 2, 5, null, 6],
      [2, 1, 5, 4, 3, null, 4, null, 7]
    ],
    expect: [3, 4, 7, 9, 3, 6, 4, null, 7]
  }
]
