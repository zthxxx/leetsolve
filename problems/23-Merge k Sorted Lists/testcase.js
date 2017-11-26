function shuffle (list) {
  for (let i = list.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]]
  }
  return list
}


function getExtreInput (count = 100) {
  let list = []
  for (let i = 0; i < count; i++) {
    list = list.concat(new Array(count).fill(i))
  }
  return list
}

let extreInput = getExtreInput()

module.exports = [
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
    ],
    expect: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    input: [
      []
    ],
    expect: []
  },
  {
    input: [
      [
        []
      ]
    ],
    expect: []
  },
  {
    input: [
      [
        [], [], []
      ]
    ],
    expect: []
  },
  {
    input: [
      [
        [1]
      ]
    ],
    expect: [1]
  },
  {
    input: [
      [
        [1],
        [1]
      ]
    ],
    expect: [1, 1]
  },
  {
    input: [
      [
        [1],
        [0]
      ]
    ],
    expect: [0, 1]
  },
  {
    input: [
      [
        [1, 4, 7, 10],
        [2, 5, 8, 13],
        [3, 6, 9, 11, 12]
      ]
    ],
    expect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  },
  {
    input: [
      shuffle(extreInput.map(item => [item]))
    ],
    expect: extreInput
  }
]
