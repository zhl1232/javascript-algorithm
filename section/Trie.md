<!--
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-12 17:20:40
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-12 20:24:44
 * @Description: file content
 * @Versions: 1.0.0
 -->

### Trie树的简介

> 又称单词查找树，Trie树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。

它的优点是：利用字符串的公共前缀来节约存储空间，最大限度地减少无谓的字符串比较，查询效率比哈希表高。

### Trie的数据结构特点
1. 根节点不包含字符，除根节点以外每个节点只包含一个字符。
2. 从根节点到某一个节点，路径上经过的字符连接起来，为该节点对应的字符串。
3. 每个节点的所有子节点包含的字符互不相同。

Trie的核心思想是空间换时间。利用字符串的公共前缀来降低查询时间的开销以达到提高效率的目的。

如图，根节点是root，没有存储任何字符，它的 key 为空，包含了一个子节点。

该树表示了关键字集合{“a”, “to”, “tea”, “ted”, “ten”, “i”, “in”, “inn”}

![image](https://raw.githubusercontent.com/zhl1232/javascript-algorithm/master/static/img/trie.jpg)


### Trie树的分析

上图是一颗 Trie树，而树中的每个节点则是TrieNode。

最顶端的是root节点，该节点为空，之后的每个节点均包含三个属性：
1. val：节点的值
2. children[]：指向子节点的指针，children的大小根据实际需求来定。例如如果我们要存的是单词，那么单词数最多只有26个，则设为children[26]即可，如果是数字，则设为children[10]，并不固定
3. flag：标志位，该属性后面会用到，不同场景下表示的意义不同。
--------------------- 

### JS代码实现
#### 一、定义数据结构
Trie有一个根节点root，它的key为null。
```js
/**
 * Trie
 */
function Trie() {
    this.root = new TrieNode(null);
}
```
TrieNode有两个属性，其中 key 代表一个字符，children 表示子节点。
```js
/**
 * 节点
 * @param {*} key 
 */
function TrieNode(key) {
    this.key = key; // 节点字符
    this.children = []; // 子节点集合，子节点可以用数组也可以用哈希
    // 有时候还需要一个标志位，比如存单词时，判断单词结束
}
```
#### 二、实现Trie的插入、查找、删除、输出

```js
Trie.prototype = {
    // 插入单词
    insertData:(stringData)=>void,
    insert:(stringData,node)=>void,
    // 查找单词
    search:(queryData)=>boolean,
    searchNext:(node,stringData)=>boolean, // 递归
    // 删除单词
    delete:(stringData)=>this,
    delNext:(parent, index, stringData, delStr)=>boolean, // 递归
    // 打印树上的所有单词
    printData:()=>void,
    printHelper:(node, data)=>void // 递归
}
```
#### 插入单词
1. 从根节点开始遍历树节点，将节点的key的值与字符串第一个字符比较；
2. 如果找到了字符，则截取剩余子字符串和当前节点继续递归；
3. 如果没有找到字符，则判断当前节点是否存在子节点，若不存在则直接插入，如果存在子节点，则遍历子节点取出字符与当前字符判断排序位置，最后在该位置插入节点；
4. 直到字符串最后一个字符，即可完成整个单词的插入。
```js
    insertData: function (stringData) {
        this.insert(stringData, this.root);
    },
    // 递归判断插入
    insert: function (stringData, node) {
        if (stringData == '') {
            return;
        }
        let children = node.children;
        let haveData = null;
        for (let i in children) {
            if (children[i].key == stringData[0]) {
                haveData = children[i];
            }
        }
        if (haveData) {
            this.insert(stringData.substring(1), haveData); //说明找到了对应的节点
        } else { //那如果没有找到则插入
            if (children.length == 0) { //当前节点没有子节点
                let node = new TrieNode(stringData[0]);
                children.push(node);
                this.insert(stringData.substring(1), node); //将该字符节点插入节点的children中
            } else { //当前节点存在子节点，需要查找一个合适的位置去插入新节点
                let validPosition = 0;
                for (let j in children) {
                    if (children[j].key < stringData[0]) {
                        validPosition++;
                    }
                }
                let node = new TrieNode(stringData[0]);
                children.splice(validPosition, 0, node);
                this.insert(stringData.substring(1), node); //将该字符节点插入节点的children中
            }
        }
    },
```
#### 查找单词，判断是否存在
遍历递归逻辑类似，请查看代码具体注释，需要注意的是调用递归函数时别忘了return 函数返回值。
```js
    // 查询字符串
    search: function (queryData) {
        if (queryData == '' || this.root.children.length == 0) {
            return false;
        }
        for (let i in this.root.children) {
            if (this.searchNext(this.root.children[i], queryData)) {
                return true;
            }
        }
        return false;
    },
    // 递归查询判断
    searchNext: function (node, stringData) {
        // 若字符与节点key不相等，则不匹配
        if (stringData[0] != node.key) {
            return false;
        } else { // 若与key相等，继续判断
            let children = node.children;
            if (children.length == 0 && stringData.length == 1) { // 叶子节点，最后一个字符，则完全匹配
                return true;
            } else if (children.length > 0 && stringData.length > 1) { // 既不是叶子节点，也不是最后一个字符，则继续递归查找
                for (let i in children) {
                    if (children[i].key == stringData[1]) {
                        return this.searchNext(children[i], stringData.substring(1)); // 记得return 递归函数，否则获取的返回值为undefined
                    }
                }
            } else { // C1：叶子节点，C2：最后一个字符；若只满足其中一个条件，则不匹配
                return false;
            }
        }
    },
```
#### 删除单词
遍历递归逻辑类似，先判断单词是否存在，不存在则不做处理。与查找、插入不同，删除需先找到单词，然后从单词字符串反向判断节点是否是叶子节点（如high，那么从h、g、i、h倒序遍历判断），如果是则删除，直到单词某个字符所处的节点是叶子节点为止。
```js
    // 删除字符串
    delete: function (stringData) {
        if (this.search(stringData)) { // 判断是否存在该单词（字符串）
            for (let i in this.root.children) {
                if (this.delNext(this.root, i, stringData, stringData)) {
                    return;
                }
            }
        }
        return this;
    },
    /**
     * 先递归查找到字符串的叶子节点，然后从字符串的叶子节点逐级向根节点递归删除叶子节点，直到删除字符串
     * @param parent 父节点
     * @param index 子节点在父节点children数组中的索引位置
     * @param stringData 递归遍历中的字符串
     * @param delStr 调用delete方法时的原始字符串
     */
    delNext: function (parent, index, stringData, delStr) {
        //当前节点对象
        let node = parent.children[index];
        // 若字符与节点key不相等，则不匹配
        if (stringData[0] != node.key) {
            return false;
        } else { // 若与key相等，继续判断
            let children = node.children;
            if (children.length == 0 && stringData.length == 1) { // 叶子节点，最后一个字符，则完全匹配
                // 删除叶子节点，利用父节点删除子节点原理
                parent.children.splice(index, 1);
                // 字符串从尾部移除一个字符后，继续遍历删除方法
                this.delete(delStr.substring(0, delStr.length - 1));
            } else if (children.length > 0 && stringData.length > 1) { // 既不是叶子节点，也不是最后一个字符，则继续递归查找
                for (let i in children) {
                    if (children[i].key == stringData[1]) {
                        return this.delNext(node, i, stringData.substring(1), delStr); // 记得return 递归函数，否则获取的返回值为undefined
                    }
                }
            }
        }
    },
```
#### 输出所有的单词
从根节点开始遍历，console.log输出所有单词。递归单个节点直到叶子节点，输出单词，注意data.pop()，递归完毕找到叶子节点后，此操作目的返回原始遍历节点继续遍历直到找到下一个单词为止。
```js
    // 打印字符串
    printData: function () {
        for (let i in this.root.children) {
            this.printHelper(this.root.children[i], [this.root.children[i].key]);
        }
    },
    // 递归输出字符串
    printHelper: function (node, data) {
        if (node.children.length == 0) {
            console.log('>', data.join(''));
            return;
        }
        for (let i in node.children) {
            data.push(node.children[i].key);
            this.printHelper(node.children[i], data);
            data.pop(); // 注意，找打一个单词后，返回下一个初始节点继续遍历
        }
    }
```
### 三、调试运行
命令行执行：node Trie.js，查看console输出结果：

```js
/**
 * 测试
 */
let trie = new Trie();

trie.insertData('我爱你');
trie.insertData('我爱你中国');
trie.insertData('我爱你宝贝');
trie.insertData('我爱你中原');
trie.insertData('爱你一万年');
trie.insertData('永远爱你');
trie.insertData('爱你真的好难');

trie.printData();

// console：
// > 我爱你中原
// > 我爱你中国
// > 我爱你宝贝
// > 永远爱你
// > 爱你一万年
// > 爱你真的好难

// console.log(trie.search('我爱你')); // false
// console.log(trie.search('我爱你中国')); // true
// console.log(trie.search('我爱你宝宝')); // false
// console.log(trie.search('我爱你宝贝')); // true

console.log(JSON.stringify(trie.delete('爱你真的好难')));
// 查看输出发现，单词已删除
```