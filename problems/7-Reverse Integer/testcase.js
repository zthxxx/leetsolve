module.exports = [
  {
    input: [123],
    expect: 321
  },
  {
    input: [-123],
    expect: -321
  },
  {
    input: [120],
    expect: 21
  },
  {
    input: [12300],
    expect: 321
  },
  {
    input: [-1357900],
    expect: -97531
  },
  {
    input: [-120],
    expect: -21
  },
  {
    input: [2147483648],
    expect: 0
  },
  {
    input: [1563847412],
    expect: 0
  },
  {
    input: [2147447412],
    expect: 2147447412
  }
]
