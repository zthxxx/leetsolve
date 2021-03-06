module.exports = [
  {
    input: [
      [['a', 'b'], ['b', 'c']],
      [2.0, 3.0],
      [['a', 'c'], ['b', 'c'], ['a', 'e'], ['a', 'a'], ['x', 'x']]
    ],
    expect: [6, 3, -1, 1, -1]
  },
  {
    input: [
      [['a', 'b'], ['b', 'c'], ['e', 'x']],
      [2.0, 3.0, 2.5],
      [['a', 'c'], ['b', 'c'], ['e', 'b'], ['a', 'a'], ['x', 'x'], ['x', 'a']]
    ],
    expect: [6, 3, -1, 1, 1, -1]
  },
  {
    input: [
      [['a', 'b'], ['b', 'c'], ['e', 'x'], ['x', 'c']],
      [2.0, 3.0, 2.5, 3],
      [['a', 'c'], ['b', 'c'], ['e', 'b'], ['a', 'a'], ['x', 'x'], ['x', 'a']]
    ],
    expect: [6, 3, 2.5, 1, 1, 0.5]
  },
  {
    input: [
      [['a', 'b'], ['b', 'c'], ['f', 'g'], ['g', 'h']],
      [2.0, 3.0, 1.5, 2.5],
      [['a', 'c'], ['b', 'c'], ['e', 'b'], ['h', 'a'], ['b', 'g'], ['f', 'h']]
    ],
    expect: [6, 3, -1, -1, -1, 1.5 * 2.5]
  }
]
