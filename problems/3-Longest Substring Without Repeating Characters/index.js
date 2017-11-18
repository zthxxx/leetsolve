/**
 * 类似双指针法，一个指针往后遍历，一个指针指向最后不重复的位置
 * 遍历一个位置就更新一次最大长度
 * 用 map 存一下每个字符对应的位置，hash 判读是否重复
 * 后面遇到重复的时候就把最后不重复位置
 * 之前存的字符都删掉
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
  let length = 0
  let delIndex = 0
  let map = new Map()
  for (let [index, chr] of Object.entries(s)) {
    if (map.has(chr)) {
      let last = map.get(chr)
      for (; delIndex <= last; delIndex++) {
        map.delete(s[delIndex])
      }
    }
    map.set(chr, index)
    let size = map.size
    length = size > length ? size : length
  }
  return length
}

module.exports = lengthOfLongestSubstring
