module.exports = [
  {
    input: [
      1,
      []
    ],
    expect: [0]
  },
  {
    input: [
      2,
      [[0, 1]]
    ],
    expect: [0, 1]
  },
  {
    input: [
      2,
      [[0, 1]]
    ],
    expect: [0, 1]
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3], [4, 0]]
    ],
    expect: []
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3]]
    ],
    expect: [0, 1, 2, 3, 4]
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [0, 0]]
    ],
    expect: []
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3], [3, 2]]
    ],
    expect: [0, 1, 2, 3, 4]
  },
  {
    input: [
      5,
      [[0, 1], [0, 2], [0, 3], [0, 4], [4, 3], [3, 2], [2, 4]]
    ],
    expect: []
  }
]
