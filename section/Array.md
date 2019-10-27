# 数组

与 Java 、PHP 等语言不同，在 JavaScript 中，数组其实是一种特殊的对象，是哈希结构，不是常规的数组结构。

下面文章的数组都是指数据结构，不是 JavaScript 里的“数组”。

**数组**是一种基本的数据结构，用于按**顺序**存储元素的集合。但是元素可以随机存取，因为数组中的每个元素都可以通过数组索引来识别。

数组存储数据时，会提前申请一整块足够大小的物理空间，然后将数据依次存储起来，存储时做到数据元素之间不留一丝缝隙。

例如，使用顺序表存储集合{1,2,3,4,5}，数据最终的存储状态如下所示：

![image](https://raw.githubusercontent.com/zhl1232/javascript-algorithm/master/static/img/array1.jpg)

数组具有固定的容量，我们需要在初始化时指定数组的大小。有时它会非常不方便并可能造成浪费。

因此，大多数编程语言都提供内置的动态数组，它仍然是一个随机存取的列表数据结构，但大小是可变的。例如，在 C++ 中的 vector，以及在 Java 中的 ArrayList。

数组的插入
在{1,2,3,4,5}的第 3 个位置上插入元素 6，实现过程如下：
- 遍历至顺序表存储第 3 个数据元素的位置

![image](https://raw.githubusercontent.com/zhl1232/javascript-algorithm/master/static/img/array2.jpg)

- 将元素 3 以及后续元素 4 和 5 整体向后移动一个位置

![image](https://raw.githubusercontent.com/zhl1232/javascript-algorithm/master/static/img/array3.jpg)

- 将新元素 6 放入腾出的位置

![image](https://raw.githubusercontent.com/zhl1232/javascript-algorithm/master/static/img/array4.jpg)

因为要保持数组数据的连续性，所以插入和删除都要操作目标位置后面的元素。

- 数组查找数据的时间复杂度是O(1)
- 插入和删除的时间复杂度是O(n)
- 如果插入最后面的位置的话，时间复杂度是O(1)，因为不用移动后面的元素。


经典的排序问题，二分搜索等等问题，其实都是在数组这种最基础的结构中处理的，下面主要介绍 LeetCode 中典型的数组类问题，主要介绍这类问题的一些常用解法：做好初始定、基础算法思想应用、对撞指针、滑动窗口法等。

数组的常用 API 还是需要熟悉的，[MDN-Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 做好初始定义

做数组类算法问题的时候，我们常常需要定义一个变量，明确该变量的定义，并且在书写整个逻辑的时候，要不停的维护住这个变量的意义。也特别需要注意初始值和边界的问题。


- [283. 移动零](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/283.md) 283里的方法二

- [27. 移除元素](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/27.md)

- [26. 删除排序数组中的重复项](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/26.md)

- [80. 删除排序数组中的重复项 II](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/80.md)

### 运用基础算法思想

典型的排序算法思想、二分查找思想的一些应用。

- [75. 颜色分类](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/75.md)

- 215. 数组中的第K个最大元素  占坑

### 双索引技巧 - 对撞指针

有一些 LeetCode 题目，我们可以采用对撞指针进行求解：指针 i 和 j 分别指向数组的第一个元素和最后一个元素，然后指针 i 不断向前， 指针 j 不断递减，直到 i = j（当然具体的逻辑操作根据题目的变化而变化）。

- [167. 两数之和 II - 输入有序数组](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/167.md)

- [125. 验证回文串](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/125.md)

- [345. 反转字符串中的元音字母](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/345.md)

- [11. 有效的括号](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/11.md)

### 双索引技巧 - 滑动窗口

一些题目用滑动窗口方法解题，可以将时间复杂度控制在 O(n) 级别，最重要的是定义好滑动窗口，明确它要表达的意思，当然边界和初始值非常重要。

[209. 长度最小的子数组](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/209.md)

### 总结

