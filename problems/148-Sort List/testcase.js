module.exports = [
  {
    input: [[3, 8, 9, 6, 7, 6, 5, 2, 6, 1, 2, 9]],
    expect: [1, 2, 2, 3, 5, 6, 6, 6, 7, 8, 9, 9]
  },
  {
    input: [[]],
    expect: []
  },
  {
    input: [[1]],
    expect: [1]
  },
  {
    input: [[3, 2, 1]],
    expect: [1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4, 5, 6]],
    expect: [1, 2, 3, 4, 5, 6]
  },
  {
    input: [[1, 2, 5, 4, 3, 6]],
    expect: [1, 2, 3, 4, 5, 6]
  },
  {
    input: [[3, 2, 1, 5, 4]],
    expect: [1, 2, 3, 4, 5]
  },
  {
    input: [new Array(1000).fill(3).concat(new Array(1000).fill(2)).concat(new Array(1000).fill(1))],
    expect: new Array(1000).fill(1).concat(new Array(1000).fill(2)).concat(new Array(1000).fill(3))
  },
  {
    input: [[3, 8, 9, 6, 7, 6, 5, 2, 6, 1, 2, 9]],
    expect: [1, 2, 2, 3, 5, 6, 6, 6, 7, 8, 9, 9]
  },
  {
    input: [[0, 2, 7, 6, 6, 2, 8, 4, 7, 1]],
    expect: [0, 1, 2, 2, 4, 6, 6, 7, 7, 8]
  }
]
