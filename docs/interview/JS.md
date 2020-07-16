# JavaScript

<!-- [[toc]] -->

原理题怎么答？我带你们答。

回答流程如下：

1. 如果是英文词汇就先翻译成中文
2. 一句话描述该技术的用途
3. 描述该技术的核心概念或运作流程
4. 口述该技术的代码书写思路
5. 该技术的优点
6. 该技术的缺点
7. 如何弥补缺点

## JS 基础

1. ### ['1', '2', '3'].map(parseInt) what & why

   > 真正的答案是[1, NaN, NaN]

   map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

   parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。

   题目等价与

   ```JS
   ['1', '2', '3'].map((item, index) => {
     return parseInt(item, index)
   })

   // parseInt('1', 0) // 1
   // parseInt('2', 1) // NaN
   // parseInt('3', 2) // NaN, 3 不是二进制

   ['10','10','10','10','10'].map(parseInt);
   // [10, NaN, 2, 3, 4]

   // 如果您实际上想要循环访问字符串数组, 该怎么办？ map()然后把它换成数字？使用编号
   ['10','10','10','10','10'].map(Number);
   // [10, 10, 10, 10, 10]
   ```

2. ### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

   - Set
     - 成员唯一、无序且不重复
     - [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
     - 可以遍历，方法有：add、delete、has
   - WeakSet
     - 成员都是对象
     - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏
     - 不能遍历，方法有 add、delete、has
   - Map
     - 本质上是键值对的集合，类似集合
     - 可以遍历，方法很多可以跟各种数据格式转换
   - WeakMap
     - 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
     - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
     - 不能遍历，方法有 get、set、has、delete

3. ### ES5/ES6 的继承除了写法以外还有什么区别？

   1. class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量
   2. class 声明内部会启用严格模式
   3. class 的所有方法（包括静态方法和实例方法）都是不可枚举的
   4. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用
   5. 必须使用 new 调用 class
   6. class 内部无法重写类名

4. ### 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

   > Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

   - Object.prototype.toString.call()

     每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文。

     这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。

   - instanceof

     instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype

     但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

   - Array.isArray()

     ES5 新增语法，用来判断对象是否为数组，性能更好

5. ### 下面的代码打印什么内容，为什么（作用域）

   1. 下面的代码打印什么内容

   ```JS
   var b = 10;
   (function b(){
     // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
     // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
     // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
       b = 20;
       console.log(b);
   })();

   // 输出
   function b(){
       b = 20;
       console.log(b);
   }
   ```

   2. 简单改造下面的代码，使之分别打印 10 和 20

   ```JS
   var b = 10;
   (function b(){
       b = 20;
       console.log(b);
   })();

   // 改造
   var b = 10;
   (function b(){
       var b = 20;
       console.log(this.b);
       console.log(b);
   })();
   // 10 20
   ```

   3. 下面代码输出什么？

   ```JS
    var a = 10;
    (function () {
        console.log(a)   // undefined， 因为var a = 20;中a变量提升
        a = 5
        console.log(window.a)  // 10
        var a = 20;
        console.log(a) // 20
    })()

    // 输出

   ```

6. ### 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

   sort 函数，可以接收一个函数，返回值是比较两个数的相对顺序的值

   1. 默认没有函数 是按照 UTF-16 排序的，对于字母数字 你可以利用 ASCII 进行记忆

   ```JS
   [3, 15, 8, 29, 102, 22].sort();

   // [102, 15, 22, 29, 3, 8]
   ```

   2. 带函数的比较的话

   ```JS
    [3, 15, 8, 29, 102, 22].sort((a,b) => a - b);

    //输出
    [3, 8, 15, 22, 29, 102]
   ```

7. ### 输出以下代码执行的结果并解释为什么(Arraylike)

   ```JS
   var obj = {
       '2': 3,
       '3': 4,
       'length': 2,
       'splice': Array.prototype.splice,
       'push': Array.prototype.push
   }
   obj.push(1)
   obj.push(2)
   console.log(obj)

   //输出
   [,,1,2]
   ```

   解释：一个对象的 length 属性为数字，同时 splice 属性为函数时， 对象的函数输出结果就会变成 伪数组。

   push 方法根据数组的 length 来根据参数给数组创建一个下标为 length 的属性

8. ### call 和 apply 的区别是什么，哪个性能更好一些

   1. Function.prototype.apply 和 Function.prototype.call 的作用是一样的，区别在于传入参数的不同；
   2. 第一个参数都是，指定函数体内 this 的指向；
   3. 第二个参数开始不同，apply 是传入带下标的集合，数组或者类数组，apply 把它传给函数作为参数，call 从第二个开始传入的参数是不固定的，都会传给函数作为参数。
   4. call 比 apply 的性能要好，平常可以多用 call, call 传入参数的格式正是内部所需要的格式，相比 apply 少了一次参数解构的过程

9. ### 输出以下代码的执行结果并解释为什么

   ```JS
   var a = {n: 1};
   var b = a;
   a.x = a = {n: 2};

   console.log(a.x) // undefined
   console.log(b.x) // {n:2}
   ```

   - `·`的优先级高于 `=` 的优先级
   - `=` 具有右结合性（执行的方向是从右往左，先执行 `=` 右边的表达式，然后把结果赋值给 `=` 左边的表达式，从这里可以得出 `=` 属于二元操作符），多个 `=` 的执行过程，可以类比成"递归"的过程

   .运算符优先，a.x 此时保持对{n: 1}的引用，也就是 b 也保持对{n: 1}的引用，于是{n: 1} => {n: 1, x: undefined}，此时 a 和 b 还是对原来对象的引用，只不过原来对象增加了 x 属性 2、=从右往左，a = {n: 2}，此时 a 的引用已经变成了{n: 2}这个对象 3、a.x=a，此时 a.x 是保持对{ n: 1, x: undefined}中的 x 引用，也就是 b.x，于是{ n: 1, x: undefined} => {n: 1, x: { n: 2}}，即 b.x = { n: 2 }

10. ### 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

    箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

    1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

    2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

    3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

    4、不可以使用 new 命令，因为：

    没有自己的 this，无法调用 call，apply。

    没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 **proto**

    ```JS
    // new
    function newFunc(father, ...rest) {
    var result = {};
    result.__proto__ = father.prototype;
    var result2 = father.apply(result, rest);
    if (
      (typeof result2 === 'object' || typeof result2 === 'function') &&
      result2 !== null
    ) {
      return result2;
    }
    return result;
    }
    ```

11. ### a.b.c.d 和 a['b']['c']['d']，哪个性能更高？

    a.b.c.d 比 a['b']['c']['d'] 性能高点，后者还要考虑 [ ] 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。

12. ### ES6 代码转成 ES5 代码的实现思路是什么

    - 将代码字符串解析成抽象语法树，即所谓的 AST
    - 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
    - 根据处理后的 AST 再生成代码字符串

13. ### 为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因

    for 循环没有任何额外的函数调用栈和上下文；

    forEach 函数签名实际上是

    array.forEach(function(currentValue, index, arr), thisValue)

    它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来，这里可能拖慢性能；

14. ### 数组里面有 10 万个数据，取第一个元素和第 10 万个元素的时间相差多少

    数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

15. ### 输出以下代码运行结果

    ```JS
    // example 1
    var a={}, b='123', c=123;
    a[b]='b';
    a[c]='c';
    console.log(a[b]); // 'c', 因为123作为键名会转化为"123"，覆盖掉a['123']="b"

    ---------------------
    // example 2
    var a={}, b=Symbol('123'), c=Symbol('123');
    a[b]='b';
    a[c]='c';
    console.log(a[b]);  // 'b', 任何Symbol都是唯一的

    ---------------------
    // example 3
    var a={}, b={key:'123'}, c={key:'123'};
    a[b]='b';
    a[c]='c';
    console.log(a[b]); //'c' ,对象tostring后一样，覆盖掉
    ```

    这题考察的是对象的键名的转换。

    - 对象的键名只能是字符串和 Symbol 类型。
    - 其他类型的键名会被转换成字符串类型。
    - 对象转字符串默认会调用 toString 方法。

16. ### input 搜索如何防抖，如何处理中文输入

    ```HTML
    <input id='myinput'>
    ```

    ```JS
        function jeiliu(timeout){
            var timer;
            function input(e){
            if(e.target.composing){
                return ;
            }
            if(timer){
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
                  console.log(e.target.value);
                  timer = null;
              }, timeout);
            }
            return input;
        }

        function onCompositionStart(e){
            e.target.composing = true;
        }
        function onCompositionEnd(e){
            //console.log(e.target)
            e.target.composing = false;
            var event = document.createEvent('HTMLEvents');
            event.initEvent('input');
            e.target.dispatchEvent(event);
        }
        var input_dom = document.getElementById('myinput');
        input_dom.addEventListener('input',jeiliu(1000));
        input_dom.addEventListener('compositionstart',onCompositionStart);
        input_dom.addEventListener('compositionend',onCompositionEnd);
    ```

17. ### var、let 和 const 区别的实现原理是什么

    1. 声明过程：

       1. let 的「创建」过程被提升了，但是初始化没有提升。
       2. var 的「创建」和「初始化」都被提升了。
       3. function 的「创建」「初始化」和「赋值」都被提升了。

    2. 内存分配

       1. var，会直接在栈内存里预分配内存空间，然后等到实际语句执行的时候，再存储对应的变量，如果传的是引用类型，那么会在堆内存里开辟一个内存空间存储实际内容，栈内存会存储一个指向堆内存的指针
       2. let，是不会在栈内存里预分配内存空间，而且在栈内存分配变量时，做一个检查，如果已经有相同变量名存在就会报错
       3. const，也不会预分配内存空间，在栈内存分配变量时也会做同样的检查。不过 const 存储的变量是不可修改的，对于基本类型来说你无法修改定义的值，对于引用类型来说你无法修改栈内存里分配的指针，但是你可以修改指针指向的对象里面的属性

    3. 变量提升，都会进行变量提升 [理解 let](https://zhuanlan.zhihu.com/p/28140450)

    要搞清楚提升的本质，需要理解 JS 变量的 3 步骤『创建 create、初始化 initialize 和赋值 assign』

    > 有的地方把创建说成是声明（declare），为了将这个概念与变量声明区别开，我故意不使用声明这个字眼。

    ::: details 重新理解 变量提升 和 暂时性死区

    let、const 是否会变来拿给你提升？为什么会有暂时性死区？从提升的本质说起，从理解 JS 变量的 3 步骤『创建 create、初始化 initialize 和赋值 assign』开始：

    1. **我们来看看 var 声明的「创建、初始化和赋值」过程**

    ```JS
    function fn(){
      var x = 1
      var y = 2
    }
    fn()
    ```

    在执行 fn 时，会有以下过程（不完全）：

    1. 进入 fn，为 fn 创建一个环境。
    2. 找到 fn 中所有用 var 声明的变量，在这个环境中「创建」这些变量（即 x 和 y）。
    3. 将这些变量「初始化」为 undefined。
    4. 开始执行代码
    5. x = 1 将 x 变量「赋值」为 1
    6. y = 2 将 y 变量「赋值」为 2

    ```JS
    console.log(a); // undefined，因为此时赋值还没开始
    var a = 10;
    ```

    2. **接下来来看 function 声明的「创建、初始化和赋值」过程**

    ```JS
    fn2()
    function fn2(){
      console.log(2)
    }
    ```

    JS 引擎会有一下过程：

    1. 找到所有用 function 声明的变量，在环境中「创建」这些变量。
    2. 将这些变量「初始化」并「赋值」为 function(){ console.log(2) }。
    3. 开始执行代码 fn2()

    也就是说 **function 声明会在代码执行之前就「创建、初始化并赋值」**。

    3. **接下来看 let 声明的「创建、初始化和赋值」过程**

    ```JS
    {
      let x = 1
      x = 2
    }
    ```

    我们只看 {} 里面的过程：

    1. 找到所有用 let 声明的变量，在环境中「创建」这些变量
    2. 开始执行代码（注意现在还没有初始化）
    3. 执行 x = 1，将 x 「初始化」为 1（这并不是一次赋值，如果代码是 let x，就将 x 初始化为 undefined）
    4. 执行 x = 2，对 x 进行「赋值」

    这就解释了为什么在 let x 之前使用 x 会报错：

    ```JS
    let x = 'global'
    {
      console.log(x) // Uncaught ReferenceError: x is not defined
      let x = 1
    }
    ```

    原因有两个：

    1. console.log(x) 中的 x 指的是下面的 x，而不是全局的 x
    2. 执行 log 时 x 还没「初始化」，所以不能使用（也就是所谓的暂时死区）

    看到这里，你应该明白了 let 到底有没有提升：

    1. let 的「创建」过程被提升了，但是初始化没有提升。
    2. var 的「创建」和「初始化」都被提升了。
    3. function 的「创建」「初始化」和「赋值」都被提升了。

    这也是 `var`、`function`、`let`、`const` 提升的的区别

    做个练习考察考察掌握的情况：

    ```JS
    // 练习1
    var foo
    function foo(){}
    console.log(foo)  // 输出函数

    // 练习2
    function foo(){}
    var foo
    console.log(foo)  // 依然输出函数，因为function已经完成了赋值，忽视var创建和初始化过程

    // 练习3
    var foo = 100
    function foo(){}
    console.log(foo)  // 100，因为foo声明优先var，var在后面又进行了赋值，覆盖了function的值

    // 练习4
    function foo(){}
    let foo
    console.log(foo)  // Uncaught SyntaxError: Identifier 'foo' has already been declared
    //
    ```

    5. **最后看 const，其实 const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程**

    所谓暂时死区，就是不能在初始化之前，使用变量。

    :::

18. ### 介绍下前端加密的常见场景和方法

    首先，加密的目的，简而言之就是将明文转换为密文、甚至转换为其他的东西，用来隐藏明文内容本身，防止其他人直接获取到敏感明文信息、或者提高其他人获取到明文信息的难度。

    通常我们提到加密会想到密码加密、HTTPS 等关键词，这里从场景和方法分别提一些我的个人见解。

    #### 场景-密码传输

    前端密码传输过程中如果不加密，在日志中就可以拿到用户的明文密码，对用户安全不太负责。

    这种加密其实相对比较简单，可以使用 PlanA-前端加密、后端解密后计算密码字符串的 MD5/MD6 存入数据库；也可以 PlanB-直接前端使用一种稳定算法加密成唯一值、后端直接将加密结果进行 MD5/MD6，全程密码明文不出现在程序中。

    #### 场景-数据包加密

    你的网页数据包被抓取->在数据包到达你手机之前被篡改->你得到了带网页广告的数据包->渲染到你手机屏幕。

    而 HTTPS 进行了包加密，就解决了这个问题。严格来说我认为从手段上来看，它不算是一种前端加密场景；但是从解决问题的角度来看，这确实是前端需要知道的事情。

    #### 场景-展示成果加密

    经常有人开发网页爬虫爬取大家辛辛苦苦一点一点发布的数据成果，有些会影响你的竞争力，有些会降低你的知名度，甚至有些出于恶意爬取你的公开数据后进行全量公开……比如有些食谱网站被爬掉所有食谱，站点被克隆；有些求职网站被爬掉所有职位，被拿去卖信息；甚至有些小说漫画网站赖以生存的内容也很容易被爬取。

    将文本内容进行展示层加密，利用字体的引用特点，把拿给爬虫的数据变成“乱码”。

    > 举个栗子：正常来讲，当我们拥有一串数字“12345”并将其放在网站页面上的时候，其实网站页面上显示的并不是简单的数字，而是数字对应的字体的“12345”。这时我们打乱一下字体中图形和字码的对应关系

19. ### 写出如下代码的打印结果 （形参传递）

    ```JS
    function changeObjProperty(o) {
      o.siteUrl = "http://www.baidu.com"
      o = new Object()
      o.siteUrl = "http://www.google.com"
    }
    let webSite = new Object();
    changeObjProperty(webSite);
    console.log(webSite.siteUrl); // http://www.baidu.com
    ```

    分析：函数执行上下文的时候，会创建一个对象接受参数，参数如果是原始类型则是值的拷贝，参数如果是对象则是对象的引用；执行函数的过程是这样的

    ```JS
    changeObjProperty(webSite);

    function changeObjProperty(o) {
      var o = webSite; // 最先执行，初始化形参值为webSite
      // 如果对o的属性修改，也会改变形参
      // 如果对o重新赋值，则对webSite毫无影响； 这一点和变量赋值是一致的
      ...
    }
    ```

20. ### 请写出如下代码的打印结果（原型链）

    ```JS
    function Foo() {
        Foo.a = function() {
            console.log(1)
        }
        this.a = function() {
            console.log(2)
        }
    }
    // 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行
    Foo.prototype.a = function() {
        console.log(3)
    }
    // 现在在 Foo 上挂载了原型方法 a ，方法输出值为 3
    Foo.a = function() {
        console.log(4)
    }
    // 定义Foo 上的 a 方法
    Foo.a();
    // 立刻执行了 ， # 输出 4
    let obj = new Foo();
    /* 这里调用了 Foo 的构建方法。Foo 的构建方法主要做了两件事：
    1. 将全局的 Foo 上的直接方法 a 替换为一个输出 1 的方法。
    2. 在新对象上挂载直接方法 a ，输出值为 2。
    */
    obj.a();
    // 因为有直接方法 a ，不需要去访问原型链，所以使用的是构建方法里所定义的 this.a，
    // # 输出 2
    Foo.a();
    // 构建方法里已经替换了全局 Foo 上的 a 方法，所以
    // # 输出 1
    ```

21. ### 分别写出如下代码的返回值 （隐式类型转换）

    ```JS
    String('11') == new String('11');   // true
    String('11') === new String('11');  // false
    ```

    `==` 的时候做了隐式转换，调用了 toString，实际运行的是 `String('11') == new String('11').toString()`;

    2 者类型不一样，一个是 string，一个是 object

22. ### 请写出如下代码的打印结果（变量提升）

    ```JS
    var name = 'Tom';
    (function() {
        if (typeof name == 'undefined') {
            var name = 'Jack';
            console.log('Goodbye ' + name);
        } else {
            console.log('Hello ' + name);
        }
    }
    )();

    // Goodbye Jack
    ```

    分析：

    自执行函数内部 var name = 'Jack'变量提升并初始化为 undefined，so 结束

    扩展题，请写出如下代码的打印结果（上一道的拓展）

    ```JS
    var name = 'Tom';
    (function() {
        if (typeof name == 'undefined') {
            name = 'Jack';
            console.log('Goodbye ' + name);
        } else {
            console.log('Hello ' + name);
        }
    }
    )();
    // Hello Tom
    ```

    分析： name 只是重新赋值没有提升变量

23. ### 输出以下代码运行结果（类型转换）

    ```JS
    1 + "1" // '11'

    2 * "2" // 4

    [1, 2] + [2, 1] // "1,22,1"

    "a" + + "b" // "aNaN"
    ```

- 加性操作符：如果有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来

      如果是对象，先调用 valueOf 方法，如果不是数值，再调用 toString 方法

- 乘性操作符：如果有一个操作数不是数值，则在后台调用 Number()将其转换为数值

- "a" + + "b"，后边的“+”将作为一元操作符，如果操作数是字符串，将调用 Number 方法将该操作数转为数值，如果操作数无法转为数值，则为 NaN

25. ### 为什么 for 循环嵌套顺序会影响性能？

    ```JS
    var t1 = new Date().getTime()
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 1000; j++) {
        for (let k = 0; k < 10000; k++) {
        }
      }
    }
    var t2 = new Date().getTime()
    console.log('first time', t2 - t1)

    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 1000; j++) {
        for (let k = 0; k < 100; k++) {

        }
      }
    }
    var t3 = new Date().getTime()
    console.log('two time', t3 - t2) //
    ```

    两个循环次数是一样的，但是判断总次数相差很大，导致耗时差距

    1.

    - i 判断 100 次
    - j 判断 100\*1000=10 万次
    - k 判断 1 亿次

    2.

    - i 判断 1 万次
    - j 判断 1000 万次， 远远大于 1 中 j 的 10 万次
    - k 判断 1 亿次

    总结：相同循环次数，外层越大，越影响性能

26. ### 输出以下代码执行结果（任务队列 promise）

    ```JS
    function wait() {
      return new Promise(resolve =>
        setTimeout(resolve, 10 * 1000)
      )
    }

    async function main() {
      console.time();
      const x = wait();
      const y = wait();
      const z = wait();
      await x;
      await y;
      await z;
      console.timeEnd(); //略大于10s
    }
    main();
    ```

    因为这里的 xyz 都是同步任务

    再看一题：

    ```JS
    function wait() {
      return new Promise(resolve =>
        setTimeout(resolve, 10 * 1000)
      )
    }

    async function main() {
      console.time();
      await wait();
      await wait();
      await wait();
      console.timeEnd(); // 大约30s多一点
    }
    main();
    ```

27. ### 如何实现骨架屏，说说你的思路 （todo）

##异步

1. ### setTimeout、Promise、Async/Await 的区别

   主要是考察这三者在事件循环中的区别，事件循环中分为宏任务队列和微任务队列。

   - 其中 settimeout 的回调函数放到宏任务队列里，等到执行栈清空以后执行；
   - promise.then 里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；
   - async 函数表示函数里面可能会有异步方法，await 后面跟一个表达式，async 方法执行时，遇到 await 会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行

2. ### Async/Await 如何通过同步的方式实现异步

   - async/await 是参照 Generator 封装的一套异步处理方案，可以理解为 Generator 的语法糖，
   - 所以了解 async/await 就不得不讲一讲 Generator,
   - 而 Generator 又依赖于迭代器 Iterator，
   - 所以就得先讲一讲 Iterator,
   - 而 Iterator 的思想呢又来源于单向链表，

   1. 单向链表
   2. Iterator
      > Generator：生成器对象是生成器函数（GeneratorFunction）返回的，它符合可迭代协议和迭代器协议，既是迭代器也是可迭代对象，可以调用 next 方法，但它不是函数，更不是构造函数
   3. Generator

3. ### 异步笔试题，请写出下面代码的运行结果（异步 任务队列）

   ```JS
   async function async1() {
       console.log('async1 start');
       await async2();
       console.log('async1 end');
   }

   async function async2() {
       console.log('async2');
   }

   console.log('script start');

   setTimeout(function() {
       console.log('setTimeout');
   }, 0)
   async1();
   new Promise(function(resolve) {
       console.log('promise1');
       resolve();
   }).then(function() {
       console.log('promise2');
   });
   console.log('script end');
   ```

   // script start=>async1 start=>async2=>promise1=>script end=>promise2=>setTimeout

   ```

   ```

4. ### JS 异步解决方案的发展历程以及优缺点

   1. 回调函数（callback）

   - 优点：解决了同步的问题（只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。）
   - 缺点：回调地狱，不能用 try catch 捕获错误，不能 return

   2. Promise

   - 优点： 解决了回调地狱的问题
   - 缺点：无法取消 Promise ，错误需要通过回调函数来捕获

   3. Generator

   - 可以控制函数的执行，可以配合 co 函数库使用

   ```JS
   function *fetch() {
       yield ajax('XXX1', () => {})
       yield ajax('XXX2', () => {})
       yield ajax('XXX3', () => {})
   }
   let it = fetch()
   let result1 = it.next()
   let result2 = it.next()
   let result3 = it.next()
   ```

   4. Async/await

   - 优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题
   - 缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。

5. ### Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

   promise 构造函数是同步执行的，then 方法是异步执行的

6. ### 模拟实现一个 Promise.finally

```JS
window.Promise && !('finally' in Promise) && !function() {
  Promise.prototype.finally = function(cb) {
    cb = typeof cb === 'function' ? cb : function() {};

    var Fn = this.constructor;  // 获取当前实例构造函数的引用

    // 接受状态：返回数据
    var onFulfilled = function(data) {
      return Fn.resolve(cb()).then(function() {
        return data
      })
    };

    // 拒绝状态：抛出错误
    var onRejected = function(err) {
      return Fn.resolve(cb()).then(function() {
        throw err
      })
    };

    return this.then(onFulfilled, onRejected);
  }
}();

---- 简化
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

7. ### 介绍下 Promise.all 使用、原理实现及错误处理

   对于 Promise.all(arr) 来说，在参数数组中所有元素都变为决定态后，然后才返回新的 promise

   1. 使用

   ```JS
   // 以下 demo，请求两个 url，当两个异步请求返还结果后，再请求第三个 url
   const p1 = request(`http://some.url.1`)
   const p2 = request(`http://some.url.2`)
   Promise.all([p1, p2])
     .then((datas) => { // 此处 datas 为调用 p1, p2 后的结果的数组
       return request(`http://some.url.3?a=${datas[0]}&b=${datas[1]}`)
     })
     .then((data) => {
       console.log(msg)
     })
   ```

   2. Promise.all 原理实现

   ```JS
   function promiseAll(list) {
       return new Promise((resolve, reject) => {
         if(!Array.isArray(list)){
           return reject(new TypeError("argument must be anarray"))
         }
         let resValues = [];
         let counts = 0;
         let len = list.length;
         for (let i =0; i<len; i++){
             Promise.resolve(list[i]).then(res => {
                 counts++;
                 resValues[i] = res;
                 if (counts === list.length) {
                     resolve(resValues)
                 }
             }, err => {
                 reject(err)
             })
         }
       })
   }

   var p1=Promise.resolve(1),
   p2=Promise.resolve(2),
   p3=Promise.resolve(3);
   promiseAll([p1,p2,p3]).then(function(value){
   console.log(value)
   })
   ```

   3. 错误处理

      当 promise 捕获到 error 的时候，代码吃掉这个异常，返回 resolve，约定特殊格式表示这个调用成功了

8. ### 设计并实现 Promise.race()

   ```JS
   Promise._race = promises => new Promise((resolve, reject) => {
     promises.forEach(promise => {
       promise.then(resolve, reject)
     })
   })
   ```

### get 请求传参长度的误区

### 补充 get 和 post 请求在缓存方面的区别

### 闭包

### 类的创建和继承

### 如何解决异步回调地狱

### 说说前端中的事件流

### 如何让事件先冒泡后捕获

### 事件委托

### 图片的懒加载和预加载

### mouseover 和 mouseenter 的区别

### js 的 new 操作符做了哪些事情

### 改变函数内部 this 指针的指向函数（bind，apply，call 的区别）

### js 的各种位置，比如 clientHeight,scrollHeight,offsetHeight ,以及 scrollTop, offsetTop,clientTop 的区别？

### js 拖拽功能的实现

### 异步加载 js 的方法

### Ajax 解决浏览器缓存问题

### js 的节流和防抖

### JS 中的垃圾回收机制

### eval 是做什么的

### 如何理解前端模块化

### Commonjs、 AMD 和 CMD

### 对象深度克隆的简单实现

### 实现一个 once 函数，传入函数参数只执行一次

### 将原生的 ajax 封装成 promise

### js 监听对象属性的改变

### 如何实现一个私有变量，用 getName 方法可以访问，不能直接访

### ==和===、以及 Object.is 的区别

### setTimeout、setInterval 和 requestAnimationFrame 之间的区别

###

## 进阶

### 自己实现一个 bind 函数

### 用 setTimeout 来实现 setInterval

### js 怎么控制一次加载一张图片，加载完后再加载下一张

### 代码的执行顺序

### 如何实现 sleep 的效果（es5 或者 es6）

### 简单的实现一个 promise

### Function._proto_(getPrototypeOf)是什么？

### 实现 js 中所有对象的深度克隆（包装对象，Date 对象，正则对象）

### 简单实现 Node 的 Events 模块

### 箭头函数中 this 指向举例
