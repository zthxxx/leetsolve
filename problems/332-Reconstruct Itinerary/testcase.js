module.exports = [
  {
    input: [[['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]],
    expect: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC']
  },
  {
    input: [[['JFK', 'SFO'], ['JFK', 'ATL'], ['SFO', 'ATL'], ['ATL', 'JFK'], ['ATL', 'SFO']]],
    expect: ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO']
  },
  {
    input: [[['JFK', 'AAA'], ['AAA', 'BBB'], ['BBB', 'JFK'], ['JFK', 'BBB'], ['BBB', 'FFF'], ['FFF', 'JFK']]],
    expect: ['JFK', 'AAA', 'BBB', 'FFF', 'JFK', 'BBB', 'JFK']
  },
  {
    input: [[['JFK', 'AAA'], ['JFK', 'BBB'], ['BBB', 'FFF'], ['FFF', 'JFK']]],
    expect: ['JFK', 'BBB', 'FFF', 'JFK', 'AAA']
  },
  {
    input: [[['JFK', 'A'], ['JFK', 'D'], ['A', 'C'], ['B', 'C'], ['C', 'D'], ['C', 'JFK'], ['D', 'B'], ['D', 'A']]],
    expect: ['JFK', 'A', 'C', 'D', 'B', 'C', 'JFK', 'D', 'A']
  }
]
