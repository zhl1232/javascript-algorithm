# [TinyURL的加密与解密](https://leetcode-cn.com/problems/encode-and-decode-tinyurl/)

- 难度：Medium
- 标签：设计, 哈希表, 字符串, 哈希函数

###  短网址原理

当我们在浏览器里输入 http://tinyurl.com/4e9iAk 时

1. DNS首先解析获得 http://tinyurl.com 的 IP 地址
2. 当 DNS 获得 IP 地址以后（比如：74.125.225.72），会向这个地址发送 HTTP GET 请求，查询短码 4e9iAk
3. http://t.cn 服务器会通过短码 4e9iAk 获取对应的长 URL
4. 请求通过 HTTP 301 转到对应的长 URL https://leetcode.com/problems/design-tinyurl 。
> 301 是永久重定向，302 是临时重定向。短地址一经生成就不会变化，所以用 301 是符合 http 语义的。

### 短网址算法

这道题的标签是 哈希表，数学。哈希表不用说了，肯定得把短网址映射到长网址上。

数学 网上比较流行的短网址算法有两种 自增序列算法、 摘要算法。

这里我们用自增序列算法，比较好理解。

设置 id 自增，一个 10进制 id 对应一个 62进制的数值，1对1，也就不会出现重复的情况。这个利用的就是低进制转化为高进制时，字符数会减少的特性。

短址的长度一般设为 6 位，总共会有 64^6 ~= 687亿种组合，基本上不会重复。

```js
/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
let hash = new Map()
var encode = function(longUrl) {
    let chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~'.split(''),
        radix = chars.length,
        qutient = 10000000000,   
        arr = [];
    do {
        mod = qutient % radix;
        qutient = (qutient - mod) / radix;
        arr.unshift(chars[mod]);
    } while (qutient);
    hash.set(arr.join(''),longUrl)
    return 'http://tinyurl.com/' + arr.join('')
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function(shortUrl) {
    // var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~',
    //     radix = chars.length,
    //     number_code = String(number_code),
    //     len = number_code.length,
    //     i = 0,
    //     origin_number = 0;
    // while (i < len) {
    //     origin_number += Math.pow(radix, i++) * chars.indexOf(number_code.charAt(len - i) || 0);
    // }
    shortUrl = shortUrl.replace(/http:\/\/tinyurl\.com\//,'')
    return hash.get(shortUrl)
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
 ```

这种方法是设置一个 id ，然后对 id 进行编码，然后用编码后的 id 进行映射。

另一种摘要算法，是直接对 longUrl 编码。
