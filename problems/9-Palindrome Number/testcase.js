module.exports = [
  {
    input: [0],
    expect: true
  },
  {
    input: [1234321],
    expect: true
  },
  {
    input: [12344321],
    expect: true
  },
  {
    input: [12345321],
    expect: false
  },
  {
    input: [-12321],
    expect: false
  },
  {
    input: [12345654321],
    expect: true
  },
  {
    input: [123456787654321],
    expect: false
  }
]
