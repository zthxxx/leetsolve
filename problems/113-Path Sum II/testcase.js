module.exports = [
  {
    input: [[], 1],
    expect: []
  },
  {
    input: [[1], 1],
    expect: [
      [1]
    ]
  },
  {
    input: [[-2, null, -3], -5],
    expect: [
      [-2, -3]
    ]
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22],
    expect: [
      [5, 4, 11, 2]
    ]
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22],
    expect: [
      [5, 4, 11, 2],
      [5, 8, 4, 5]
    ]
  },
  {
    input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 100],
    expect: []
  },
  {
    input: [[1, 2, 3, 5, 4, 6, 7], 10],
    expect: [
      [1, 3, 6]
    ]
  },
  {
    input: [[1, 2, 3, 5, 4, 6, 7], 3],
    expect: []
  },
  {
    input: [[1, 2, 3, 5, null, 6, 7], 8],
    expect: [
      [1, 2, 5]
    ]
  }
]
