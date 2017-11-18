module.exports = [
  {
    input: [[], []],
    expect: true
  },
  {
    input: [true, 3],
    expect: false
  },
  {
    input: [false, 4],
    expect: false
  },
  {
    input: [true, 5],
    expect: true
  },
  {
    input: [false, 6],
    expect: true
  }
]
