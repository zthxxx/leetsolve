module.exports = [
  {
    input: [
      1,
      []
    ],
    expect: true
  },
  {
    input: [
      2,
      [[0, 1]]
    ],
    expect: true
  },
  {
    input: [
      2,
      [[0, 1]]
    ],
    expect: true
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3], [4, 0]]
    ],
    expect: false
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3]]
    ],
    expect: true
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3], [3, 2]]
    ],
    expect: true
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3], [3, 2], [2, 4]]
    ],
    expect: false
  }
]
