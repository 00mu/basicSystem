# 1000+ CODING 计划

## Math

### random 随机数

- 取一个 2~5 的随机数

::: details 查看代码

```JS
// floor 向下取整
// ceil 向上取整
// round 四舍五入

// 不包含最大值
function random(min, max){
  return Math.floor(Math.random()*(max-min)+min)
}

// 包含最大值
function randomMax(min, max){
  return Math.floor(Math.random()*(max-min + 1)+min)
}

console.log(random(2, 5))
console.log(randomMax(2, 5))
```

:::

## Array

### 数组转字符串

#### `.toString` 原型方法

::: details 查看代码

```JS
console.log([1,2,4].toString())
// 1,2,4
```

:::

#### `String` 内置函数

::: details 查看代码

```JS
console.log(String([1,2,4]))
// 1,2,4
```

:::

#### `join`连字符

::: details 查看代码

```JS
console.log([1,2,4].join(''))
// 124
console.log([1,2,4].join(','))
// 1,2,4
```

:::

### 类数组转换为数组

> 类数组指包含`length`属性或可迭代的对象

#### `split` 分割字符串，`join`的反向操作

::: details 查看代码

```JS
console.log("1,2,4".split(','))
// [1,2,4]
```

:::

#### `Array.from`

::: details 查看代码

```JS
console.log(Array.from('123'))
// ["1", "2", "3"]
```

:::

#### `Array.prototype.slice` 借用数组方法

::: details 查看代码

```JS
console.log([].slice.call("123"))
// [1,2,3]
```

:::

#### `...` 拓展符

::: details 查看代码

```JS
console.log([..."123"])
// [1,2,3]
```

:::

### 合并数组

#### `concat`

::: details 查看代码

```JS
[1,2,3].concat[4,5,6]
// [1, 2, 3, 4, 5, 6]
```

:::

#### `...` 拓展符

::: details 查看代码

```JS
[...[1,2,3],...[4,5,6]]
// [1, 2, 3, 4, 5, 6]
```

:::

### 查找元素

`indexOf` 返回下标
::: details 查看代码

```JS
[1,2,3].indexOf(2)
// 1
```

:::

`includes` 返回 `true`，不能查询引用类型
::: details 查看代码

```JS
[1,2,3].includes(2)
// true
```

:::

`find` 返回满足条件的第一个元素 or `undefined`
::: details 查看代码

```JS
[1,2,3].find(item=>item>1)
```

:::

`reduce`

## 节流、防抖

## call、apply、bind 函数

## promise

## 深拷贝

### JSON 版

```JS
const testData = {
  name: 'lilei',
  age: 28,
  habits: ['coding', 'hiking', 'running']
}
```

```JS
function jsonCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

jsonCopy(testData)
```

JSON 版的缺点在于不能拷贝方法、类（也是方法）、和正则

### 递归

```JS
function deepCopy(obj){
  // 拷贝对象是原始数据类型则直接拷贝
  if(typeof obj !== 'object' || obj === null){ // typeof null -> 'object'
    return obj
  }

  let copy = obj instanceof Array ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归
      copy[key] = deepCopy(obj[key])
    }
  }
}

deepCopy(testData)
```

比较简单的实现，边界情况怎么处理？Set、Map、weakSet、weakMap
