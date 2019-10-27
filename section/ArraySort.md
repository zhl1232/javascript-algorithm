### 快速排序

**数据结构	不定**

**最坏时间复杂度	O(n^2)**

**最优时间复杂度  O(n log n)**

**平均时间复杂度	O(n log n)**

快速排序使用分治法（Divide and conquer）策略來把一個序列（list）分為较小和较大的2个子序列，然后递归地排序两个子序列。

1. 在数据集之中，选择一个元素作为"基准"（pivot）。
2. 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。


```js
  Array.prototype.quickSort = function() {
    const length = this.length
    if (length < 2) return this

    let basic = this[0],
      left = [],
      right = []

    for (let i = 1; i < length; i++) {
      const element = this[i];
      element < basic && left.push(element)
      element >= basic && right.push(element)
    }

    return left.quickSort().concat(basic, right.quickSort())
    
  }
  let arr = [1,23,6,7,4,7,6,3,24,8,8]
  console.log(arr.quickSort());
```

