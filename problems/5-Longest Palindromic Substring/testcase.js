module.exports = [
  {
    input: ['babad'],
    expect: 'bab'
  },
  {
    input: ['cbbd'],
    expect: 'bb'
  },
  {
    input: [''],
    expect: ''
  },
  {
    input: ['a'],
    expect: 'a'
  },
  {
    input: ['121'],
    expect: '121'
  },
  {
    input: ['ab1221'],
    expect: '1221'
  },
  {
    input: [new Array(1000).fill('a').join('')],
    expect: new Array(1000).fill('a').join('')
  },
  {
    input: [
      new Array(500).fill('a')
        .concat('bc')
        .concat(new Array(498).fill('a'))
        .join('')
    ],
    expect: new Array(500).fill('a').join('')
  }
]
