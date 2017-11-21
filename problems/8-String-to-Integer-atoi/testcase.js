module.exports = [
  {
    input: ['12345'],
    expect: 12345
  },
  {
    input: ['54312'],
    expect: 54312
  },
  {
    input: [''],
    expect: 0
  },
  {
    input: ['    010'],
    expect: 10
  },
  {
    input: ['  00000001234'],
    expect: 1234
  },
  {
    input: ['  000000012 34'],
    expect: 12
  },
  {
    input: ['-'],
    expect: 0
  },
  {
    input: ['+'],
    expect: 0
  },
  {
    input: ['+147'],
    expect: 147
  },
  {
    input: ['21474836470'],
    expect: 2147483647
  },
  {
    input: ['-2147478'],
    expect: -2147478
  },
  {
    input: ['-214748364778'],
    expect: -2147483648
  },
  {
    input: ['1234dfae'],
    expect: 1234
  },
  {
    input: ['ee1234dfae'],
    expect: 0
  },
  {
    input: ['334.335'],
    expect: 334
  }
]
