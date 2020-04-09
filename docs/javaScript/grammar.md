# JavaScript 基本语法

## JavaScript 是什么

是

* 一种嵌入式语言

> `JavaScript` 本身提供的核心语法不多，只能做一些数学和逻辑运算。它本身不提供I/O相关API，只适合嵌入更大型的应用程序环境，去调用宿主环境提供的 `API` 。

* 一种高级的、解释型的编程语言

> 无需编译

* 弱类型的语言

> 同一个变量可以赋不同类型

* 动态类型的语言

> 运行时才做类型检查

* 基于原型编程，是一种『对象模型』语言
* 事件驱动和非阻塞式设计

#### `JavaScript` 的核心语法只包含两个部分，是相当精简：

* 基本的语法构造（操作符、控制解构、语句等）
* 标准对象（一系列具有各种功能的对象，Array、Date、Math... ）

### 严格模式

严格模式是一种特殊的执行模式，修复了部分语言上的不足，提供了更强的错误检查，并增强了安全性。

写在函数的顶部，或者文件的顶部

``` JS
function fun() {
    'user strict' // 前面不能有其他语句
}
```

or

``` JS
'user strict' // 前面不能有其他语句
function fun() {

}
```

#### 严格模式 和 普通模式的区别

* 不允许使用 with 

> with 绑定对象不明确不利于代码排错和模块化，JS 引擎优化更难，可读性更差

* 不允许未声明的变量被赋值 ReferenceError
* 一般函数调用时this指向null，而不是全局对象
* 若使用apply、call，当传入null或undefined时，this指向null或undefined，而不是全局对象
* 试图修改不可写属性、在不可扩展对象上添加属性时报TypeError，而不是忽略
* arguments变为参数的静态副本

``` JS
! function(a) {
    arguments[0] = 100;
    console.log(a)
}(1)
// 1=>100
// 不传=> undefined
```

``` JS
! function(a) {
    'use strict';
    arguments[0] = 100;
    console.log(a)
}(1)
// 1
```

``` JS
! function(a) {
    'use strict';
    arguments[0].x = 100;
    console.log(a.x)
}({
    x: 1
})
// 100 传入的是对象，引用类型，会改变
```

## 语句

`JavaScript` 程序的执行单位为行（line），一行一行地往下执行。通常每一行就是一个语句。

语句（statement）是为了完成某种任务而进行的操作，比如下面就是一行赋值语句。

``` JS
var a = 1 + 3;
```

`1 + 3` 叫做表达式（expression）

### 块语句

块语句通常用于组合0~n个语句，用一对花括号定义，常常和if、for等用来构成更加复杂的语法结构。

一个完整的语句以左花括号开头，会被认为是块语句而不是字面量，

``` JS
// 块语句 语法
// ES6 中新增跨级作用域概念
{
    语句1;
    语句2;
    ....
}
```

### 条件语句

JavaScript 提供 `if` 结构和 `switch` 结构，完成条件判断，即只有满足预设的条件，才会执行相应的语句。

#### if 语句

``` JS
// if 语句
if (布尔值) {
    语句
}

// if else 语句
if (布尔值) {
    语句
} else {
    语句
}
```

#### switch 语句

``` JS
switch (key) {
    case value1:
    case value2: // 符合上面任一值，都会执行下面语句
        // do something
        break;
    case value3:
        // do something // 没有 break 的话会继续向下执行
    case value4:
        // do something
        break;
    default:
        break;
}
```

#### 三元运算符

``` JS
(condition) ? expression1: expression2 //如果条件为truly，则返回表达式1的值，反之返回表达2的值
```

### 循环语句

循环语句用于重复执行某个操作。

#### while 循环

``` JS
while (condition) {

}
```

#### for 循环

``` JS
for (let index = 0; index < array.length; index++) {
    const element = array[index];

}
```

#### do... while 循环

``` JS
do {
    // 不关条件是否为真，都会先执行一遍循环体
} while (condition);
```

#### break 语句 与 continue 语句

`break` 和 `continue` 语句都具有跳转功能，可以让代码不按既有的顺序执行。

`break` 用于跳出循环，此循环语句不再执行。

``` JS
for (let i = 0; i < 5; i++) {
    console.log(i);
    if (i === 3) break;
}
```

`continue` 用于跳出本轮循环，返回循环解构头部开始下一轮循环。

``` JS
for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) continue;
    console.log(i);
}
```

如果存在多轮循环， 不带参数的 `break` 和 `continue` 语句只针对最内层循环

#### 标签（label） 配合 break 和 continue 用来跳出外层循环

当语句的前面有标签，标签相当于定位符，用于跳转到程序的任意位置。

标签通常与 break 和 continue 语句配合，跳出特定循环。

``` JS
top:
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (i === 1 && j === 1) break top; // 跳出top语句
            console.log('i=' + i + ', j=' + j);
        }
    }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
```

也可以跳出代码块

``` JS
foo: {
    console.log(1);
    break foo; // 就会跳出foo区块
    console.log('本行不会输出');
}
console.log(2);
// 1
// 2
```

`continue` 命令后面有一个标签名，满足条件时，会跳过当前循环，直接进入下一轮外层循环。如果 `continue` 语句后面不使用标签，则只能进入下一轮的内层循环。 

``` JS
top:
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (i === 1 && j === 1) continue top;
            console.log('i=' + i + ', j=' + j);
        }
    }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// i=2, j=0
// i=2, j=1
// i=2, j=2
```

### try... catch

try... catch 语句提供了一个异常捕获的机制。

``` JS
// try 后面跟 catch 或者 finally 或者 catch & finally
// catch & finally
try {
    throw "test"
} catch (error) {
    console.log(error)
} finally {
    console.log('finally')
}

// catch
try {
    throw "test"
} catch (error) {
    console.log(error)
}

// finally
try {
    throw "test"
} finally {
    console.log('finally')
}
```

有 `finally` 从句的时候，不管是否有错误，最后都会执行 `finally` 

#### try... catch 嵌套

内部 `try` 没有 `catch` 接受异常，则向外查找在最近的 `catch` 。
在处理外层的 `catch` 之前，先执行内部的 `finally` 语句。

``` JS
try {
    try {
        throw new Error("oops")
    } finally {
        console.log("finally")
    }
} catch (error) {
    console.log("outer", error.message)
}
// finally
// outer oops
```

``` JS
try {
    try {
        throw new Error("oops")
    } catch (error) {
        console.log("inner", error.message)
        throw error;
    } finally {
        console.log("finally")
    }
} catch (error) {
    console.log("outer", error.message)
}
// inner oops
// finally
// outer oops
```

### for... in

1. 遍历顺序不确定
2. 属性描述器 enumerable 为 false 时不会出现
3. for in对象属性时受原型链影响

### function

### debugger

### with

### sync wait

## 变量 与 声明

变量是对『值』的引用，变量就是为『值』取名然后引用这个名字。

``` JS
let a = 1;
```

* 变量的声明和赋值，实际上是分开的两个步骤执行的：

``` JS
let a; // 第一步声明变量a，值为 undefined
a = 1; // 第二步，为变量a赋值1
```

* 变量赋值时，不用 var、let、const 命令，将变为全局变量；严格模式下不允许对未声明的变量赋值
* 变量如果没有声明就直接使用，会报错 // x is undefined
* 逗号分开，可声明多个变量

``` JS
var a, b;
var a = 1,
    b = 1;
```

* 而 var a = b = 1 声明的变量b会变为全局变量

``` JS
(function() {
    let a = b = 1
})()
```

* const 声明过的变量，重复声明会报错；var、let重复声明无效，如果声明的同时进行赋值，则会覆盖前面的值

### 变量提升

`JavaScript` 引擎的工作方式是，先解析代码，获取所有被声明的变量（只针对变量是var声明），然后再一行一行地运行。这造成的结果，就是所在作用域内var声明变量的声明统一提前，赋值原地不动，这就叫做变量提升（hoisting）。

``` JS
{
    console.log(a); // undefined
    var a = 1;
}
```

实际上等于

``` JS
{
    var a;
    console.log(a);
    a = 1;
}
```

与之相似的是『函数声明』格式的函数也会进行提升，不同的是，函数声明的函数体会整体提升到当前作用域前面。

``` JS
num(); //1
function num() {
    console.log(1);
}
```

### 自由变量

一个变量在当前作用域没有定义但被使用了，向上级作用域一层层依次寻找，直到找到为止，如果到全局作用局都没有找到，则报错 XX is not defined。

## 数据类型

JavaScript 语言中的每一个值都对应一中数据类型。最新的 ECMAScript 标准定义了 8 种数据类型:

* 7种原始类型
  + Boolen （表示一个逻辑实体， `true` or `false` ）
  + Number （64位双精度浮点型）
  + String （字符串类型用来存放文本）
  + Undefined （没有被赋值的变量）
  + Null （尚未创建的对象）
  + Symbol （符号类型是唯一的并且是不可修改的，用于区分却不用关心具体值是什么）
  + BigInt （基础的数值类型，可以表示任意精度格式的整数）

* 和 Object

## 原始类型（7种）

### Undefined Null Symbol BigInt

### Boolean （布尔值）

布尔值只有true、false这两个值。

下列运算符都会返回一个布尔值：

* 前置逻辑运算符!
* 相等运算符 `===` ， `!==` ， `==` ， `!=` 
* 比较运算符 `>` ， `>=` ， `<` ， `<=` 

只有以下6种是falsy 假值，其余都是真值 truthy

* undefined
* null
* NaN
* 0, -0
* false
* ""

### Number（数值）

在 `JavaScript` 内部所有数字都是以64位浮点数形式存储，即使整数也是如此，也可以说 `JavaScript` 没有整数

``` JS
1 === 1.0 // true
```

浮点数不是精确的值，所以涉及小数的比较和运算要格外小心。

``` JS
.1 + .2
// 0.30000000000000004
```

`JavaScript` 能够表示的数值范围为21024到2-1023（开区间），超出这个范围的数无法表示。

##### +0 与 -0

`JavaScript` 内部实际上存在2个0：一个是+0，一个是-0，区别就是64位浮点数表示法的符号位不同。它们是等价的。唯一的区别在于+0或-0当作分母，返回的值是不相等的。

``` JS
(1 / +0) === (1 / -0) // false
```

上面的代码之所以出现这样结果，是因为除以正零得到 `+Infinity` ，除以负零得到 `-Infinity` ，这两者是不相等的

##### NaN

NaN（not a number） 表示『非数字』，用于解析成数字或计算时出错的场合。

``` JS
5 - 'x' // NaN
0 / 0 // NaN
```

* NaN 是 Number 类型

``` JS
typeof NaN //'number'
```

* NaN 不等于任何值，包括本身。不能用与计算结果都是NaN，不能用于比较结果都是false

``` JS
NaN === NaN // false
[NaN].indexOf(NaN) // -1
NaN + 32 // NaN 与任何数计算都是NaN
Infinity > NaN // false
```

##### 与数值相关的全局方法

* parseInt()  将字符串转为整数

``` JS
parseInt('123') // 123
```

* parseFloat() 将一个字符串转为浮点数

``` JS
parseFloat('3.14') // 3.14
```

* isNaN() 判断一个值是否为 `NaN` 

``` JS
isNaN(NaN) // true
isNaN(123) // false

isNaN('Hello') // true
// 相当于
isNaN(Number('Hello')) // true
```

``` JS
isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false
```

对于空数组和只有一个数值成员的数组，之所以不为 `NaN` 是因为能被 `Number` ，见数据类型转换。

因此使用 `isNaN` 先判断下数据类型

``` JS
typeof value === 'number' && isNaN(value)
```

### 字符串

##### 字符串与数组
字符串可以看做位字符数组，可以使用数组的方括号运算符，用来返回某个位置的字符， 不能用来修改字符。

``` JS
"hello" [1] // "e"

"hello" [1] = 'h' // 并不具有set方法
"hello" [1] // "e"
```

##### length 属性

`length` 属性返回字符串的长度，该属性也是无法改变的。

``` JS
var s = 'hello';
s.length // 5

s.length = 3; // 同样length属性也是无法改变的，并不是真正的数组
s.length // 5

// 转化为真正的数组
const a = Array.prototype.slice.call(s);
// 或者
const b = Array.from(s);
```

#### Null

尚未创建的对象，本身是原始类型。

``` JS
typeof Null // object Null不是Object类型，这是历史原因造成的

Null === Null
```

#### Symbol

待补充

## Object 对象类型

除了原始类型，其余都是对象类型，比如侠义的 Object、Array、Function、Date、RegExp... 

###  Object 对象

对象就是一组“键值对”（key-value）的无序集合。

对象（object）是 JavaScript 语言的核心概念，也是最重要的数据类型。

``` JS
var obj = {
    foo: 'Hello',
    bar: 'World'
};
```

#### 键名

对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为 **“方法”** ，它可以像函数那样调用。

``` JS
var obj = {
    p: function(x) {
        return 2 * x;
    }
};

obj.p(1) // 2
```

如果属性的值还是一个对象，就形成了链式引用。

``` JS
var o1 = {};
var o2 = {
    bar: 'hello'
};

o1.foo = o2;
o1.foo.bar // "hello"
```

#### 对象的引用

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，**也就是说指向同一个内存地址**。

``` JS
var o1 = {};
var o2 = o1;

o1 = 1; // 取消了对{}的引用，不影响指向{}其他变量
o2 // {} 
```

#### 对象字面量 还是 语句？

``` JS
{
    foo: 123
}
```

JavaScript 引擎读到上面这行代码，会发现可能有两种含义。第一种可能是，这是一个表达式，表示一个包含foo属性的对象；第二种可能是，这是一个语句，表示一个代码区块，里面有一个标签foo，指向表达式123。

为了避免这种歧义，JavaScript 引擎的做法是，如果遇到这种情况，无法确定是对象还是代码块，一律解释为代码块。

``` JS
({
    foo: 123
}) // 正确，如果要解释为对象，在大括号前加上圆括号
({
    console.log(123)
}) // 报错，因为圆括号的里面，只能是表达式，所以确保大括号只能解释为对象
```

#### 属性的操作

* JavaScript 语言规定，对象的键名一律为字符串
* 数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符

``` JS
var obj = {
    123: 'hello world'
};

obj .123 // 报错
obj[123] // "hello world" ,键名最终也会被解析成字符串
obj['123'] // "hello world"
```

* Object.keys 方法查看一个对象本身的所有属性

``` JS
var obj = {
    key1: 1,
    key2: 2
};

Object.keys(obj);
// ['key1', 'key2']
```

* `delete` 命令用于删除对象的属性，删除成功后返回 `true` 

``` JS
var obj = {
    p: 1
};
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined

delete obj.b // true 删除一个不存在的属性，delete不报错，而且返回true
```

* `configurable` 为 `false` 时， `delete` 命令返回 `false` 

``` JS
var obj = Object.defineProperty({}, 'p', {
    value: 123,
    configurable: false
});

obj.p // 123
delete obj.p // false
```

#### in 运算符，检测对象的某个属性是否存在

``` JS
var obj = {
    p: 1
};
'p' in obj // true
    'toString' in obj // true toString是继承的属性
```

in 运算符，并不能区分属性是对象自身还是来自继承；使用 hasOwnProperty 方法判断是否为自身属性

``` JS
const obj = {}
if ('toString' in obj) {
    console.log(obj.hasOwnProperty('toString')) // false
}
```

#### for... in，属性遍历

* 遍历对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性
* 不仅遍历对象自身的属性，还遍历继承的属性

``` JS
var obj = {};

// toString 属性是存在的
obj.toString // toString() { [native code] }

for (var p in obj) {
    console.log(p);
} // 没有任何输出
```

对象obj虽然继承了 `toString` 属性，但是并没有被 `for...in` 遍历到，是因为 `toString` 默认是不可遍历的。

如果需要遍历自身属性，而非继承属性，依然配合 `hasOwnProperty` 方法。

``` JS
const person = {
    name: '小明'
}
person.__proto__.age = 16;
for (let key in person) {
    console.log('key', key);
    if (person.hasOwnProperty(key)) {
        console.log('OwnKey', key);
    }
}

// key name
// OwnKey name
// key age
```

### Array 数组

数组是一种类似列表的对象，本质上是一种特殊的对象，它的原型提供了遍历和修改元素的相关操作。

``` JS
typeof [1, 2, 3] // "object"
```

Object.keys 方法同样适用于返回数组的所有键值

``` JS
Object.keys([1, 2, 3])
// ["0", "1", "2"] 返回所有键名
```

JavaScript 使用一个32位整数，所以数组的成员最大只有 （232 - 1）个

#### 数组的 `length` 属性可读可写

``` JS
var arr = ['a', 'b', 'c'];
arr.length // 3

arr.length = 2; // 删除已有
arr // ["a", "b"]

arr.length = 4 // 添加空位
arr[3] // undefined
aar // ["a", "b", empty*2]
```

数组的 `length` 取数组的所以整数键名+1

``` JS
const a1 = [];
a1['name'] = 'abc'; // 数组是对象，所以可以添加任意属性
a1.length // 0; 因为a1 数组没有整数键，所有长度还是0
```

#### in 运算符也适用于数组

``` JS
const a2 = [];
a2.length = 100; // 添加了0-99共100个空位
a2[100] = 'abc';

100 in a2; // true
0 in a2; // false  数组的为空位，in 返回false
```

#### for... in 遍历数组键名

for... in 不仅遍历数子键，还遍历其他类型键， 会跳过空位

``` JS
const a3 = [1, 2, 3, 4];
a3.name = "age";
for (let key in a3) {
    console.log(key)
}
// 0
// 1
// 2
// 3
// name
```

数组的遍历，用for或while循环

``` JS
for (let i = 0; i < a3.length; i++) {
    console.log(a3[i])
}
// while 循环
let i = a3.length;
while (i--) {
    console.log(a3[i])
}
```

#### 数组的空位

两个逗号之间没有任何值，称之为空位。

``` JS
const a4 = [1, , , , 3];
a4.length // 5 
a4.length = 6; // [1,,,,3,,] 添加一个空位
a4[5] // undefined

delete a4[0]; // 删除一个数组成员，会形成空位
a4; // [,,,,,3,,]
```

* 空位不影响 length 值，会将空位计算在内
* 空位是可读取的，值为 undefined
* delete 删除一个数组成员，会形成空位，不影响length属性
* 数组的forEach方法、for... in结构、以及Object.keys方法进行遍历，空位都会被跳过；值为undefined 的位置就不会被跳过

#### 类数组

具有length属性就可以视为类似数组，可以用方括号的方法取值，然而类数组不具备数组的其他方法。

典型的类数组：

* 函数的 arguments
* dom 元素集，比如 document.querySelectAll()
* 字符串

``` JS
// 转化为真正的数组
Array.prototype.slice.call("hello"); // ["h","e","l","l","o"]

// 同理借用数组的 forEach 方法
Array.prototype.forEach.call("hello") // 效率比数组原生的forEach慢，先转为真正的数组再使用forEach
```

### Function 函数

* 函数是一段可以反复调用的代码块。函数可以接受参数，不同的参数返回不同的值。
* 函数是Javascript的一等公民，它们可以像任何其他对象一样具有属性和方法。它们与其他对象的区别在于函数可以被调用。简而言之，它们是Function对象。

#### 函数的声明

函数声明有 3 种方法:

1. function 命令，这种形式创建的函数也叫 **函数声明**

``` JS
function foo1(s) {
    console.log(s)
}
```

2. 函数表达式

``` JS
const foo2 = function() {
    console.log(s)
}
```

3. Function 构造函数

... 

###### 同一个函数被多次声明，后面的声明就会覆盖前面的

#### 圆括号运算符、return 语句 和 递归

* 函数名对应函数体，函数名后面紧跟一对圆括号()，就会调用这个函数
* `return` 语句所带的那个表达式，就是函数的返回值
* 如果没有 `return` ，该函数就不返回任何值，或者说返回undefined
* 函数可以调用自身，这就是递归（recursion）

#### 函数声明的函数，函数体一并提升到代码块头部

``` JS
var f = function() { // 函数表达式不提升
    console.log('1');
}

function f() { // 提升到头部
    console.log('2');
}

f() // 1
```

#### 函数属性和方法

* name 属性返回函数名

``` JS
function f1() {}
f1.name // "f1"

const f2 = function() {} // 匿名函数
f2.name // "f2"

const f3 = function myName() {} // 具名函数
f3.name // "myName"
```

* length 属性返回函数定义时参数的个数

``` JS
function f4(a, b) {}
f4.length; // 2
```

length属性提供了一种机制，判断定义时和调用时参数的差异，以便实现面向对象编程的“方法重载”（overload）

#### toString() 返回一个内容是函数的源码的字符串

todo：更多用途... 

####  函数执行时的作用域，是定义时的作用域

``` JS
const a = 1;
const x = function() {
    console.log(a);
};

function f() {
    const a = 2;
    x(); // 函数X的作用域在定义的时候逐层向上寻找
}

f() // 1 ;函数F调用函数X，函数X不会引用函数F的内部变量
```

#### 自由变量

一个变量在当前作用域没有定义，但被使用了，称之为自由变量
将逐层想上级作用域寻找，直到找到为止
如果到全局作用域还是没有找到，报错 xx is undefined

#### 参数

``` JS
function f(a, a, b) {
    return [a, b];
}

f(1) // [undefined, undefined] 有同名参数，取最后出现的那个值
f(1, 2, 3) // [2,3] 
f(undefined, 2, 3) // [2,3]

f.length // 3 length只与定义时的参数个数有关
```

函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递。在函数体内修改参数值，不会影响到函数外部。

如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递。体内修改参数值，同时会修改外部。

``` JS
const obj = {
    p: 1
}; // 对象作为参数，函数内部修改参数会改变引用

function f(o) {
    o.p = 2; // 执行时，这条语句分解为 1.声明一个新的环境变量 o 2.将传递进来的对象obj赋值给o 3.修改环境变量o的属性p
}
f(obj);

obj.p // 2
```

``` JS
const p = 1;

function f(o) {
    o = 2; // 原始类型值作为参数，函数内部修改的时原始值的拷贝，并不会改变参数
}
f(p);

p // 1
```

#### arguments 对象

用于在函数体内部读取所有参数

``` JS
function f() {
    return arguments.length; //arguments.length 读取函数调用时参数的个数
}
f.length; // 读取函数定义时参数的个数
```

#### 闭包

定义：函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。

闭包可以让你从内部函数访问外部函数作用域。在 `JavaScript` 中，每当函数被创建，就会在函数生成时生成闭包。

``` JS
function f1() {
    var n = 999;

    function f2() {
        console.log(n);
    }
    return f2; // 外部函数通过f2函数可以获取f1函数的内部变量n
    // 函数f2和变量n构成一个闭包(closure)
}

var result = f1();
result(); // 999
```

闭包的可以理解为函数携带了一个背包，背包中时函数声明时作用域内的所有变量；

既然局部变量所在的环境还可以被外部访问，那这个局部变量就有了不被销毁的理由。

``` JS
function createIncrementor(start) { // start是函数createIncrementor内部变量
    return function() { // 闭包保留了start的状态
        return start++;
    };
}

var inc = createIncrementor(5); //调用了使得createIncrementor内部环境一直存在

inc() // 5
inc() // 6 // 每一次调用都是在上次调用的基础上运算
inc() // 7
```

闭包的两个作用：

* 封装变量
* 延续了局部变量的寿命

应用场景非常广，待续《闭包与高阶函数》

#### 立即执行函数（IIFE）

有时，我们需要在定义函数之后，立即调用该函数。

``` JS
function() {
    /* code */
}(); // SyntaxError: Unexpected token
```

不能在函数的定义之后加上圆括号，因为 `function` 关键字出现在行首，JavaScript引擎一律解释为语句，语句后面跟 `()` 是语法错误。

解决方法是：
解决方法就是不要让 `function` 出现在行首，让引擎将其理解成一个**表达式**，行尾的分号必不可少。

``` JS
// 常用写法
(function() {
    /* code */
})();
// 或者
(function() {
    /* code */
}());
! function() {
    /* code */
}();
~ function() {
    /* code */
}(); -
function() {
    /* code */
}(); +
function() {
    /* code */
}();
```

* 立即执行函数 内部形成一个单独的作用域，可以封装一些外部

