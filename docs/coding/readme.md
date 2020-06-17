# 1000 段代码计划

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
