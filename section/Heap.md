大顶堆
```js
  var len // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
  function buildMaxHeap(arr) {
    // 建立大顶堆
    len = arr.length
    for (var i = Math.floor(len / 2); i >= 0; i--) {
      heapify(arr, i)
    }
    console.log(arr)
  }

  function heapify(arr, i) {
    // 堆调整
    var left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i

    if (left < len && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < len && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest != i) {
      swap(arr, i, largest)
      // 每一次对一个非叶 子结点做调整后，都要观察是否会影响子堆顺序！
      heapify(arr, largest)  
    }
  }

  function swap(arr, i, j) {
    [arr[i],arr[j]] = [arr[j],arr[i]]
  }

  buildMaxHeap([1, 5, 7, 8, 9, 3])   // [9, 8, 7, 1, 5, 3]
```



小顶堆
```js
  var len // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
  function buildMinHeap(arr) {
    // 建立小顶堆
    len = arr.length
    for (var i = Math.floor(len / 2); i >= 0; i--) {
      heapify(arr, i)
    }
    return arr
  }

  function heapify(arr, i) {
    // 堆调整
    var left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i

    if (left < len && arr[left] < arr[largest]) {
      largest = left
    }

    if (right < len && arr[right] < arr[largest]) {
      largest = right
    }

    if (largest != i) {
      swap(arr, i, largest)
      // 每一次对一个非叶 子结点做调整后，都要观察是否会影响子堆顺序！
      heapify(arr, largest)  
    }
  }

  function swap(arr, i, j) {
    [arr[i],arr[j]] = [arr[j],arr[i]]
  }

  function insert(arr, key) {
    arr.push(key)
    // 获取存储位置
    let i = arr.length-1 
    while (i/2 > 0 && arr[i] < arr[i/2]) {  
      swap(arr, i, i/2); // 交换 
      i = i/2; 
    }
  }
  buildMinHeap([1, 5, 7, 8, 9, 3])  // [1, 5, 3, 8, 9, 7]
```

封装版本

```js
export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

export function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a)
}

export function swap(arr, i, j) {
  // [arr[i],arr[j]] = [arr[j],arr[i]]
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[j] ^ arr[i]
  arr[i] = arr[i] ^ arr[j]
}

export class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  getRightIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() <= 0;
  }
  clear() {
    this.heap = [];
  }
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  insert(value) {
    if (value != null) {
      const index = this.heap.length;
      this.heap.push(value);
      this.siftUp(index);
      return true;
    }
    return false;
  }
  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) ===
      Compare.BIGGER_THAN
    ) {
      element = left;
    }
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) ===
      Compare.BIGGER_THAN
    ) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) ===
      Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return removedValue;
  }
  heapify(array) {
    if (array) {
      this.heap = array;
    }
    const maxIndex = Math.floor(this.size() / 2) - 1;
    for (let i = 0; i <= maxIndex; i++) {
      this.siftDown(i);
    }
    return this.heap;
  }
  getAsArray() {
    return this.heap;
  }
}
export class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.compareFn = reverseCompare(compareFn);
  }
}
```