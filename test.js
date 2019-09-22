/*
 * @Author: 张宏亮
 * @Date: 2019-09-22 13:05:14
 * @LastEditors: 张宏亮<hongliang@yunshan.net>
 * @LastEditTime: 2019-09-22 14:38:26
 * @Description: file content
 * @Versions: 1.0.0
 */
const items = new WeakMap()
export default class Stack {
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
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this._items[this.count - 1]
  }
  isEmpty() {
    return this.count === 0
  }
  size() {
    const s = items.get(this)
    return s.length
  }
  clear() {
    /* while (!this.isEmpty()) {
        this.pop();
      } */
    this._items = {}
    this.count = 0
  }
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this._items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this._items[i]}`
    }
    return objString
  }
}
