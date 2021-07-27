# [二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

- 难度：Medium
- 标签：数组, 二分查找, 分治, 矩阵

## 刷题思路

- [ ] xx
- [ ] xx

### 方法 1


```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) { return false }
  let x = 0
  let y = matrix[0].length - 1
  while(x < matrix.length && y >= 0) {
    if (matrix[x][y] === target) {
      return true
    } else if (matrix[x][y] > target) {
      y--
    } else if (matrix[x][y] < target) {
      x++
    }
  }
  return false
};
```
