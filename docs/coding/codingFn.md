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

## 多种实现 - 继承

多种继承方式的优缺点

::: details 1. 原型链继承

```JS
function Person(){
  this.name = 'kevin';
}
Person.prototype.say = function(){
  console.log(this.name)
}

function Child() {}
Child.prototype = new Person();

const child1 = new Child();

child1.name; // 'kevin'
```

存在问题有二：

1. 多个引用类型属性 被所有实例共享（实例读取的 Child 的 name 属性）
2. 创建 Child 的实例时，无法向 Person 传参

```JS
function Person(){
  this.name = ['kevin', 'lily'];
}

function Child() {}
Child.prototype = new Person();

const child1 = new Child();
const child2 = new Child();

child1.name.push('bobo');
child2.name; // ["kevin", "lily", "bobo"]
```

:::

::: details 2. 经典继承 • 借用构造函数

```JS
function Person(age){
  this.name = ['kevin', 'lily'];
  this.age = age;
}
function Child(age) {
  // call 来借用构造函数Person，并实现传参
  Person.call(this, age)
}
```

验证：

```JS
const child1 = new Child(28);
const child2 = new Child(19);
child1.name.push('bobo');

child1.age; // 28
child2.age; // 19
child1.name; //["kevin", "lily", "bobo"]
child2.name; //["kevin", "lily"]
```

避免了原型链继承方案，实例之间属性影响和不可传参的缺点；
此方案的缺点在于：

1. 每次创建实例都要创建一次方法;
2. Person.prototype 上的属性无法继承
   :::

::: details 3. 组合继承 • 原型链继承+经典继承
综合了二者的优点

```JS{11}
// 经典继承 • 借用构造函数
function Person(age){
  this.name = ['kevin', 'lily'];
  this.age = age;
}
function Child(age) {
  Person.call(this, age)
}
// 原型链
Child.prototype = new Person();
// constructor 指会本身
Child.prototype.constructor = Child;
```

缺点在于：调用两次父级构造函数：
`new`模拟实现时，内部借用 call 方法， Person.call(this, ...args)

```JS
// 1次
Child.prototype = new Parent();
// 2次
const child1 = new Child()
```

:::

::: details 4. 原型式继承
Object.create()，和原型链继承存在同样的问题

Object.create 的模拟实现：

```JS
function createObj(o) {
  function F(){}
  F.prototype = o;
  return new F();
}
```

:::

::: details 5.寄生式继承
封装一个创建继承过程的函数，该函数在内部以某种形式来做强对象

```JS
function creatObj(o){
  const clone = Object.create(o)
  clone.say() = function(){
    console.log('hi')
  }
  return clone
}
```

不足之处，在于每次创建对象都会调用一次方法
:::

::: details 6.最终版：寄生组合式继承

```JS
function prototype(child, parent) {
  child.prototype = Object.create(parent.prototype)
  // child.prototype.constructor = child;
  // constructor属性不可遍历
  Object.definePrototype(child.prototype, 'constructor', {
    value: child;
    enumerable: false;
  })
}

// 使用
prototype(Child, Parent);
```

:::

## 多种实现 - 创建对象

::: details 1.工厂模式

```JS
function createPerson(name){
  const o = {};
  o.name = name;
  o.getName = function(){
    console.log(this.name)
  }
  return o;
}

const person1 = createPerson("bobo")
```

- 特点：批量 `return` 具有某些相同特征的属性的对象。

- 缺点：所有对象的原型指向同一个，无法识别分辨
  :::

::: details 2. 构造函数模式

```JS
function Person(name){
  this.name = name;
  this.getName = function () {
    console.log(this.name)
  }
}
const person1 = new Person('bobo')
```

- 优点：可识别实例来源
- 缺点：每次创建实例，每个方法都会被创建一次

优化版构造函数的方法：

```JS
function getName() {
  console.log(this.name)
}
function Person(name){
  this.name = name;
  this.getName = getName;
}
const person1 = new Person('bobo')

- 优点：优化了每次方法都要被创建的问题
- 缺点：已经不能叫做封装了。。。。
```

:::

::: details 3. 原型模式

```JS
function Person(){}
Person.prototype.name = 'kevin'
Person.prototype.getName = function(){
  console.log(this.name)
}

const person1 = new Person('bobo')
```

- 缺点：所有属性和方法都共享，无法传参

```JS
function Person(){}
Person.prototype = {
  name : 'kevin';
  getName: function(){
    console.log(this.name)
  }
}
```

- 缺点： 重写了 Person.prototype，丢失了 `constructor`

继续优化：

```JS
function Person(){}
Person.prototype = {
  constructor: Person,
  name : 'kevin';
  getName: function(){
    console.log(this.name)
  }
}

- 优点：实例可以通过constructor属性找到所属的构造函数
- 缺点：原型模式的所有缺点
```

:::
::: details 4. 组合模式 • 最广泛的使用模式

```JS
function Person(name){
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  getName: function(){
    console.log(this.name)
  }
}

优点：私有和共享分开。
```

:::

## 防抖函数 debounce

> 事件在被触发 n 秒后在执行回调，如果在这 n 秒内被再次触发，则重新计时。

::: details 查看代码

```JS {4}
const debounce = (fn, delay=100)=>{
  let timeoutId;
  // 闭包 共用timeoutId
  return function(...args){
    // return 必须为普通函数，this为调用的dom元素。
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      // 这里剪头函数的this非常巧妙，继承return的上下文
      fn.apply(this, args)
    }, delay);
  }
}
```

:::

## 节流函数 throttle

> 在规定的时间内，只能触发执行一次。

::: details 查看代码

时间戳版：

```JS
const throttle = function(fn, delay){
  let inThrottle, lastTime, timeoutId;
  return function(...args){
    if(!inThrottle){
      fn.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(timeoutId);
      if(Date.now()-lastTime >= delay){
        timeoutId = setTimeout(() => {
          fn.apply(this, args);
          lastTime = Date.now();
        }, delay-(Date.now()-lastTime));
      }
    }
  }
}
```

定时器版：

```JS
function throttle(fn, delay){
  let inThrottle = false;
  return function(...args){
    if(inThrottle) return;
    inThrottle = true;
    setTimeout((...args) => {
      fn.apply(this, args);
      inThrottle = false;
    }, delay);
  }
}
```

:::

## 函数柯里化 curry

> 只传递一部分参数来调用他，让他返回一个函数去处理剩余的参数

::: details 查看代码
你可以一次性地调用 curry 函数，也可以每次传递一个参数分多次调用

应用

```JS
function add(a,b){
  return a+b
}

add(1,2) // 3

// 假如有一个 curry 函数可以柯里化
const addCurry = curry(add, 1)
addCurry(2) //2
```

现在，我们来实现一个这样的 curry 函数

```JS
// 连续调用，递归
const curry = function(fn, ...args){
  // 传参个数是否满足 fn 形参个数作为跳出条件
  if(args.length >= fn.length){
    return fn(...args)
  } else {
    // 继续接受参数
    // bind 函数，将历次传递的参数存储起来
    return curry.bind(null, fn, ...args)
  }
}
```

整理代码：

```JS
const curry = (fn, ...args) =>
fn.length > args.length ?
curry.bind(null, fn , ...args) : fn(...args)

// 验证
function add(a,b,c){
  return a+ b+ c
}

curry(add, 1,5)(8) // 14
```

有时，函数形参个数没有边界，可以用空参跳出

```JS
function curry(fn, ...args){
  // 闭包 接受依次传入的参数
  let arr = args;
  return function foo(...res){
    if(res.length){
      arr = [...arr, ...res]
      return foo;
    } else {
      return fn(...arr)
    }
  }
}

// 验证
// 一个多项目求和函数
const sum = (...args)=>args.reduce((acc, cur)=>acc+cur, 0)
curry(sum, 4)(1)(4)(8) // 17
```

举一返三：

```JS
// 闭包替代例1中的bind接受参数
function curry(fn, ...args){
  // 闭包 接受依次传入的参数
  let arr = args;
  function judge(...res){
    arr = arr + res;
    if(arr.length >= fn.length){
      return judge;
    } else {
      return fn(...arr)
    }
  }
  return judge;
}

// 简化
const curry = (fn, ...args)=>{
  let arr = args;
  return judge = (...res)=>{
    arr = [...arr, ...res]
    return arr.length >= fn.length ? fn(...arr) : judge;
  }
}
```

:::

有闭包引发的一道网红题， 实现一个如下函数：

```JS
add(1)(2) // 3
add(1)(2)(3) // 6
add(1)(2)(3)(4) // 10
```

::: details 查看代码
和上面的柯里化的求和，不一样的地方在于，无法设置跳出条件

```JS
// 同样的求和函数
  const sum = (...args)=>args.reduce((acc, cur)=>acc+cur, 0)

// 自身既可以接受参数又能输出结果，怎么办？
// 小技巧，toString() 输出函数时默认返回函数体字符串，重置它
function curry(fn, ...args){
  // 闭包 接受依次传入的参数
  let arr = args;
  function foo(...res){
    arr = [...arr, ...res]
    return foo;
  }
  // foo.toString = ()=> fn(...arr)
  // return foo 就会执行toString，+foo做计算时会优先调用 valueOf
  return foo;
}

// 验证

```

然而，以上并不是真正定义的柯里化

如果搞清楚，需要和偏函数放在一起看
:::

## 偏函数 partial

实际上偏函数和柯里化非常相似：

- 柯里化：把 N 个参数的函数变成 n 个只有一个参数的函数；
- 偏函数：固定一个函数的一个或多个参数的函数，也叫做局部应用；

没有必要可以区分二者，搞明白原理或者这个技巧就好。

## 惰性函数

> 每次调用函数都需要条件判断，其实只需要判断一次，接下来使用方式都不会发生改变。这时该惰性函数上场了，只判断一次后面使用不需要再判断

::: details 查看代码

```JS
// 一个foo函数，这个函数返回首次调用的data对象

function foo(){
  const t = new Date();
  foo = function(){
    return t;
  }
  return foo();
}
```

实际上，惰性函数就是重写了函数
:::

## 函数组合 compose

> 将多个函数组合成一个函数，让代码从右向左执行，而不是从内向外执行，大大提高代码的可读性。

```JS
// fn3(fn2(fn1(fn0(xxx))))

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

fn3 = x => x + '3'
fn2 = x => x + '2'
fn1 = x => x + '1'
fn0 = x => x + '0'

compose2(fn3, fn2, fn1, fn0)('hi')

```

## 函数记忆 memoize

> 将上一次的计算结果缓存起来，下次调用时，如果遇到一样的参数直接从缓存中读取。

::: details 查看代码

```JS
const memoize = fn => {
  const cache = new Map();
  const cached = function(...val) {
    // 接受参数为对象时
    let args = JSON.stringify(val)
    return cache.has(args) ? cache.get(args) : cache.set(args, fn.apply(this, val)) && cache.get(args);
  };
  cached.cache = cache;
  return cached;
};

function add(a, b) {
    return a + b;
}
let a = memoize(add);
a(1,2)
```

:::

## 递归 recursion

两个例子

- `1 + 2 + 3 + ... + 100`
- `1 * 2 * ... * 100`

::: details 查看代码

```JS
function add(n){
  if(n === 1) return n;
  return n + add(n-1)
}

function factorial(n){
  if(n = 1) return n;
  return n * factorial(n-1)
}
```

当执行一个函数的时候会创建一个执行上下文，以上两个递归函数会不停的创建执行上下文压入执行上下文栈，对内存而言是不小的开销。

尾调用来优化：

```JS
// 用参数来接受值，每次函数执行完毕，执行上下文都会弹出
function factorial(n, result){
  if(n === 1) return result;
  return factorial(n-1, n*result)
}

const factorialed = function(n){
  return factorial(n, 1)
}

factorialed(5)
```

:::
递归的特点是：

1. 处理的是相同的问题
2. 不能无限调用本身，必须有一个出口

## 深拷贝 deepclone

::: details 数组 浅 拷贝

```JS
const arr = [1,2,3,4]
// 1. concat
const newArr1  = arr.concat()

// 2.  slice
const newArr2  = arr.slice()

// 3. 扩展符
const newArr3  = [...arr]

// 4. from
const newArr3  = Array.from(arr)
```

特点：引用类型元素的数组，只拷贝了对象和数组的引用。称之为`浅拷贝`

:::

::: details 深拷贝 - JSON

```JS
const newArr  = JSON.parse(JSON.stringify(arr))
```

局限性：

1. 无法对函数、RegExp 等特殊对象的克隆
2. 会抛弃对象的 constructor，所有构造函数指向 Object
3. 对象有循环引用，会报错

:::

::: details 深拷贝 - 递归

```JS
function deepClone(obj) {
  if(typeof obj !== 'object') return;

  const newObj = obj instanceof Array ? []:{};
  for (const key in obj) {
    if(obj.hasOwnProperty(key)){
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```

深拷贝的不足和，JSON 版本一样，一次性递归到底带来性能差的问题。

:::

## 乱序

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

## 从零实现 jQuery 的 extend

## 如何求数组的最大值和最小值

## 数组扁平化

## 学 underscore 在数组中查找指定元素

## jQuery 通用遍历方法 each 的实现

## 如何判断两个对象相等

## 解读 v8 排序源码

## 系列 20 篇正式完结！

## 花式表示 26 个字母

##
