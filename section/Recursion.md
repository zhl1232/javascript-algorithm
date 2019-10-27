> 递归是一种解决问题的有效方法，在计算机科学中是指一种通过重复将问题分解为同类的子问题而解决问题的方法，其核心思想是分治策略。

```js
(function printReverse(str) {
  printReverse(str)  //自己调用自己，就叫递归
})()
```
上面就是一个最简单的递归，但是有缺陷，一旦运行起来就会进入死循环

为了确保递归函数不会导致无限循环，它应具有以下属性：

1. 终止条件，一个简单的基本案例（basic case） —— 能够不使用递归来产生答案的终止方案。
2. 单次过程，一组规则，也称作递推关系（recurrence relation），可将所有其他情况拆分到基本案例。

正确的递归算法，一定要有 “归” 的步骤，也就是说递归算法，在分解问题到不能再分解的步骤时，要让递归有退出的条件，否则就会陷入死循环

看个例子：求阶乘

```js
function factrial(n) {
  if (n < 1) {
    console.log('拆分问题的最后一步，退出条件')
    return 1
  }
  console.log('f(' + n + ')=' + n + ' * f(' + (n - 1) + ')' + '  // 拆分问题')
  let res = n * factrial(n - 1)
  console.log('f(' + n + ')=' + res + '  // 子问题返回')
  return res
}
factrial(5)
```
```
  f(5)=5 * f(4)  // 拆分问题
  f(4)=4 * f(3)  // 拆分问题
  f(3)=3 * f(2)  // 拆分问题
  f(2)=2 * f(1)  // 拆分问题
  f(1)=1 * f(0)  // 拆分问题
  拆分问题的最后一步，退出条件
  f(1)=1  // 子问题返回
  f(2)=2  // 子问题返回
  f(3)=6  // 子问题返回
  f(4)=24  // 子问题返回
  f(5)=120  // 子问题返回
```

从例子能总结出递归需要关注的几个关键点：
1. 返回值，也就是子问题“归”的时候的返回
2. 单次的子问题，递归是重复做一样的事情，所以要拆分出来一样的子问题
3. 终止条件，无条件递归调用将会成为死循环而不能正常结束

#### 示例

让我们从一个简单的编程问题开始：

> 以相反的顺序打印字符串。

你可以使用迭代的办法轻而易举地解决这个问题，即从字符串的最后一个字符开始遍历字符串。但是如何递归地解决它呢？

首先，返回值是 index ，从 length - 1 一直到 0
其次，分解的子问题函数定义为 print(str[0...n-1])，其中 str[0] 表示字符串中的第一个字符，str[n-1] 表示字符串中的最后一个字符
最后，设置终止条件，即 index < 0

```js
let printReverse = function(str) {
  print(str.length - 1, str)
}

let print = function(index, str) {
  if (index >= 0) {
    console.log(str[index--])
    print(index, str)
  }
}

printReverse('abcdef')
```
### 递归原理

[344. 反转字符串](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/344.md)

[24. 两两交换链表中的节点](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/24.md)


### 递推关系

在实现递归函数之前，有两件重要的事情需要弄清楚:

- 递推关系： 一个问题的结果与其子问题的结果之间的关系。
- 基本情况: 不需要进一步的递归调用就可以直接计算答案的情况。 有时，基本案例也被称为 bottom cases，因为它们往往是问题被减少到最小规模的情况，也就是如果我们认为将问题划分为子问题是一种自上而下的方式的最下层。

> 一旦我们计算出以上两个元素，再想要实现一个递归函数，就只需要根据递推关系调用函数本身，直到其抵达基本情况。


[118. 杨辉三角](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/118.md)