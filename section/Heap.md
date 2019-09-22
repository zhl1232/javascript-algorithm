<!--
 * @File: 
 * @Author: 张宏亮 - 66020423@qq.com
 * @Date: 2019-08-25 16:04:22
 * @LastEditors: 张宏亮<66020423@qq.com>
 * @LastEditTime: 2019-08-25 16:56:50
 * @Description: file content
 * @Versions: 1.0.0
 -->
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

  buildMinHeap([1, 5, 7, 8, 9, 3])  // [1, 5, 3, 8, 9, 7]
```