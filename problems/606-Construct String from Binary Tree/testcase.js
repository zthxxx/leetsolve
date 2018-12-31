module.exports = [
  {
    input: [[1, 2, 3, 4]],
    expect: '1(2(4))(3)'
  },
  {
    input: [[1, 2, 3, null, 4]],
    expect: '1(2()(4))(3)'
  },
  {
    input: [[1, 2, 3, null, 4, 5, 6, 7, null, null, 8, 9]],
    expect: '1(2()(4(7)))(3(5()(8))(6(9)))'
  },
  {
    input: [[1, 2, null, 4, 5, 6, 7, null, null, 8, 9]],
    expect: '1(2(4(6(8)(9))(7))(5))'
  }
]
