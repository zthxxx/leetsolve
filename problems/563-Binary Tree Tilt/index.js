require('../../libs/runDirect')
const TreeNode = require('../../libs/TreeNode')

/**
 * DFS 一边计算和，一边通过和的差计算 tilt
 * @param root
 * @return {*}
 */
function sumTilt (root) {
  if (!root) return [0, 0]
  let [leftTilt, leftSum] = sumTilt(root.left)
  let [rightTilt, rightSum] = sumTilt(root.right)
  let sum = leftSum + rightSum + root.val
  let tilt = leftSum - rightSum
  let tiltSum = leftTilt + rightTilt + (tilt < 0 ? -tilt : tilt)
  return [tiltSum, sum]
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
let findTilt = function (root) {
  return sumTilt(root)[0]
}

module.exports = findTilt

module.exports.before = levels => [TreeNode.gen(levels)]
