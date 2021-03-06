module.exports = [
  {
    input: [
      [
        ['1', '0', '1', '0', '0'],
        ['1', '1', '1', '1', '1'],
        ['1', '1', '1', '1', '1'],
        ['1', '1', '1', '1', ''],
      ],
    ],
    expect: 9,
  },
  {
    input: [
      [
        ['1', '0', '1', '0', '0'],
        ['1', '0', '1', '1', '1'],
        ['1', '1', '1', '1', '1'],
        ['1', '0', '0', '1', '0'],
      ],
    ],
    expect: 4,
  },
  {
    input: [
      [
        ['1', '0', '0', '0'],
        ['0', '1', '1', '0'],
        ['1', '1', '1', '0'],
        ['1', '0', '0', '1'],
      ],
    ],
    expect: 4,
  },
  {
    input: [
      [
        ['0', '0', '0', '0'],
        ['0', '1', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
      ],
    ],
    expect: 1,
  },
  {
    input: [
      [
        ['1'],
      ],
    ],
    expect: 1,
  },
  {
    input: [
      [],
    ],
    expect: 0,
  },
]
