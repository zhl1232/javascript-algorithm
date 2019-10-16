<!--
 * @Author: 张宏亮
 * @Date: 2019-09-22 09:10:45
 * @LastEditors: 张宏亮<hongliang@yunshan.net>
 * @LastEditTime: 2019-09-22 14:42:15
 * @Description: file content
 * @Versions: 1.0.0
 -->

**数据结构	栈**

 栈作为一种数据结构，是一种只能在一端进行插入和删除操作的特殊线性表。
 
 它按照**先进后出**的原则存储数据，先进入的数据被压入栈底，最后的数据在栈顶，需要读数据的时候从栈顶开始弹出数据（最后一个数据被第一个读出来）。

![image](https://raw.githubusercontent.com/zhl1232/javascript-algorithm/master/static/img/stack.png)

```js
export default class Stack {
  constructor() {
    this.count = 0
    this.items = {}
  }
  push(element) {
    this.items[this.count] = element
    this.count++
  }
  pop() {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }
  isEmpty() {
    return this.count === 0
  }
  size() {
    return this.count
  }
  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this.items = {}
    this.count = 0
  }
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

## 其他实现方法

上面的代码是用对象的方法实现的，还可以用其他数据结构现实。比如数组或者链表。

新手可能数组实现更容易理解。

[数组实现栈](https://github.com/zhl1232/javascript-algorithm/tree/master/section/StackArray.md)

[链表实现栈](https://github.com/zhl1232/javascript-algorithm/tree/master/section/StackLinkedList.md)


## 用栈解决问题

[155. 最小栈](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/155.md)

[20. 有效的括号](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/20.md)

[739. 每日温度](https://github.com/zhl1232/javascript-algorithm/tree/master/solve-problems/739.md)


## 下面属于进阶知识

在 js 里不管用对象还是数组模拟栈，都不能保护数据结构内部元素。

我们希望只有我们暴露出去的方法才能修改内部结构，对于栈来说，要确保元素只能被添加到栈顶。

```js
const stack = new Stack()
console.log( Object.getOwnPropertyNames(stack) )
console.log( Object.keys(stack) )
console.log( stack.items )
```

上面代码可以看到内部数据 count 和 items 都是公开的，items 也是可以直接访问和修改的。

这样就不能保证添加元素只会被添加到栈顶。


一种约定俗成的规定，是用下划线来标记一个属性为私有属性。
```js
class Stack{
  constructor() {
    this._count = 0
    this._items = {}
  }
}
```
不过这种方式只是一种约定，并不能保护数据，只能依赖开发者的具备常识。

用 weakMap 实现类

```js
const items = new WeakMap()
class Stack{
  constructor() {
    items.set(this, [])
  }
  push(element) {
    const s = items.get(this)
    s.push(element)
  }
  pop() {
    const s = items.get(this)
    const r = s.pop()
    return r
  }
  size() {
    const s = items.get(this)
    return s.length
  }
  // 其它方法
}
stack.push('12')
console.log(stack.size());   // 1
console.log(stack.items);  // undefined
console.log(stack.pop());    // '12'
console.log(stack.size());   // 0
```
这样 items 在 stack 里就是真正的私有属性了。不过这种方法扩展该类时无法继承私有属性。
