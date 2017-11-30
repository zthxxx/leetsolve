module.exports = [
  {
    input: [0],
    expect: []
  },
  {
    input: [1],
    expect: [
      [1]
    ]
  },
  {
    input: [2],
    expect: [
      [1, null, 2],
      [2, 1]
    ]
  },
  {
    input: [3],
    expect: [
      [1, null, 2, null, 3],
      [1, null, 3, 2],
      [2, 1, 3],
      [3, 1, null, null, 2],
      [3, 2, null, 1]
    ]
  },
  {
    input: [4],
    expect: [
      [1, null, 2, null, 3, null, 4],
      [1, null, 2, null, 4, 3],
      [1, null, 3, 2, 4],
      [1, null, 4, 2, null, null, 3],
      [1, null, 4, 3, null, 2],
      [2, 1, 3, null, null, null, 4],
      [2, 1, 4, null, null, 3],
      [3, 1, 4, null, 2],
      [3, 2, 4, 1],
      [4, 1, null, null, 2, null, 3],
      [4, 1, null, null, 3, 2],
      [4, 2, null, 1, 3],
      [4, 3, null, 1, null, null, 2],
      [4, 3, null, 2, null, 1]
    ]
  },
  {
    input: [5],
    expect: [
      [1, null, 2, null, 3, null, 4, null, 5],
      [1, null, 2, null, 3, null, 5, 4],
      [1, null, 2, null, 4, 3, 5],
      [1, null, 2, null, 5, 3, null, null, 4],
      [1, null, 2, null, 5, 4, null, 3],
      [1, null, 3, 2, 4, null, null, null, 5],
      [1, null, 3, 2, 5, null, null, 4],
      [1, null, 4, 2, 5, null, 3],
      [1, null, 4, 3, 5, 2],
      [1, null, 5, 2, null, null, 3, null, 4],
      [1, null, 5, 2, null, null, 4, 3],
      [1, null, 5, 3, null, 2, 4],
      [1, null, 5, 4, null, 2, null, null, 3],
      [1, null, 5, 4, null, 3, null, 2],
      [2, 1, 3, null, null, null, 4, null, 5],
      [2, 1, 3, null, null, null, 5, 4],
      [2, 1, 4, null, null, 3, 5],
      [2, 1, 5, null, null, 3, null, null, 4],
      [2, 1, 5, null, null, 4, null, 3],
      [3, 1, 4, null, 2, null, 5],
      [3, 1, 5, null, 2, 4],
      [3, 2, 4, 1, null, null, 5],
      [3, 2, 5, 1, null, 4],
      [4, 1, 5, null, 2, null, null, null, 3],
      [4, 1, 5, null, 3, null, null, 2],
      [4, 2, 5, 1, 3],
      [4, 3, 5, 1, null, null, null, null, 2],
      [4, 3, 5, 2, null, null, null, 1],
      [5, 1, null, null, 2, null, 3, null, 4],
      [5, 1, null, null, 2, null, 4, 3],
      [5, 1, null, null, 3, 2, 4],
      [5, 1, null, null, 4, 2, null, null, 3],
      [5, 1, null, null, 4, 3, null, 2],
      [5, 2, null, 1, 3, null, null, null, 4],
      [5, 2, null, 1, 4, null, null, 3],
      [5, 3, null, 1, 4, null, 2],
      [5, 3, null, 2, 4, 1],
      [5, 4, null, 1, null, null, 2, null, 3],
      [5, 4, null, 1, null, null, 3, 2],
      [5, 4, null, 2, null, 1, 3],
      [5, 4, null, 3, null, 1, null, null, 2],
      [5, 4, null, 3, null, 2, null, 1]
    ]
  }
]
