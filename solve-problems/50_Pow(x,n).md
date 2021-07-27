# [Pow(x,n)](https://leetcode-cn.com/problems/powx-n/)

- 难度：Medium
- 标签：递归, 数学
### 解法一：暴力法
时间复杂度O(n)

模拟计算过程

如果 n < 0 , n = -n, x = $\frac{1}{x}$

可以看示例3

不过这个会超时
```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if( n < 0) {
        x = 1 / x
        n = -n
    }
    let res = 1

    for(let i = 0; i < n; i++) {
        res *= x
    }
    return res
};
```
### 解法二：分治，二分
时间复杂度O(n log n)

数学，
1. 如果 n 为 0，那结果为 1
2. 如果 n 为 1，那结果为 x
3. 如果 n < 0, n = -n, x = $\frac{1}{x}$
4. 如果 n > 0，正常计算

算法，
1. 如果 n 是偶数位，那二分，结果就是 $x^\frac{n}{2} \times\ x^\frac{n}{2}$
2. 如果 n 是奇数位，那二分，结果就是 $x^\frac{n}{2} \times\ x^\frac{n}{2} \times\ x$
3. 比如 $2^4$ 就是 $2^2 \times\ 2^2$ ， $2^5$ 就是 $2^2 \times\ 2^2 \times\ 2$，
4. 一直二分递归到 n 为 1 或者 0


```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(n === 0) {
        return 1
    }
    if(n === 1) {
        return x
    }
    if(n < 0) {
        return myPow(1/x, -n)
    }
    let half = ~~(n/2)
    let temp = myPow(x, half)
    if(n % 2 === 0) {
        return temp * temp
    } else {
        return temp * temp * x
    }
};
```