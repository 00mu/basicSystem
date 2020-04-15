# 02 函数作用域与闭包
10个前端面试者，5个死在闭包上... 

江湖传言都是骗人的，我们来默念：闭包是基础，闭包并不难 x 3

不着急，从头开始一条条往下捋。

### 1. 函数

函数是 `Function` 对象可以像任何其他对象一样拥有属性和方法，并且函数还可以被调用。这奠定了它作为 JavaScript 的『一等公民』地位。

#### 1.1 函数的创建形式

1. 函数声明

声明前置，执行时被提升到当前作用域的顶部，可在定义之前被使用。

``` JS
function name([param[, param[, ...param]]]) {
    statements
}
```

2. 函数表达式

``` JS
// 形式1
var myFunction = function name([param[, param[, ...param]]]) {
    statements
}

// 形式2 ，立即调用函数表达式
(function() {
    statements
})();

// 形式3，箭头函数表达式
([param][, param]) => {
    statements
}
param => expression
```

3. Function 构造器

并不推荐使用这一方式，函数体作为字符串不利于JS引擎优化。

``` JS
new Function(arg1, arg2, ...argN, functionBody)
```

#### 1.2 函数的调用方式

1. 直接调用

``` JS
foo();
```

2. 对象方法

``` JS
o.method();
```

3. 构造器

``` JS
new Foo();
```

4. call/apply/bind

``` JS
func.call(o);
```

### 2. 作用域

作用域指的是变量可以被使用的范围。JS 一共有三中作用域（第四种eval不用关心）：

* 全局作用域
* 块级作用域
* 函数作用域

作用域比较简单，只是容易引起误解。

``` JS
let a1 = 0;

function fn1() {
    let a2 = 10;

    function fn2() {
        let a3 = 100;

        function fn3() {
            let a4 = 100;
            console.log(a1 + a2 + a3 + a4);
        }
        fn3();
    }
    fn2();
}
fn1();
```

<img :src="$withBase('/scope.png')">

在函数fn3中，当前作用域没有定义变量a1、a2、a3却使用了，称它们**自由变量**。对自由变量将沿着红框逐层向外寻找，如果直到全局环境依然没有找到，就会抛出错误『XX is not defined』。

### 3. 执行上下文（Execution Context）

一个函数被执行一万次，就会创建一万个执行上下文。执行上下文是一个类似栈（后进先出）的结构。

``` JS
let a1 = 0;
console.log(1)

function fn1() {
    console.log(2)
    let a2 = 10;

    function fn2() {
        console.log(3)
        let a3 = 100;

        function fn3() {
            console.log(4)
            let a4 = 100;
            console.log(a1 + a2 + a3 + a4);
        }
        fn3();
        console.log(5)
    }
    fn2();
    console.log(6)
}
fn1();
console.log(7)
```

输出结果一眼就能看出来，对不对？都知道JS是单线程的，那它是如何一步步执行的呢，为了加深音箱我们来模拟一下。

1. JS引擎总是从全局环境开始，从上到下逐行执行。首先把Gloable环境压入栈底，控制器开始执行其中的可执行代码，遇到执行函数fn1()立马激活函数fn1创建它的执行上下文。
2. 将fn1的执行上下文入栈，控制器继续执行其中的可执行代码，遇到可执行函数fn2，激活fn2的执行上下文并入栈
3. fn2从上到下依次执行遇到fn3，创建一个fn3的上下文入栈

4.fn3执行到 `}` 或者return就出栈销毁fn3的上下文环境，控制权交给fn2往下之下，执行完毕弹出fn2销毁其上下文环境退回到fn1，依次直至执行栈清空

#### 新的问题，JS解释器如何找到我们定义的函数和变量？

有一个抽象概念的**变量对象**（Variable Object），它用来存储执行上下文中的：

1. 变量
2. 函数声明
3. 函数参数

全局作用下，VO===this===globle

``` JS
var a = 10;

function test(x) {
    var b = 20;
}
test(30);

// 以上代码会产生两个VO
VO（ globalContext） = {
    a: 10,
    test: < ref to
    function >
};
VO(test functionContext) = {
    x: 30,
    b: 20
}
```

变量初始化，VO会按照如下顺序填充变量：

1. 函数参数（若为传入初始化该参数值为undefined）
2. 函数声明（若发生命名冲突，会覆盖）
2. 变量声明（若发生命名冲突，会忽略）

``` JS
function test(a, b) {
    var c = 10;
    console.log('变量初始化阶段：',a,b,c,d,e) // 变量初始化阶段： 20 undefined 10 ƒ d() {console.log(2)} undefined
    function d() {console.log(1)};
    function d() {console.log(2)};
    var e = function _e() {};
    b = 20;
    console.log('函数体执行完毕：',a,b,c,d,e) //函数体执行完毕： 20 20 10 ƒ d() {console.log(2)} ƒ _e() {}
}
test(20)

// 变量初始化阶段
AO(test) = {
    a: 20,
    b: undefined,
    c: undefined,
    d: < ref to func "d" > ,
    e: undefined
}

// 执行阶段
...
```

看例子

``` JS
alert(x); // function x(){} 解释：1. 声明函数x提前

var x = 10; // 解释：2. 忽略x声明，直接赋值
alert(x); // 10
x = 20;

function x() {};
alert(x); // 20

if (true) {
    var a = 1; // 解释：3. a声明提前
} else {
    var b = true; // 解释：4. b 声明提前
}

alert(a); // 1
alert(b); // undefined

// 等价于
let x = function x() {};
let a = undefined;
let b = undefined;

alert(x);
x = 10;
alert(x);
x = 20;
alert(x);
a = 1;
alert(a);
alert(b);
```

### 4.this

this，是一个拥有巨大灵活性的家伙

`this` 的取值是在执行的时候确定的，就是运行时所在的环境。注意区分变量是声明的时候确定的。

1. 普通函数的 this：指向顶层对象 window，也就是全局环境
1. 作为对象方法的函数的 this：指向调用方法所在的对象
1. 构造函数中的 this：指向实例对象
1. get、set方法中的 this：指向所在的对象
1. 构造器中的 this：指向所在的对象

改变this指向的方法:

1. fn.call(o, args1, args2,...)
1. fn.apply(o, [args1, args2,...])
2. fn.bind(o)

### 5. 闭包

闭包是指一个函数或函数的引用，与一个引用环境绑定在一起。这个引用环境是一个存储该函数每个自由变量的表。

如何一眼识别出来闭包？简单来说函数执行的地方并不在定义的地方。两种典型的情况：

1. 函数作为返回值
2. 函数作为参数

闭包的两个作用：

1. 封装变量
2. 延长局部变量寿命

再简而言之，闭包里的函数取闭包里的值，闭包里的值来自函数定义的时候。

闭包并不难对不对，闭包是高阶函数的基础，有点难... 

