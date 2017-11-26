module.exports = [
  {
    input: [
      [1, 2, 3],
      [4, 5, 6]
    ],
    expect: [1, 2, 3, 4, 5, 6]
  },
  {
    input: [
      [1, 2, 2, 3, 4],
      [3, 4, 5]
    ],
    expect: [1, 2, 2, 3, 3, 4, 4, 5]
  },
  {
    input: [
      [1, 3, 5, 8],
      [2, 4, 6, 7, 9]
    ],
    expect: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    input: [
      [],
      []
    ],
    expect: []
  },
  {
    input: [
      [1],
      []
    ],
    expect: [1]
  },
  {
    input: [
      [],
      [0]
    ],
    expect: [0]
  }
]
