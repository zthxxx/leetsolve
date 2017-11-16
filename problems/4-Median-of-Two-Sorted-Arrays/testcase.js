module.exports = [
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      [0, 6]
    ],
    expect: 10.5
  },
  {
    input: [[], []],
    expect: 0
  },
  {
    input: [
      [1],
      [0]
    ],
    expect: 0.5
  },
  {
    input: [
      [1],
      []
    ],
    expect: 1
  },
  {
    input: [
      [1, 2],
      [4, 5]
    ],
    expect: 3
  },
  {
    input: [
      [1, 2],
      [4, 5, 6]
    ],
    expect: 4
  },
  {
    input: [
      [1, 2, 3],
      [6]
    ],
    expect: 2.5
  }
]
