module.exports = [
  {
    input: ['aa', 'aa'],
    expect: true
  },
  {
    input: ['aaa', 'aa'],
    expect: false
  },
  {
    input: ['aa', 'a*'],
    expect: true
  },
  {
    input: ['aaa', 'a*a'],
    expect: true
  },
  {
    input: ['a', 'ab*'],
    expect: true
  },
  {
    input: ['ab', '.*'],
    expect: true
  },
  {
    input: ['aeb', 'a.b'],
    expect: true
  },
  {
    input: ['ab', 'a.b'],
    expect: false
  },
  {
    input: ['ab', 'a.*b'],
    expect: true
  },
  {
    input: ['aab', 'c*a*b*'],
    expect: true
  },
  {
    input: ['', ''],
    expect: true
  },
  {
    input: ['', '.*'],
    expect: true
  },
  {
    input: ['', 'c*c*'],
    expect: true
  },
  {
    input: ['abcd', 'd*'],
    expect: false
  },
  {
    input: ['a2345bc', 'a.*c'],
    expect: true
  },
  {
    input: ['a2345bce', 'a.*c'],
    expect: false
  },
  {
    input: ['a2345bce', 'a.*bc.*'],
    expect: true
  },
  {
    input: ['a2345bce', 'a.*cd.*'],
    expect: false
  },
  {
    input: ['ab12axxbc', 'ab.*a*bc'],
    expect: true
  }
]
