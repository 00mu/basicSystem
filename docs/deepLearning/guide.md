# 快速引导

## 起步

### 弱类型

在 JS 中变量类型由所引用的类型决定

### 变量提升

解析器先解析代码，把声明的变量声明提升到最前面，解析过程中可能就能处理一些错误而不是等到执行过程

`var`声明的变量，声明会提升到最前面，赋值还停留在原地

### TDZ 暂时性死区

是指，变量在作用域内已存在，单必须在`let/const`声明之后才可以使用

TDZ 可以让程序保持先声明后使用的习惯，让程序更稳定

- 变量有先生命后使用
- 建议使用`let/const`，少用`var`

`let/const`声明的变量前存在暂时性死区，使用会错误

```JS
console.log(x); //a is not defined
let x = 10;
```

函数内不允许变量在未声明前使用

```JS
function run(){
  console.log(x); // Cannot access 'x' before initialization
  let x = 10;
}
run();
```

函数 run 内，因为 let 存在暂时性死区，不能提前使用

```JS
let x = 0;
function run(){
  console.log(x); // Cannot access 'x' before initialization
  let x = 10;
}
run();
```

函数的参数，同样先声明赋值再使用

```JS
(function(a=b, b=10){})() // Cannot access 'b' before initialization
```

这样就是可以的

```JS
(function(a=10, b=a){})() // Cannot access 'b' before initialization
```

### 块作用域

#### 共同点：

- `var/let/const` 声明的全局作用域变量，都可以再函数中访问使用
- 在函数中声明的变量，只能在函数及子函数中使用

#### 不同点：

先引出三个作用域概念：全局、函数、块级

块级，指的是代码块，if、for、do-while 等`{}`语句

- `var` 没有块级作用域的概念,`let/const` 拥有块级作用域
- `let/const`声明的变量不存在 window 对象中
- let，块级内的可以访问块级外的，反之不行
  - 同一作用域内不可重复定义
- cosnt 声明常量，要求诸多
  - 常量明建议全部大写
  - 只能声明一次常量
  - 声明时必须赋值
  - 不允许再次全新赋值
  - 可以修改引用类型的值
  - 拥有块、函数、全局作用域

## 运算符 && 流程控制

for-in
遍历对象的所有属性，不用于遍历数组

for-of
用于遍历数组、字符串、maps、sets 等可迭代的数据结构

## 数组

### 创建数组

对象方法创建

```JS
const arr = new Array(1, '张三')
```

字面量创建(推荐)

```JS
const arr = [1, '张三']
```

多维数组

```JS
const arr = [[1, '张三'],[2, '李四']]
```

`length` 获取长度

```JS
const arr = [1, '张三',]
arr.length; // 2, 最后一个逗号后面的内容忽略

arr.length = 4;
console.log(arr) // [1, "张三", empty × 2]
```

### 类型检测 Array.isArray(...)

```JS
console.log(Array.isArray([])) // true
console.log(Array.isArray(9)) // false
```

### 类型转换

将数组装换为字符串 or 字符串转化为数组

```JS
console.log("12345".split('')) // [1,2,3,4,5]
```

#### 字符串

```JS
// 一个效果
[1,2,3].toString() //
String([1,2,3]) //
[1,2,3].join('') //
```

#### Array.from

将类数组转化为数组，第一个参数为要转化可迭代的对象

```JS
Array.from(124) // [] 数组不被转化
Array.from('123') // [1,2,3]
Array.from(1,2,3) // VM2665:1 Uncaught TypeError: 2 is not a function
```

第二个参数为类似 map 的回调

```JS
Array.from('123', item=>item*2) // [2,4,6]
```

#### 展开语法

```JS
let divs = document.querySelectorAll("div");

[...divs] //
```

### 展开语法 `...`

数组的合并，比 concat 更简单

```JS
let arr = [4,5]
[1,2,3].concat(arr)

[1,2,3,...arr] //[1, 2, 3, 4, 5]
```

### 函数参数

可以代替`arguments`接受任意数量的参数

```JS
function add(...args){
  console.log(args)
}
add(1,2,4) //[1, 2, 4]
```

接受剩余参数,`...` 必须放在最后

```JS
function add(x,y,...args){
  console.log(args)
}
add(1,2,4) //[4]
```

### 节点转换

将 DOM 节点装换为数组

```JS
[...document.querySelectorAll("div")].map(item=>{})
```

节点也可以用原型方法 apply、call 来处理

```JS
Array.prototype.map.call(document.querySelectorAll("div"), item=>{item.style.background = 'red'})

// 这样也行

[].map.call(document.querySelectorAll("div"), item=>{item.style.background = 'blue'})
```

## 解构赋值

结构赋值是一种更简洁的赋值特性，可以理解为分解一个数据的解构

### 解构数组

依然需要声明，请看下面语法

```JS
let [name, age] = ['波波', 18]

console.log(name, age) // 波波， 18
```

### 剩余解构

```JS
let [name, ...rets] = ['波波', 18, 9]
console.log(rets) // [18, 9]
```

### 默认值

```JS
let [name, age=20] = ['波波']
console.log(age) // 20
```

### 数组参数

```JS
function add([a,b]){
  console.log(a,b)
}
add([1,2])
```

### 管理元素

#### 基本使用 索引值

```JS
let arr = [1,2]
arr[1] = '20'
```

向数组追加元素

```JS
let arr = [1,2]
arr[arr.length] = '后面加一个'
```

#### 扩展语法 批量添加元素

```JS
let arr = [1,2]
[7,9].push(...arr)
```

#### push 后加

压入元素，直接修改原数组，返回数组元素数量

#### pop 后减

从末尾弹出元素，直接改变元数组，返回值为弹出的元素

#### shift 前删

从数组前面取出一个元素，直接改变元数组，返回值为删除的元素

#### unshift 前加

从数组前面添加元素，直接改变元数组，返回数组元素数量

#### fill 填充

```JS
console.log(new Array(3).fill('5')) // [5,5,5]
```

#### splice 强大的剪接功能

添加修改替换数组中的元素，直接改变元数组，返回值为删除的元素

`splice(start, num)`

```JS
let arr = [0, 1, 2, 3, 4, 5, 6];
console.log(arr.splice(1, 3)); //返回删除的元素 [1, 2, 3]
console.log(arr); //删除数据后的原数组 [0, 4, 5, 6]
```

删除最后一个元素

```JS
arr.splite(arr.legnth-1,1);
arr.length = arr.legnth-1

```

删除的位置添加元素

```JS
let arr = [0, 1, 2, 3, 4, 5, 6];
arr.splice(3,0,'a','a','a','a','a')

console.log(arr) //[0, 1, 2, "a", "a", "a", "a", "a", 3, 4, 5, 6]
```

#### slice 取值 不改变原数组

从数组中截取部分元素组合成新数组， 不传第二个参数时截取到数组的最后元素

````JS
let arr = [0, 1, 2, 3, 4, 5, 6];
console.log(arr.slice(1, 3)); // [1,2]

// 不传第二个参数，就到最后一个
console.log(arr.slice(1)); // [1, 2, 3, 4, 5, 6]

// 不传参数，获取全部元素
console.log(arr.slice1)); // [0, 1, 2, 3, 4, 5, 6]
```

数组调整位置函数
```JS
function arrMove(arr, before ,to){
  const newArr = [...arr];
  const elem = newArr.splice(before,1)
  newArr.splice(to, 0, ...elem)
  return newArr;
}
const array = [1, 2, 3, 4];
console.table(arrMove(array, 3, 1)); // 把第4位的放到第2位去
````

#### 清空数组

1. 数组值改为[]，不会影响相同引用

```JS
const array = [1, 2, 3, 4];
const newArr = array;
array = []

console.log(array) //[]
console.log(newArr) //[1, 2, 3, 4]


```

2. legnth 改为 0

```JS
const array = [1, 2, 3, 4];
array.length = 0;
```

3. splice 方法

```JS
const array = [1, 2, 3, 4];
array.splice(0,array.length)
```

4. pop/shift 方法

```JS
const array = [1, 2, 3, 4];
while(array.pop()){}
```

### 合并拆分

#### join 拼接字符串

#### contact 合并数组，返回一个新的数组

也可以用扩展语法

```JS
let arr1 = [1,2]
let arr2 = [3]
arr1.concat(arr2)

[...arr1,...arr2]
```

#### copyWithin

### 查找元素

#### indexOf 从前找，返回 index

从前向后查找元素出现的位置，如果找不到返回 -1;
indexOf('ha', 3) 第二个参数是开始查找位置

#### lastIndexOf 从后向前，找不到返回-1

#### includes 查找字符串返回布尔值，推荐

```JS
[1,2,3,4].includes(2) // true

// 手写个includes 函数
function myIncluds(arr, target){
  for (const item of arr) {
    if(target === item) return true;
  }
  return false;
}

myIncluds([1,2,3,4], 3) // true
```

includes 不能查找引用类型的元素，因为他们的内存地址是不想等的

#### find() 找到后把值返回出来，找到第一个就停止

```JS
[1,2,3,4].find(item=>item>2) // 3
```

find 就可以查找引用类型啊，并且还很方便

```JS
// includes 查不了引用类型
const user = [{ name: "李四" }, { name: "张三" }];
const find = user.includes( { name: "张三" });
console.log(find); // false
```

```JS
// find就很擅长
const user = [{ name: "李四" }, { name: "张三" }];
const find = user.find(item=>item.name === '李四');
console.log(find) // true
```

#### findIndex() 与 find 的区别是返回的 index 索引值

查询不到的时候返回 -1

```JS
const user = [{ name: "李四" }, { name: "张三" }];
const find = user.findIndex(item=>item.name === '李四');
console.log(find) // 0
```

#### 手写 find 函数

1. 普通函数

```JS
function myFind(arr, callback){
  for(const item of arr){
    if(callback(item) === true){
      return true
    }
  }
  return false
}

let arr = [1, 2, 3, 4, 5];
let res = find(arr, function(item) {
  return item == 23;
});
console.log(res) // false
```

2. 原型方法

```JS
Array.prototype.Myfind = function(callback){
  for(const item of this){
    if(callback(item) === true){
      return item
    }
  }
  return undefined;
}
let arr = [1, 2, 3, 4, 5];
arr.Myfind(item =>item === 23) // undefined
arr.Myfind(item =>item === 3) // 3
```

### 数组排序

#### reverse 反转数组

```JS
let arr = [1, 4, 2, 9];
console.log(arr.reverse())
```

#### sort 排序

每次使用两个值比较大小
`Array.sort((a,b)=>a-b`

- 返回负数 a 排在 b 前面，从小到大
- 返回正数 b 排在 a 前面
- 返回 0 时不动

默认从小到大排列

```JS
let arr = [1, 4, 2, 9];
console.log(arr.sort()); //[1, 2, 4, 9]

console.log(arr.sort((a,b)=>b-a)) // [9, 4, 2, 1]
```

##### 手写排序函数

```JS

let arr = [1, 4, 2, 9];

mySort(arr, (a,b)=>a-b)

function mySort(arr, callback){
  for(const i in arr){
    for(const j in arr){
      if(callback(arr[i], arr[j])<0){
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
```

### 循环遍历

#### for 循环

根据数组长度结合 for 循环来遍历数组

#### forEach(cb)

forEach 使函数作用在每个数组元素上，但是没有返回值

#### for/in key 值作为数组的索引值

```JS
let arr = [1, 4, 2, 9];
for (const key in arr) {
  console.log(key)
}
// 0 1 2 3
```

#### for/of 取值而非索引值

```JS
for (const item of arr) {
  console.log(item)
}
// 1 4 2 9
```

### 迭代器方法

数组中开始使用多种迭代器方法

#### keys 通过迭代对象获取索引

#### values 通过迭代对象获取索引

#### entries 通过迭代对象获取索引

### 扩展方法

#### every 回调里面判断是否为 true，返回布尔值

#### some 回调里面判断是否为 true，返回布尔值

#### filter 回调里面判断是否为 true，返回数组

```JS
let lessons = [
  {title: '媒体查询响应式布局',category: 'css'},
  {title: 'FLEX 弹性盒模型',category: 'css'},
  {title: 'MYSQL多表查询随意操作',category: 'mysql'}
];
lessons.filter(item=>{
    if(item.category.indexOf('my') > -1) return true
})
// {title: 'MYSQL多表查询随意操作',category: 'mysql'}
```

#### map 映射

```JS
let lessons = [
  {title: '媒体查询响应式布局',category: 'css'},
  {title: 'FLEX 弹性盒模型',category: 'css'},
  {title: 'MYSQL多表查询随意操作',category: 'mysql'}
];
lessons = lessons.map(item=>{
  if(item.category.indexOf('my') > -1){
    return item
  }
})
// [undefined,undefined,{title: 'MYSQL多表查询随意操作',category: 'mysql'}];
```

哈哈，看到了吧，map 就不是这么用的，map 映射为一个等长的数组；
如果是为了拿到部分元素，就该用过滤`filter`

```JS
lessons = lessons.map(item=>{
  if(item.category.indexOf('my') > -1){
    item.title = '不好好学习傻眼了吧' + item.title
  }
  return item;
})
```

map + filter：
先按照规则映射为新数组，再根据条件过滤

```JS
[1,2,3,4,5].map(item=>item+5).filter(item=>item>8)

// [9, 10]
```

### for forEach map filter 如何选用

**请根据语义选用**

如果只谈性能，显然是 for > forEach > map

But ，dont care 性能！

- 如果你需要将数组按照某种规则映射为另一个数组，就应该用 map
- 如果你需要进行简单的遍历，用 forEach 或者 for of
- 如果你需要对迭代器进行遍历，用 for of
- 如果你需要过滤出符合条件的项，用 filter
- 如果你需要先按照规则映射为新数组，再根据条件过滤，那就用一个 map 加一个 filter

#### reduce

函数可以迭代数组的所有元素， 是相当的的好用

[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
return accumulator + currentValue;
}, initVaule);

- Accumulator (acc) (累计器)
- Current Value (cur) (当前值)
- Current Index (idx) (当前索引)
- Source Array (src) (源数组)

```JS
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
return accumulator + currentValue;
});

[1, 2, 3, 4].reduce((acc, cur)=> acc - cur)
// -8
[0, 1, 2, 3, 4].reduce((acc, cur)=> acc - cur)
// -10
[1, 2, 3, 4].reduce((acc, cur)=> acc - cur, 10)
// 0
[1, 2, 3, 4].reduce((acc, cur)=> acc - cur, 10)
```

运行方式是：第一个值与第二个值的原型结果作为下一次运行的第一个值；
如果有 initVaule，initVaule 作为初始值

```JS
[1, 2, 3, 4].reduce((acc, cur)=> acc - cur)
// 1. 1-2=-1
// 2. -1-3 = -4
// 3. -4-5=-8 结束返回结果
```

##### 场景 1 统计元素出现的次数

```JS
function arrCount(arr, el){
  return arr.reduce((acc, cur)=>{
    console.log(acc, cur)
    if(cur==el){
      return acc+1
    }
    return acc; // 每次return一个值作为下次的acc
  }, 0) // 初始值为0，同时也会从第1个开始执行，而不是第二个
}
arrCount([1, 2, 3, 2, 5, 2], 2) // 3
```

##### 场景 2 取数组中最大的值

```JS
function arrMax(arr) {
  return arr.reduce((acc, cur)=>{
    return acc>cur? acc : cur
  })
}
arrMax([1, 2, 3, 2, 5, 2]) // 5
```

##### 场景 3 取价格最高的商品

```JS
let cart = [
  { name: "iphone", price: 12000 },
  { name: "imac", price: 25000 },
  { name: "ipad", price: 3600 }
];

function maxPrice(arr){
  return arr.reduce((acc, cur)=>{
    return acc.price>cur.price? acc : cur
  })
}
maxPrice(cart);
```

##### 场景 4 计算购物车的价格总和

```JS
function totalPrice(arr){
  return arr.reduce((acc, cur)=>{
    return acc+cur.price
  }, 0)
}
totalPrice(cart) // 4600
```

##### 场景 4 获取价格超过一万的商品名称

reduce 版本

```JS
function getNameByPrice(arr, price){
  return arr.reduce((acc, cur)=>{
    if(cur.price>price){
      acc.push(cur)
    }
    return acc;
  },[]).map(item=>item.name)
}

getNameByPrice(cart, 10000)
// ["iphone", "imac"]
```

filter 版本

```JS
function getNameByPrice(arr, price){
  return arr.filter(item=>item.price>price).map(item=>item.name)
}
getNameByPrice(cart, 10000)
// ["iphone", "imac"]
```

这个场景，明显不涉及元素之间的对比，更适合用 filter

##### 场景 5 数组去重

```JS
let arr = [1, 2, 6, 2, 1];
function arrFilter(arr){
  return arr.reduce((acc, cur)=>{
    if(!acc.includes(cur)){
      acc.push(cur)
    }
    return acc;
  }, [])
}
arrFilter(arr)
// [1, 2, 6]
```

##### 一个动画案例

![img](http://houdunren.gitee.io/note/assets/img/Untitled-0803682.b8920733.gif)

```HTML
 <div class="canvas">
    HELLOIlOVEYOU
</div>
```

```CSS
.canvas {
  height: 30vw;
  font-size: 8vw;
  font-weight: 600;
  text-align: center;
  color: #925eb0;
  background: #303d4f;
  display: flex;
  align-items: center;
  justify-content: center;
}
span {
  cursor: pointer;
}
.changeColor {
  animation: textColor 1s;
  animation-direction: alternate;
  animation-iteration-count: 2;
}
@keyframes textColor {
  50% {
    transform: scale(1.5);
    color: #e9c445;
  }
  to {
    transform: scale(0.5);
    color: #925eb0;
  }
}
```

```JS
let canvas = document.querySelector(".canvas");
let elText = canvas.innerText;
const fragment = document.createDocumentFragment();
[...elText].forEach((text) => {
  const li = document.createElement("span");
  li.textContent = text;

  li.addEventListener("mouseover", function () {
    this.classList.add("changeColor");
  });
  li.addEventListener("animationend", function () {
    this.classList.remove("changeColor");
  });
  fragment.append(li);
});
canvas.innerHTML = "";
canvas.append(fragment);
```

## Set

用于存储任何类型的唯一值

- 只保存值，没有键
- 字符串数字不等于数值数字
- 值是唯一的
- 遍历数序是添加的顺序方便保存回调函数

语法

实例

```JS
const set1 = new Set()
console.log(set1) //Set(0) {}
const set2 = new Set(['zhangsan', 'lisi', 'wangwu'])
console.log(set2) // Set(3) {"zhangsan", "lisi", "wangwu"}
const set3 = new Set('zhangsan')
console.log(set3) // Set(6) {"z", "h", "a", "n", "g", …}
```

```JS
let user = new Set();

// 添加元素
user.add('1',1,'张三')

// 获取数量
user.size;

// 元素检测
user.has('张三')

// 删除单个元素
user.delete('1')

// 删除所有元素
user.clear()
```

### 数组转化

使用 `点语法` 或者 `Array.from` 静态方法?将 Set 类型转换为数组，然后就可以使用数组的函数了

```JS
const set = new Set(['zhangsan', 'lisi', 'wangwu'])

console.log([...set]) // ["zhangsan", "lisi", "wangwu"]
console.log(Array.from(set)) // ["zhangsan", "lisi", "wangwu"]
```

移出 set 中大于 5 的数字

```JS
let set = new Set('123456789')
set = new Set([...set].filter(item=>item>5))

console.log(set) //{"6", "7", "8", "9"}
```

### 字符串 & 数组去重

去除字符串 de 重复

```JS
console.log([...new Set('1111112332')].join()) // 1,2,3
```

去除数组 de 重复

```JS
console.log([...new Set(["1", "1", "1", "1", "1", "1", "2", "3", "3", "2"])]) // ["1", "2", "3"]
```

### 遍历数据

keys()
