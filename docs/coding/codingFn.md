# 高频函数

[题目 1](https://juejin.im/post/5d51e16d6fb9a06ae17d6bbc)

## 模拟 Object.create

> Object.create() 方法，创建一个新对象，使用现有对象提供新对象的原型。

::: details 查看代码

```JS
function _Create(Obj){
  // function newFn(){};
  // newFn.__proto__ = Foo;
  // return newFn;

  const newObj = {};
  newObj.__proto__ = Obj;
  return newObj;
}

_Create({name: 'bobo', show(){console.log(this.name)}})
```

:::

## 模拟 new

> new 运算符，创建一个构造函数的实例。

new 关键字进行以下操作：

1. 创建一个对象
2. 设置对象的构造函数为指定对象
3. 将创建的对象作为指定对象 this 的上下文
4. 如果没有返回对象，则返回 this

::: details 查看代码
实现：

```JS
function _new(Fn, ...args) {
  // 1.
  const obj = {};
  // 2.
  // obj.constructor = Fn; // 这么写是不行的，相当于给obj添加了属性
  obj.__proto__ = Fn.prototype;
  // 上面两步合并为一步
  // obj.__proto__ = Object.create(Fn.prototype)
  // 3.
  const result = Fn.apply(obj, args);
  // 4
  return typeof result  === 'object' ? result : obj;
}
```

验证：

```JS
// 使用 返回的是一个对象
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// new 关键字
new Person('zhoubo', 28)
// 模拟new函数
const child = _new(Person, 'zhoubo', 28)
console.dir(child)

// 返回不是一个对象，就返回this
function Person2(name, age) {
  this.name = name;
  this.age = age;
  return 'hello'
}
const child = _new(Person2, 'zhoubo', 28)
```

:::

## 实现 call

> call 函数原型上的方法，Function.prototype.call(this, arg1, arg2...)。
> 指定一个 this，和若干参数来调用一个函数。简单讲，你想实现目的但是没有工具就借用了别人的工具达成结果。

::: details 查看代码

举例：将一个字符串换个拼接形式，需要借用数组的 join 方法，我们就这么写

```JS
Array.prototype.join.call('123456', '-')
// "1-2-3-4-5-6"
// 原型链调用 [].join.call('123456', '-') 效果等同
```

实现：

```JS{5}
Function.prototype._call = function(context, ...args){
  // 原理：将要借用的函数作为自己的一个方法，运行这个方法；
  // _call作为函数原型的方法，所有函数都可以使用；context是最终函数运行的上下文，也就是借用者
  // 1. context如果为null、undefined或着没传，context 指向window，因为这几个没法添加属性
  // 并且context如果原始类型，是不能添加属性的，so...转换为对象
  context = Object(context) || windows;
  // 2. 这里的this是调用_call方法的函数对象，作为借用者的一个属性
  // context.fn = this;
  // 这里可以进一步优化，fn是有可能和this的属性重复的，使用Symbol
  const fn = Symbol();
  context[fn] = this;
  // 3. 传入参数，调用它，展开符接受了剩余参数
  const foo = context[fn](...args)
  // 4. 调用完毕，删除fn属性
  delete foo[fn];
  // 5. 把结果返回
  return foo
}
```

验证：

```JS
[].join._call('123456', '-')
```

不足的是： 这里我们使用了 ES6 语法的展开符降维操作了，不过手写的意义是理解 call 的原理。

补充：`...` 展开符的用法有二：

1. 收，接受函数参数
2. 放，将类函数转为数组

```JS
console.log([..."123"]) // ['1','2','3']
console.log([...new Set([1,2,3,3,3,4])]) // 数组去重 [1, 2, 3, 4]
```

:::

## 实现 apply

> apply 的运行和 apply 函数一致，唯一不同在于以数组的形式传递 函数所需 的参数

::: details 查看代码

```JS
Function.prototype._apply = function(context, args){
  context = Object(context) || windows;
  const fn = Symbol();
  context[fn] = this;
  // 与call唯一不同，数组形式传参
  const foo = context[fn](...args)
  delete foo[fn];
  return foo
}
```

验证：

```JS
[].join._apply('123456', ['-'])
```

:::

## 实现 bind

> bind() 方法，创建一个新的函数，新函数的 this 被指定为 bind()的第一个参数，其余参数作为新函数的参数供调用时调用。

分析：

1. bind 与 call、apply 不同，接受参数的同时返回的是一个新函数
2. 新函数可以继续接受参数
3. 新函数可以作为构造函数

::: details 查看代码
原版 bind() 函数

```JS
const name = '我会做加法：';
function add(a,b){
  return this.name + (a + b)
}
const obj = {
  name: '我不会加法，我也变成一个会做加法的人：'
}
const newAdd = add.bind(obj, 1, 2);
newAdd() //我不会加法，我也变成一个会做加法的人：3

const newAdd2 = add.bind(obj, 3);
newAdd2(4) //我不会加法，我也变成一个会做加法的人：7
```

简单版 1.0

```JS
Function.prototype._call = function(context, ...args){
  const self = this;
  return this.call(context, ...args)
}
```

不足在于，无法进一步传参，return 一个函数接受参数，继续改造 2.0

```JS
Function.prototype._bind = function(context,...args) {
  const self = this;
  return function (...res) {
    // 固定this，作为新函数的调用this指向新的对象
    return self.call(context, ...args, ...res)
  }
}
```

bind 返回的新函数还可以作为构造函数 使用 new 关键字，实例可以继承绑定函数原型中的属性。继续改造 3.0

```JS
Function.prototype._bind = function(context,...args) {
  const self = this;
  const result = function (...res) {
    // 如果作为实例，this指向自身；如果作为普通函数，this还是指向context
    return self.call(this instanceof result ? this : context, ...args, ...res)
  }
  // 实例的__proto__指向this.prototype
  result.prototype = this.prototype;
  // 这样是不行的，如果直接修改result.prototype属性也会影响绑定函数原型对象
  // 新建一个空函数来承接
  return result;
}

```

整理下，最终版

```JS
Function.prototype._bind = function(context, ...args){
  const self = this;
  const Fn = function () {};
  Fn.__proto__ = this.prototype;
  const result = function(...res) {
    return self.call(this instanceof result ? this : context, ...args, ...res)
  }
  result.__proto__ = this.prototype;
  return result;
}
```

:::

## 实现类的继承

## 实现防抖函数（debounce）

## 实现节流函数（throttle）

## 深拷贝（deepclone）

## 实现 Event(event bus)

## 实现 instanceOf

## 实现 JSON.parse

## 实现 Promise

## 解析 URL Params 为对象

## 模板引擎实现

## 转化为驼峰命名

## 查找字符串中出现最多的字符和个数

## 字符串查找

## 实现千位分隔符

## 判断是否是电话号码

## 验证是否是邮箱

## 验证是否是身份证

[题目 2](https://juejin.im/post/5e77888ff265da57187c7278)

## 手写原生 Ajax Fetch

## 手写 jsonp 的实现原理

## Symbol 的用法以及常见应用

## 函数柯里化

## JS 数组花式操作

## 数组去重

## 类型判断(上)

## 类型判断(下)

## 深浅拷贝

## 从零实现 jQuery 的 extend

## 如何求数组的最大值和最小值

## 数组扁平化

## 学 underscore 在数组中查找指定元素

## jQuery 通用遍历方法 each 的实现

## 如何判断两个对象相等

## 函数柯里化

## 偏函数

## 惰性函数

## 函数组合

## 函数记忆

## 递归

## 乱序

## 解读 v8 排序源码

## 系列 20 篇正式完结！

## 花式表示 26 个字母

##
