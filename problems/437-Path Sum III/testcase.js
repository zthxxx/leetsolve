module.exports = [
  {
    input: [[], 1],
    expect: 0
  },
  {
    input: [[1], 1],
    expect: 1
  },
  {
    input: [[1], 0],
    expect: 0
  },
  {
    input: [[0], 0],
    expect: 1
  },
  {
    input: [[1, 2, 4, 0], 0],
    expect: 1
  },
  {
    input: [[1, 2, 4, 1], 0],
    expect: 0
  },
  {
    input: [[-2, null, -3], -5],
    expect: 1
  },
  {
    input: [[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8],
    expect: 3
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22],
    expect: 2
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22],
    expect: 3
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 100],
    expect: 0
  },
  {
    input: [[1, 2, 3, 5, 4, 6, 7], 10],
    expect: 2
  },
  {
    input: [[1, 2, 3, 5, 4, 6, 7], 3],
    expect: 2
  },
  {
    input: [[1, 2, 3, 5, null, 6, 7], 8],
    expect: 1
  },
  {
    input: [[-1, 4, 3, 5, null, 6, 7], 8],
    expect: 2
  },
  {
    input: [[1, null, 2, null, 0, null, 4, null, -4, null, 3], 3],
    expect: 6
  },
  {
    input: [
      [0, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
      1
    ],
    expect: 32
  },
  {
    input: [
      [
        0, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ],
      1
    ],
    expect: 92
  }
]
