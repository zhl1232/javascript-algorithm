## 什么是二分查找
二分查找是计算机科学中最基本、最有用的算法之一。 它描述了在有序集合中搜索特定值的过程。

二分查找中使用的术语：

- 目标 Target —— 你要查找的值
- 索引 Index —— 你要查找的当前位置
- 左、右指示符 Left，Right —— 我们用来维持查找空间的指标
- 中间指示符 Mid —— 我们用来应用条件来确定我们应该向左查找还是向右查找的索引

## 如何工作

比如玩游戏猜一个物品价格是1-100的整数? 你每猜一次，我就会告诉你猜的大了还是小了。

先猜50，我说大了，你就知道价格肯定是1-49
再猜25，我又说大了，你就知道价格肯定是1-24

这样每次减半，直到猜中答案。


## 解法 leetcode 704

1. 选择数组中的中间数
2. 查找数与中间数对比，比中间数低，则去中间数左边的子数组中寻找；比中间数高，则去中间数右边的子数组中寻找；相等则返回查找成功
3. 重复上一步，直到查找成功或失败

```js
var search = function (nums, target) {
  if (nums.length === 1 && nums[0] === target) {
    return 0
  }
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = ~~((right + left) / 2)
    if (target === nums[mid]) {
      return mid
    } else if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    }
  }
  return -1
};
```


## 如何识别二分查找？

二分查找也称折半查找算法，是一种每次比较之后将查找空间一分为二的算法。

**该算法要求必须为已排序数组**

二分查找一般由三个主要部分组成：

- 预处理 —— 如果集合未排序，则进行排序。

- 二分查找 —— 使用循环或递归在每次比较后将查找空间划分为两半。

- 后处理 —— 在剩余空间中确定可行的候选者。


## 3个二分查找模板

在研究了数百个二分查找问题之后，我们找到了三个主要的二分查找模板。

## 模板一

```js
var search = function (nums, target) {
  if (nums.length === 1 && nums[0] === target) {
    return 0
  }
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = ~~((right + left) / 2)
    if (target === nums[mid]) {
      return mid
    } else if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    }
  }
  return -1
};
```

### 关键属性
- 二分查找的最基础和最基本的形式。
- 查找条件可以在不与元素的两侧进行比较的情况下确定（或使用它周围的特定元素）。
- 不需要后处理，因为每一步中，你都在检查是否找到了元素。如果到达末尾，则知道未找到该元素

### 区分语法

- 初始条件：left = 0, right = length-1
- 终止：left > right
- 向左查找：right = mid-1
- 向右查找：left = mid+1

### leetcode69 x的平方根

```js
var mySqrt = function(x) {
    var left = 1;
    var right = Math.floor(x / 2) + 1;
    var mid;

    while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (mid * mid > x) {
      right = mid - 1;
    } else if (mid * mid < x) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return right;
};
```

### leetcode374. 猜数字大小

```js
var guessNumber = function(n) {
  let left = 1, right = n, mid
  while (left <= right) {
    mid = ~~((left + right)/2)
    let res = guess(mid)
    if (res === 0) {
      break
    } else if (res === 1) {
      left = mid + 1
    } else if (res === -1) {
      right = mid - 1
    }
  }
  return mid
};
```

### leetcode33. 搜索旋转排序数组
我们来举几个例子看看如何简化这个条件。

1. 原始排序数组[1,2,3,4,5,6,7]旋转后，它可能是像
- [3,4,5,6,7,1,2]
- [6,7,1,2,3,4,5,6,5]
- [1,2,3,4,5,6,7]<-旋转并以相同的结果结束，等等…

2. 当使用mid索引将旋转的数组分成两半时，至少有一个子数组始终保持排序。
- [3, 4, 5, 6, 7, 1, 2] ->[3, 4, 5][6, 7, 1, 2]左侧保持有序
- [6, 7, 1, 2, 3, 4, 5] ->[6, 7, 1][2, 3, 4, 5]右边保持有序
- [1, 2, 3, 4, 5, 6, 7] ->[1, 2, 3][4, 5, 6, 7]两边保持有序。

3. 如果你知道一边是有序的，剩下的逻辑就变得很简单了。如果一边是排序的，检查目标是否在边界内，否则它在另一边。


```js
var search = function(nums, target) {
  let left = 0, right = nums.length - 1;
    
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        // target is in the left
        right = mid - 1;
      } else {
        // target is in the right
        left = mid + 1;
      }
    } else {
      if (nums[mid] <= target && target <= nums[right]) {
        // target is in the right
        left = mid + 1;
      } else {
        // target is in the left
        right = mid - 1;
      }
    }
  }
  return -1;
};
```

## 模板二


### 关键属性

- 一种实现二分查找的高级方法。
- 查找条件需要访问元素的直接右邻居。
- 使用元素的右邻居来确定是否满足条件，并决定是向左还是向右。
- 保证查找空间在每一步中至少有 2 个元素。
- 需要进行后处理。 当你剩下 1 个元素时，循环 / 递归结束。 需要评估剩余元素是否符合条件。
 

### 区分语法

- 初始条件：left = 0, right = length
- 终止：left == right
- 向左查找：right = mid
- 向右查找：left = mid+1


### leetcode 278. 第一个错误的版本

这道题有两个点

1. 计算中位数时不能用 (left + right) / 2，因为会超过最大安全数，溢出。文章最下面有补充。
2. 如果当前找到的版本为错误的，那么错误的第一个版本可能是当前值也可能是左边。

用模板一，会多一次计算。

```js
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */

  return (n) => {
    let left = 1, right = n;
    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  };
};
```
用模板二

```js
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */

  return (n) => {
    let left = 1, right = n;
    while (left < right) {
      const mid = Math.floor(left + (right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1
      }
    }
    return left;
  };
};
```


### leetcode 162. 寻找峰值

这题很奇怪，总感觉理解起来费劲。

条件： 你可以假设 nums[-1] = nums[n] = -∞

所以左右两边怎么最少都会有一个峰值，也可能左右两边是同一个。

当前比右边小，那么肯定在右边会有峰顶，最差情况走到头，也是一个峰顶； 如果当前比左边小，那么肯定在左边会有峰顶，最差情况一路走到头，也是一个峰顶。

```js
var findPeakElement = function(nums) {
  let left = 0, right = nums.length - 1, mid
  while (left < right) {
    mid = left + Math.floor((right - left) / 2)
    if (nums[mid] > nums[mid + 1]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
};
```

### leetcode 153. 寻找旋转排序数组中的最小值

第一版思路，
1. 分成两边以后，肯定有一边是排序的
2. 排序的小值和未排序的两端值比较，确定目标值在哪边
3. 移动指针缩小范围，直到找到结果

```js
var findMin = function(nums) {
  let left = 0, right = nums.length - 1, mid
  while(left < right) {
    mid = left + Math.floor((right - left) / 2)
    if (nums[mid] > nums[left]) {
      // 左边是排序的
      if(nums[left] < Math.min(nums[mid + 1], nums[right])) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      // 右边是排序的
      if(nums[mid + 1] < Math.min(nums[left], nums[mid])) {
        left = mid + 1
      } else {
        right = mid
      }
    }
  }
  return nums[left]
};
```

第二版思路

1. 如果数组没有被旋转，是升序排列，就满足 last element > first element
2. 如果数组旋转过了，那会有一个变化点，就是原数组 last element 连接 first element的地方
3. 变化点的特点，所有变化点左侧元素 > 现数组第一个元素，所有变化点右侧元素 < 现数组第一个元素

```js
var findMin = function(nums) {
  let left = 0, right = nums.length - 1, mid
  while(left < right) {
    mid = left + Math.floor((right - left) / 2)
    if (nums[mid] > nums[right]) {
      // 旋转过的数组，原数组中间肯定小于右边。
      // 所以左边肯定没有最小的，左指标移动到 mid + 1
      left = mid + 1
    } else {
      // 左右指针间是 sorted 数组，移动右指针
      right = mid
    }
  }
  return nums[left]
};
```

## 模板三


### 关键属性

- 实现二分查找的另一种方法。
- 搜索条件需要访问元素的直接左右邻居。
- 使用元素的邻居来确定它是向右还是向左。
- 保证查找空间在每个步骤中至少有 3 个元素。
- 需要进行后处理。 当剩下 2 个元素时，循环 / 递归结束。 需要评估其余元素是否符合条件。
 

### 区分语法

- 初始条件：left = 0, right = length-1
- 终止：left + 1 == right
- 向左查找：right = mid
- 向右查找：left = mid



### leetcode 34.在排序数组中查找元素的第一个和最后一个位置

加了个可视化的展示。

1. 二分查找
2. 找不到, 也就是 low > high 返回 [-1, -1]
3. 找到目标值, 将low, high两个指针都设为目标下标
4. low往前, high往后, 直到找到和目标值不同为止 


![leetcode34.gif](https://pic.leetcode-cn.com/1599288586-pCxufZ-leetcode34.gif)


```js
function searchRange (nums, target) {
  let low = 0
  let high = nums.length - 1
  while (low <= high) {
    let mid = ~~((low + high) / 2)
    if (target === nums[mid]) {
      low = mid
      high = mid
      break
    }
    if (target < nums[mid]) {
      high = mid - 1
    } else if (target > nums[mid]) {
      low = mid + 1
    }
  }
  if (low > high) {
    return [-1, -1]
  } else {
    while (nums[low - 1] === target) low--
    while (nums[high + 1] === target) high++
    return [low, high]
  }
};
```

### leetcode 658. 找到 K 个最接近的元素

### 解法一：堆栈的双指针

和标签不一致的一次遍历

- 时间复杂度:O(N - K)
- 空间复杂度:O (1)

在arr的长度超过k时，迭代地从数组的前端和末端去除与x相差较大的元素。(如果有相同的差异，从末尾删除一个元素)

```js
var findClosestElements = function(arr, k, x) {
  let idx = 0;
  while (k < arr.length - idx) {
    const last = arr.pop();
    if (last - x < x - arr[idx]) {
      idx++;
      arr.push(last);
    }
  }
  return arr.slice(idx);
};
```
### 解法二：二分查找

- 时间复杂度:O(log N)
- 空间复杂度:O (1)

把 mid 看成结果的起始下标，判断是否正确。

如果 arr[mid + k] 位置的差值比 arr[mid] 位置的差值小，那说明起始值比 mid 大。因为假设返回值窗口取的值是mid 到 [mid + k]，是 k + 1 的长度，不是 k 的长度。

反之起始值肯定是mid或者在mid左边。


1. 目的找到结果数组的起始下标
2. 如果 x - arr[mid] > arr[mid + k] - x ，那么起始值肯定在mid右边
3. 反之起始值肯定是 mid 或者在 mid 左边
4. 返回起始值到 k-1 个元素


```js
var findClosestElements = function(arr, k, x) {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    x - arr[mid] > arr[mid + k]- x ? low = mid + 1 : high = mid;
  }
  return arr.slice(low, low + k);
};
```

## 中位数补充

1. 取 mid 时都是 (left + right) / 2 ，然后取整

2. 但如果 left 和 right 很大的时候，会超过最大安全数，会溢出

3. 所以一般写成 mid = left + (right - left) / 2

4. mid = (left + right) >>> 1, 无符号右移和上面代码中出写的按位取反之类的位运算，最好不要在工作代码中出现。不是有问题，是可读性差。别人可能不知道你写的是啥。- -