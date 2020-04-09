# 01 数据类型转换

先来看个例子，一眼看过去明白在说什么，那你这篇你就可以跳过了

``` JS
typeof NaN // "number"
typeof null // "object"

0.1 + 0.5 === 0.6 // true
0.1 + 0.2 === 0.3 // false

[5] + [] // 5
[] + {} // "[object Object]""
{} + [] // 0
```

一个弱类型的语言，一个可以随时变换类型的语言，一个等到运行时才能知晓类型的动态语言，一棵面试中的常青树... 

先让我们看看数据类型的最初的面目，最粗暴直接的莫过于强制转换了。

### 强制转换

通过 Number()、String()、Boolean() 三个工具函数，手动将各种类型的值转换为数字、字符串、布尔值。

#### 1. Number()

##### 1.1 原始类型 -> Number

``` JS
// 数值：转换后还是原来的值
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0

// NaN 依然是 NaN
Number(NaN) // NaN
```

##### 1.2 对象 -> Number

对象转数值，背后有一套复杂的转换规则：

1. 调用 obj.valueof()，如果返回原始类型的值则直接使用 Number() 转换完毕，否则继续
2. 继续调用 obj.toString()，如果返回原始类型的值则直接使用 Number() 转换完毕，否则报错返回 NaN

原生对象大多valueof返回对象本身，大多数自定义了toString方法，而真正可以用与 Number() 大约只有包含了单个数值（或者空）的数组，其他对象均转为NaN

``` JS
Number({}) // NaN
Number([1, 2]) // NaN
Number([2]) // 2
Number([]) // 0
```

过程虽复杂，结论却简洁 ↑。

### 2. String()

#### 2.1 原始值 -> String

自身加个引号，就是对应的String类型了。

``` JS
String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"
```

#### 2.2 对象 -> String

String(obj) 背后的规则和 Number(obj) 几乎相同， Number(obj)先valueof再toString; String(obj) 反过来先toString再valueof。

1. 调用 obj.toString()，如果返回原始类型的值则直接使用 String() 转换完毕，否则继续
2. 继续调用 obj.valueof()，如果返回原始类型的值则直接使用 String() 转换完毕，否则报错返回 

``` JS
String({}) // "[object Object]"
String([]) // ""
String([1]) // "1"
String([1, 2, 3]) // "1,2,3"
String(["a", 'b', 'c']) // "a,b,c"
```

结论可以简单总结为，对象转换为类型字符串，数组转换为字符串形式。

### 3. Boolean()

布尔值比较直接，没有原始类型和对象的区别。只有以下6种情况会被转为false，其他全为true。

1. undefined
2. null
3. NaN
4. false
5. ""
6. 0(+0, -0)

``` JS
Boolean({}) // true
Boolean([]) // true
```

### 隐式转换（自动转换）

不同与强制转换的手动控制，JavaScript 总是在某些时候偷偷摸摸去做一些转换的事情，这就... 

如果知道什么时候会偷偷摸摸干坏事，那就留心盯紧它。

JavaScript 自动转换的原则是，**预期是什么类型的值，就转换的什么类型**。听起来有些绕，具体看下它再什么场景会产生『预期』的欲望。

#### 场景1. 自动转换为布尔值

* if(expression) 语句
* expression ? true : false
* !!expression

#### 场景2. 比较运算符

`==`、`\>`、`>=`、`<=`：

左右两边进行比较的时候，**先转换为 Number 再比较大小**。

> == 运算符仅使用于 abc ==null (abc === null && abc == undefined) 这一情况，<br/>其他场合都应该使用 === 全等运算符。全等先进行类型比较。

#### 场景3. + 加号运算符

1. 数字 + 一切：一切先转为数字再相加
2. 其他 + 一切 ：两边都转换为字符串再拼接
3. + 一切 （一元运算符的加号）：一切转化为数字

#### 场景4. 其他算术运算符

`-` 、`*` 、`/` 和 `%` ，两边都会转化为数字
``` JS
// 一元运算符，转化为数字
+ 'abc' // NaN
+ true // 1
- false // 0

'5' * [2] // 10
null - false // 0

{} + [] // 0; JavaScript 引擎把{}当做空代码块，不做处理
({}) + [] // "[object Object]"
[] + {} // "[object Object]"
```


太阳底下无新事，掰开揉碎了就是这么点事儿。再看会例子~

``` JS
(!+[]+[]+![]).length
```
分析：然而这道题的考察重点并不在于类型转换，而是 [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

1. 这道题优先级：圆括号 > 逻辑非（从右到左）> 一元加法（从右到左）> 加法（从左到右）
2. `((!(+[]))+[]+(![])).length` -> `((!0)+[]+false).length` -> `(true + [] + false).length` -> `"trueflase".length` -> 9