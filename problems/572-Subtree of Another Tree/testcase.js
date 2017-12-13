module.exports = [
  {
    input: [
      [1],
      [1]
    ],
    expect: true
  },
  {
    input: [
      [3, 4, 5, 1, 2],
      [4, 1, 2]
    ],
    expect: true
  },
  {
    input: [
      [3, 4, 5, 1, 2, null, null, 0],
      [4, 1, 2]
    ],
    expect: false
  },
  {
    input: [
      [3, 4, 5, 1, 2, null, null, 0],
      [4, 1, 2, 0]
    ],
    expect: true
  },
  {
    input: [
      [3, 4, 5, 1, 2, null, null, 0],
      [4, 1, 2, null, null, 0]
    ],
    expect: false
  },
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [3, 6, 7]
    ],
    expect: true
  },
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [2, 4, 5]
    ],
    expect: false
  },
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [2, 4, 5, 8]
    ],
    expect: true
  },
  {
    input: [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2
      ]
    ],
    expect: false
  },
  {
    input: [
      new Array(1000).fill(1),
      new Array(999).fill(1).concat([2])
    ],
    expect: false
  }
]
