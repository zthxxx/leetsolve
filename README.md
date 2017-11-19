<h1 align="center"><a href="https://github.com/zthxxx/leetsolve" target="_blank">LeetSolve.js</a></h1>

[![Build Status](https://travis-ci.org/zthxxx/leetsolve.svg?branch=master)](https://travis-ci.org/zthxxx/leetsolve)
[![Maintainability](https://api.codeclimate.com/v1/badges/72768b68dd90d81e5dad/maintainability)](https://codeclimate.com/github/zthxxx/leetsolve/maintainability)
[![Node.js](https://img.shields.io/badge/node-8.x%20LTS-blue.svg)](https://nodejs.org/)
[![LeetCode](https://img.shields.io/badge/LeetCode-tancolat-ff69b4.svg)](https://leetcode.com/tancolat/)

:cake: simple & light testing frame for zthxxx's LeetCode solutions with JavaScript

## Feature

- easy to describe a problem and testcase

- lightweight testing frame which a bit like mocha

- using **multiprocessing**, speed up testcase

- canable to stop timeout testing with **infinite loop** (which mocha NOT support)

- also support hooks `beforEach` `before` `after` `afterEach`

- output reporters style adjust to like mocha spec


## Style preview

![testing-output-style](./docs/test-preview.png)


## Usage & Test

chone it, then run the test after you replaced solutions

```
git clone git@github.com:zthxxx/leetsolve.git && cd leetsolve
npm i
npm test
```

to define a problem, some examples you can see in `test/examples/`

A problem is a folder which named the problem's description, two files in it

```
problems/
│
└─ problem1-description/  # define problem 1
   │
   ├─ index.js            # solution file
   └─ testcase.js         # problem testcase file
```

### configure

you can also adjust problems path at `problemBase` and testcase file name at `casefile` in `config.js`

more options see [config.js](./config.js)


ok, come on, try out!


## Author

**LeetSolve** © [zthxxx](https://github.com/zthxxx), Released under the **[MIT](./LICENSE)** License.<br>

> Blog [@zthxxx](https://blog.zthxxx.com) · GitHub [@zthxxx](https://github.com/zthxxx) · Twitter [@tancolat](https://twitter.com/tancolat)
