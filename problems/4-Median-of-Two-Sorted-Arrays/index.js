/**
 * 暴力解法 O((m+n)log(m+n))
 * 因为两数组本身有序，所以可以先排序再求中位数
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let merge = [...nums1, ...nums2].sort((a, b) => a - b);
    if (!merge.length) return 0;
    if (merge.length % 2) {
        return merge[~~(merge.length / 2)];
    } else {
        let midRight = merge.length / 2;
        return (merge[midRight - 1] + merge[midRight]) / 2;
    }
};


/**
 * 双指针法 O(m+n)
 * 先计算出中位数应有下标的左偏置一位，再用两个指针指向两个数组依次前进
 * 找到下标后，如果总长度为奇数，那就下标后一个数为中位数
 * 如果总长度是偶数，那就下边与下标后一个的平均数为中位数
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let length = nums1.length + nums2.length;
    if (!length) return 0;
    let middleLeft = ~~(length / 2) - 1;
    let lastIndex1 = nums1.length - 1;
    let lastIndex2 = nums2.length - 1;
    let i = -1;
    let j = -1;

    while (i + j + 1 < middleLeft) {
        if (i < lastIndex1 && j < lastIndex2) {
            if (nums1[i + 1] <= nums2[j + 1]) i++;
            else j++
        } else {
            i = i < lastIndex1 ? middleLeft - 1 - j : i;
            j = j < lastIndex2 ? middleLeft - 1 - i : j;
        }
    }
    let minNext = Math.min(nums1[i + 1] || Infinity, nums2[j + 1] || Infinity);
    if (length % 2) {
        return minNext;
    } else {
        let middle = Math.max(nums1[i] || 0, nums2[j] || 0);
        return (middle + minNext) / 2;
    }
};


/**
 * 二分切割法 O(log(m+n))
 * 两个数组分别切割，满足包括切点在内的左侧共 w 个元素
 * 切点始终落在数之间
 * 记两个切点左端点的下标为 c1, c2，
 * w = (c1 + 1) + (c2 + 1) = length / 2 + length % 2 = (length + 1) / 2
 * 两数组合并为一个数组后，记中位数下标为 k，若中长为偶数，k 取中间两数中左边那个数的下标
 * k = length / 2 - (length + 1) % 2 = (length - 1) / 2
 * 二分调整让切点左右区间相交，即 L1<=R2 && L2<=R1
 * 此时中位数应为两个左端点中较大的那个数 （奇数情况）
 * 即第 k 个元素为 Max(L1,L2)
 * 偶数情况时，中位数应为四个端点顺序后的中间两个，也就是较大的左端点和较小的有端点
 * 即 (Max(L1, L2) + Min(R1, R2)) / 2
 * 由上公式可得：
 * 无论奇偶如何，有 c1 + c2 + 2 = k + 1
 * 即 c1 + c2 + 1 = k
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let n = nums1.length;
    let m = nums2.length;
    if (n > m) return findMedianSortedArrays(nums2, nums1);
    let total = n + m;
    if (!total) return 0;
    let k = ~~((total - 1) / 2);
    let low = -1;
    let high = n;
    while (low <= high) {
        let cutL1 = Math.floor((high + low) / 2);
        let cutR1 = cutL1 + 1;
        let cutL2 = k - cutL1 - 1;
        let cutR2 = cutL2 + 1;

        let L1 = cutL1 <= -1 ? -Infinity : nums1[cutL1];
        let R1 = cutR1 >= n ? Infinity : nums1[cutR1];
        let L2 = cutL2 <= -1 ? -Infinity : nums2[cutL2];
        let R2 = cutR2 >= m ? Infinity : nums2[cutR2];

        if (L1 > R2) high = cutL1;
        else if (L2 > R1) low = cutR1;
        else {
            let left = Math.max(L1, L2);
            let right = Math.min(R1, R2);
            return total % 2 ? left : (left + right) / 2;
        }
    }
};

module.exports = findMedianSortedArrays;
