<!--
 * @Author: 张宏亮
 * @Date: 2019-08-24 17:49:31
 * @LastEditors: 张宏亮<hongliang@yunshan.net>
 * @LastEditTime: 2019-08-24 17:49:31
 * @Description: file content
 * @Versions: 1.0.0
 -->

```js
class PriorityQueue {
  constructor() {
    this.data = [];
  }

  push(value, priority = 0) {
    return this.data.push({
      value: value,
      priority: priority
    });
  }

  pop() {
    let index = 0;
    let min = Infinity;
    for (let i = 0; i < this.data.length; i++) {
      let priority = this.data[i].priority;
      if (Math.min(min, priority) === priority) {
        min = priority;
        index = i;
      }
    }
    return this.data.splice(index, 1)[0].value;
  }

  size() {
    return this.data.length;
  }
}
```