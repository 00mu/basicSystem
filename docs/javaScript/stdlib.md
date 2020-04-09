# 标准库
就是一系列具有各种功能的对象，介绍 JavaScript 原生提供各种方法。

## Object 对象

JavaScript 的所有其他对象都继承自 `Object` 对象，称为 `Object` 的实例。

`Object` 对象的原生方法分为：

* `Object` 本身的方法：直接定义在Object对象的方法
* `Object` 的实例方法：定义在Object原型对象Object.prototype上的方法

### Object() 将任意值转为对象

用于保证某个值一定是对象。

* 如果参数为空或者 `null` 或者 `undefined` 返回一个空对象。
* 如果参数是其他原始类型，Object方法将其转为对应的包装对象的实例。

``` JS
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true

var obj = Object('string');
obj instanceof Object // true
obj instanceof String // true

var obj = Object(true);
obj instanceof Object // true
obj instanceof Boolean // true
```

* 如果参数是一个对象，则返回该对象，不做转换。可以用来判断是否为对象。

``` JS
obj === Object(obj) // true
[] === Object([]) // true
```

### new Object() 构造函数

``` JS
var obj = new Object();
// 等价与
var obj = {} // 字面量写法

obj === new Object(obj) && obj === Object(obj); // true
```

`Object(value)` 与 `new Object(value)` 的结果是一样的，但是语义不同

* Object(value) 表示把 value 装换为对象
* new Object(value) 表示生成一个对象，它的值是 value

### Object 的静态方法

部署在Object对象自身的方法。

* 遍历对象的属性
  + Object.keys()、Object.getOwnPropertyNames() 接收一个对象返回一个对象属性的数组
  + Object.keys(obj) ：只返回可枚举的属性
  + Object.getOwnPropertyNames(obj) ：返回可枚举的属性，同时还返回不可枚举的属性名

``` JS
const arr = [1, 2, 3];
Object.keys(arr); //["0","1","2"]
Object.getOwnPropertyName(arr); //["0","1","2","length"]
```

* 对象属性模型的相关方法
  + Object.defineProperty()：通过描述对象，直接在对象上定义一个新属性或修改某个现有属性，并返回此对象。
  + Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
  + Object.defineProperties()：通过描述对象，定义多个属性。

* 控制对象状态的方法
  + Object.preventExtensions()：防止对象扩展。
  + Object.isExtensible()：判断对象是否可扩展。
  + Object.seal()：禁止对象配置。
  + Object.isSealed()：判断一个对象是否可配置。
  + Object.freeze()：冻结一个对象。
  + Object.isFrozen()：判断一个对象是否被冻结。

* 原型链方法
  + Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
  + Object.getPrototypeOf()：获取对象的Prototype对象。

### Object 的实例方法 

定义在 `Object.prototype` 上的方法，称为实例方法，所有 `Object` 的实例都继承了这个方法。

#### Object.prototype.valueOf()：方法返回指定对象的原始值。

valueOf 方法将对象转化为原始值，在隐式类型转换的时候 JavaScript 会自动调用它，通常不需要手动调用。每个内置的核心对象都重写了此方法以返回适当的值。如果没有原始值，则返回对象本身。

| 对象     | `valueOf` 方法返回值                |
| -------- | ----------------------------------- |
| Object   | 对象本身。这是默认情况              |
| Array    | 数组对象本身                        |
| Boolean  | 布尔值                              |
| Date     | 时间戳                              |
| Function | 函数本身                            |
| Number   | 数字值                              |
| string   | 字符串值                            |
|          | Math 和 Error 对象没有 valueOf 方法 |

``` JS
var obj = new Object();
obj.valueOf() === obj;
1 + obj // "1[object Object]"
obj + 1 // 1

obj.valueOf = function() { // 自定义valueOf() 覆盖原型链上的Object.prototype.valueOf
    return 2;
}
```

#### Object.prototype.toString()：返回当前对象对应的字符串形式。

toString **默认** 返回对象的类型字符串

``` JS
({}).toString(); // "[object object]"
```

toString 常通过自定义 toString 方法，让对象在自动类型转换时，得到想要的字符串形式。

``` JS
const obj = {};
obj.toString = function() {
    return 'hello'
}
obj + ' ' + 'world'; // "hello world"
```

数组、字符串、函数、Date 对象都有自己的 `toString` 方法，覆盖了 `Object.prototype.toString` 方法。

``` JS
[1, 2, 3].toString(); //"1,2,3"
"hello".toString(); //"hello"
(function() {
    return 123
}).toString(); // "function(){return 123}"
new Date().toString(); // "Sat Apr 04 2020 00:13:42 GMT+0800 (中国标准时间)"
```

`toString()` 方法是一个非常有用的方式来判断一个值的类型，结果返回一个 `"[object objectX]"` 格式的字符串，第二objectX表示该值的构造函数。由于实例对象可能自定义了toString方法，所以我们通过函数的 `call` 方法直接使用Object.prototype.toString方法：

``` JS
Object.prototype.toString.call(value)
```

不同类型的的方法返回值如下：

| 类型      | `toString` 方法返回值 |
| --------- | ----------------------- |
| 数值      | "[object Number]"       |
| 字符串    | "[object String]"       |
| 布尔值    | "[object Boolean]"      |
| undefined | "[object Undefined]"    |
| null      | "[object Null]"         |
| 数组      | "[object Array]"        |
| arguments | "[object Arguments]"    |
| 函数      | "[object Function]"     |
| Error     | "[object Error]"        |
| Date      | "[object Date]"         |
| RegExp    | "[object RegExp]"       |
| 其他对象  | "[object Object]"       |

比 typeof 运算符的类型判断来的更加准确。

``` JS
// 一个更加准确清晰的类型判断函数
const type = function(o) {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
type(new Date()); // "date"
type({}); // "object"
```

#### Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。

Object.prototype.toLocaleString方法与toString的返回结果相同，也是返回一个值的字符串形式。

这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值。

目前，主要有三个对象自定义了toLocaleString方法。

* Array.prototype.toLocaleString()
* Number.prototype.toLocaleString()
* Date.prototype.toLocaleString()

toLocaleString的返回值跟用户设定的所在地域相关

``` JS
const date = new Date();
date.toLocaleString(); // "2020/4/4 上午1:03:09"
date.toString(); //"Sat Apr 04 2020 01:03:09 GMT+0800 (中国标准时间)"
```

#### Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。

``` JS
var obj = {
    p: 123
};

obj.hasOwnProperty('p') // true
obj.hasOwnProperty('toString') // false toString属性是继承自原型链 Object.prototype 
```

#### Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。

#### Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。

## 属性描述对象

JavaScript 提供了一组用来描述对象属性控制行为的内部结构，称之为『属性描述对象』，每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。

``` JS
{
    enumerable: true, // 属性是否可枚举，默认为 true 如果设为false，for...in/Object.keys()/JSON.stringify 会跳过该属性
    configurable: true, // 可配置，默认为 true; 只有为true是属性描述才可以被改变，属性可被删除; 为false时，value、enumerable、writable、configurable、get、set都不能修改，属性也不可被删除

    // 数据描述符：
    value: undefined, // 读取或改写该属性的值，默认为 undefined
    writable: true, // 属性值是否可写，默认为 true

    // 或者 存储描述符：
    get: undefined, // 表示该属性的取值函数（getter），默认值undefined
    set: undefined // // 表示该属性的存值函数（setter），默认值undefined
}
```

**数据描述符** 和 **存储描述符** 不可共存

### Object.getOwnPropertyDescriptor(obj, prop) 获取属性描述对象

返回指定对象的上的一个自有属性对应的属性描述，如果指定的属性不存在返回 undefined 。

> 自有属性 指直接赋予该对象的属性，不需要从原型链上查找的属性

``` JS
const obj = {
    a: 10
}
Object.getOwnPropertyDescriptor(obj, 'a')
// value: 10
// writable: true
// enumerable: true
// configurable: true
```

*在 ES5 中，如果该方法的第一个参数不是对象（而是原始类型），那么就会产生出现 TypeError。而在 ES6，第一个的参数不是对象的话就会被强制转换为对象。*

### Object.getOwnPropertyNames(obj)  返回对象自身的所有属性名（包括不可遍历的）组成的数组

``` JS
Object.getOwnPropertyNames({})
Object.getOwnPropertyNames([]) // ["length"]

Object.keys(Object.prototype) // [] ; Object.prototype 也是一个对象，所有实例都会继承它，它自身的属性都是不可遍历的
Object.getOwnPropertyNames(Object.prototype) // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]
```

### Object.defineProperty()

`Object.defineProperty(obj, prop, descriptor)` 方法精确的添加或修改对象的属性。
由 `Object.defineProperty` 添加的属性，它的描述对象默认值与对象直接量等形式创建的属性不同。
它的 `enumerable` 、 `configurable` 、 `writable` 默认为 `false` 

``` JS
{
    enumerable: false, // 属性是否可枚举，默认为 false；
    configurable: false, // 可配置，默认为 false； 

    // 数据描述符：
    value: undefined, // 该属性的默认值，默认为 undefined
    writable: false, // 属性值是否可写，默认为 false

    // 或者 存储描述符：
    get: undefined, // 表示该属性的取值函数（getter），默认值undefined
    set: undefined // // 表示该属性的存值函数（setter），默认值undefined
}
```

``` JS
const obj = {
    a: 10
};
Object.defineProperty(obj, 'a', {

})
```

#### Object.defineProperties() 

一次性定义或修改多个属性

``` JS
var obj = Object.defineProperties({}, {
    p1: {
        value: 123,
        enumerable: true
    },
    p2: {
        value: 'abc',
        enumerable: true
    },
    p3: {
        get: function() {
            return this.p1 + this.p2
        },
        enumerable: true,
        configurable: true
    }
});

obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"
```

### Object.prototype.propertyIsEnumerable() 判断某个属性是否可遍历

这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false

### 存取器 get & set

除了直接定义以外，属性还可以用存取器（accessor）定义。其中，存值函数称为setter，使用属性描述对象的set属性；取值函数称为getter，使用属性描述对象的get属性

``` JS
var obj = Object.defineProperty({}, 'p', {
    get: function() {
        return 'getter';
    },
    set: function(value) {
        console.log('setter: ' + value);
    }
});

obj.p // "getter"
obj.p = 123 // "setter: 123"
```

一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性.

``` JS
var obj = {
    $n: 5,
    get next() {
        return this.$n++
    },
    set next(n) {
        if (n >= this.$n) this.$n = n;
        else throw new Error('新的值必须大于当前值');
    }
};

obj.next // 5

obj.next = 10;
obj.next // 10

obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```

比如 Vue、React 监听数据响应

### 对象的拷贝

拿出来单独说

### 冻结对象 Object.freeze(obj)

`Object.freeze` 方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。

上面代码中，对obj对象进行Object.freeze()以后，修改属性、新增属性、删除属性都无效了。这些操作并不报错，只是默默地失败。如果在严格模式下，则会报错。

``` JS
const obj = {
    x: 100
};
Object.freeze(obj); // {value: 100, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(obj, 'x'); // {value: 100, writable: false, enumerable: true, configurable: false}
```

* 冻结后对象的描述属性 writable、configurable 变为false。
* 对象冰冻后，没有办法解冻，只能通过克隆一个具有相同属性的新对象, 通过修改新对象的属性来达到目的。

`Object.isFrozen() ` 用于检查一个对象是否使用了 `Object.freeze` 

除此之外还有功能不大齐全的其他方法：

* Object.preventExtensions()：使得一个对象无法再添加新的属性。
* Object.seal() ：使得一个对象无法添加新属性，也无法删除旧属性

一个应用场景：Vue中把一个普通的对象传给Vue实例的data选项，Vue将遍历此对象的所有属性，并使用Object.defineProperty 把这些属性全部转换为getter/setting，来进行数据的追踪依赖在属性访问和修改时通知变化。但Vue在遇到Object.freeze冻结了的对象属性时，无法为对象加上 setter getter 等数据劫持的方法。 如果是一个巨大的列表不需要响应那么进行冻结，大大介绍cup observer的开销，提示高性能。

## Array 对象

Array 是JavaScript的原生对象，同时也是一个构造函数，用来生成新的数组。

``` JS
var arr = new Array(2);
// 等同于
var arr = Array(2);
```

然而 Array 作为构造函数，传入不同参数会有不同的行为，让人费解。使用字面量创建一个新的数组可能是一个更好的选择。

``` JS
new Array() // []
new Array(2) // [ empty x 2 ]
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]
new Array(1, 2) // [1, 2]

// good
const arr = [1, 2]; // 字面量
const arr2 = Array(5); // 创建一个长度为5的空数组
```

### 静态方法

#### Array.isArray(obj) 参数是否为数组

弥补 typeof 运算符判对象类型的不足

``` JS
const arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
```

### 实例方法

* arr.valueOf() , 数组的 `valueOf` 方法返回数组本身
* arr.toString() , 数组的 `toString` 方法返回数组的字符串

  

``` JS
[1, 2, [3, [4, 5]]].toString() // "1,2,3,4,5"
// 数组的简单拍平，前提是数组元素都是原始类型
```

#### 修改器方法

修改器方法方法会改变原数组。

| 方法           | 行为                                                                   | 返回值                 |
| -------------- | ---------------------------------------------------------------------- | ---------------------- |
| push(a, b, c)    | 数组末端添加一个或多个元素                                             | 添加后数组的长度       |
| pop()          | 删除数组最后一个元素                                                   | 删除的元素             |
| shift()        | 删除数组第一个元素                                                     | 删除的元素             |
| unshift(a, b, c) | 数组首位添加一个或多个元素                                             | 添加后数组的长度       |
| splice()       | 剪接数组，删除原数组的一部分成员，并可以在删除的位置添加新的数组成员， | 被删除的元素的集合数组 |
| reverse()      | 颠倒数组                                                               | 改变后的数组           |
| sort()         | 默认按照字典顺序排序，也可以自定义排序的方式                           | 改变后的数组           |

> 注意区分 splice 和 slice 

``` JS
let arr = [];
arr.push(1, 2, 3, 4, 5); // 5； 返回了添加元素后数组的长度
arr.pop(); // 5; 返回删除的元素
arr.shift(); // 1; 返回删除的元素
arr.unshift(7, 8, 9); // 6; 返回了添加元素后数组的长度
arr; // [7,8,9,2,3,4]
```

* `push` 和 `pop` 结合使用，就构成了“后进先出”的栈结构（stack）。
* `push` 和 `shift` 结合使用，就构成了"先进先出”的队列结构（queue）。

``` JS
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"];
a // ["a", "b", "c", "d", 1, 2]

a.splice(-4, 2) // ["c", "d"] ; 起始位置如果是负数，就表示从倒数位置开始删除
a // ["a", "b", 1, 2]

a.splice(2, 0, 8, 9) // []; 第二个参数为0，表示单纯的只想插入
a // ["a", "b", 8, 9, 1, 2] 

a.splice(1) // [8, 9, 1, 2] ; 只提供第一个元素的话，指定位置后的元素全删除，相当于拆分数组
a // ["a", "b"]
```

* `arr.splice(start, count, addElement1, addElement2, ...)` ：splice的第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。

``` JS
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[10111, 11, 101].sort()
// [101, 11] // 按照字典顺序比较，而非直接比较大小
```

* `sort` 传入一个函数作为参数，来实现自定义排序。

``` JS
// sort的参数函数本身接受两个参数，表示进行比较的两个数组成员。
// 如果该函数的返回值大于0，表示第一个成员排在第二个成员后面
[10111, 1101, 111].sort((a, b) => a - b) // [111, 1101, 10111]
[10111, 1101, 111].sort((a, b) => b - a) // [10111, 1101, 111]
```

需要注意的是，**自定义排序应该返回数值**，否则不同浏览器可能有不同的实现。

``` JS
// bad
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a > b) // [1, 4, 2, 6, 0, 6, 2, 6]

// good
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a - b) // [0, 1, 2, 2, 4, 6, 6, 6]
```

#### 访问方法

访问目标数组，做一些整合处理，不影响原数组。

| 方法     | 行为                                                   |
| -------- | ------------------------------------------------------ |
| join()   | 指定参数作为分隔符，将所有数组成员连接为一个字符串返回 |
| slice()  | 切片，提取目标数组的一部分，返回一个新数组             |
| concat() | 用于合并两个或多个数组，返回一个新数组                 |
| indexOf()| 返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1
| lastIndexOf()|返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1

* join

``` JS
var a = [1, 2, 3, 4];

a.join(' ') // '1 2 3 4'
a.join(' | ') // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4" ； 如果不提供参数，默认用逗号分割

[1, 2, undefined, , null, 4, NaN].join("-"); // "1-2----4-NaN"; 如果数组成员是undefined、null、空位，会被转换成字符串
```

通过 `call` 或者 `apply` 方法，可以使字符串或者类数组 调用join方法

``` JS
Array.prototype.join.call('hello', '-') //"h-e-l-l-o"
```

* slice

``` JS
arr.slice(start, end);
```

它的第一个参数为起始位置（从0开始，会包括在返回的新数组之中），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。

``` JS
const arr = ['a', 'b', 'c']
arr.slice(1) // ['b','c'] 
arr.slice(1, 2) // ['b'] 截取规则，包含第一个位置不包含第二个位置
arr.slice() // ['a','b','c'] 

arr.slice(0, -1) // ['a','b']
arr.slice(-1, -2) // [] ; 第二个参数一定比第一个参数大，位置靠后
arr.slice(-3, -2) // ['a']
```

** `slice` 一个重要的应用场景，类数组转换为真正的数组**

``` JS
Array.propotype.slice.call(arr)
```

``` JS
// 字符串
Array.prototype.slice.call('1234')
// ["1", "2", "3", "4"]

// 属性是数字，有length的对象
Array.prototype.slice.call({
    0: 'a',
    1: 'b',
    length: 2
})
// ['a', 'b']

// nodes
Array.prototype.slice.call(document.querySelectorAll("div"));

// arguments
Array.prototype.slice.call(arguments);
```

* concat

``` JS
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({
    a: 1
}, {
    b: 2
}) // 也可以接受非数组类型
// [{ a: 1 }, { b: 2 }]

[2].concat({
    a: 1
})
// [2, {a: 1}]

// 如果忽略参数将实现一个浅拷贝，浅拷贝的意思是元素如果是对象，拷贝的是对象的引用，新旧数据会相互影响
```

#### 迭代方法

接受一个函数作为参数，所有数组成员依次执行该函数，不影响原数组。

| 方法    | 语法                            | 行为                                                                       |
| ------- | ------------------------------- | -------------------------------------------------------------------------- |
| map     | map(function(elem, index, arr), thisArg) | 将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回 |
| forEach | forEach(function(elem, index, arr), thisArg) | 不返回值，只用来操作数据                                                   |
|filter | filter(function(elem, index, arr), thisArg)| 过滤数组，满足条件的组成一个新数组返回|
|some|some(function(elem, index, arr), thisArg)| 只要一个成员满足要求就返回true
|every|every(function(elem, index, arr), thisArg)| 所有成员都满足要求才返回true
|reduce|reduce(function(a, b))| 从左到右依次处理，最终累计
|reduceRight|| 和reduce 唯一区别，是从右到左

* map

map方法接受一个函数作为参数。该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。

``` JS
const arr2 = [1, 2, 3].map(function(elem, index, arr) {
    return elem * index;
});
arr2 // [0, 2, 6]

//map方法的回调函数有三个参数, elem为当前成员的值，index为当前成员的位置，arr为原数组（[1, 2, 3]）
```

`map` 和 `forEach` 方法还可以接受第二个参数，用来绑定回调函数内部的 `this` 变量。

``` JS
var arr = ['a', 'b', 'c'];

[1, 2].map(function(e) {
    return this[e];
}, arr)
// ['b', 'c']
```

`map` 和 `forEach` 方法不会跳过 `undefined` 和 `null` ，但是会跳过空位。

* forEach

  + `forEach` 与 `map` ：使用方法和 `map` 一致，区别在于 `forEach` 不返回值，用于数据操作。如果遍历数组目的为了返回值用 `map` 方法，否则用 `forEach` 方法。
  + `forEach` 与 `for` 循环 ： `forEach` 无法中断执行，总是将所有成员遍历完。如果希望符合某种条件就中跳出，用for循环。

``` JS
var arr = [1, 2, 3];

for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 2) break;
    console.log(arr[i]);
}
```

* filter

``` JS
const arr = [1, 2, 3];
const arr2 = arr.filter(item => item > 1);
arr2 // [2,3]
```

* reduce reduceRight

``` JS
[1, 2, 3, 4, 5].reduce(function(a, b) { // reduce方法求出数组所有成员的和
    console.log(a, b);
    return a + b;
})
// 1 2； a是数组的第一个成员1，b是数组的第二个成员2
// 3 3； a为上一轮的返回值3，b为第三个成员3
// 6 4； a为上一轮的返回值6，b为第四个成员4。第四次执行
// 10 5； a为上一轮返回值10，b为第五个成员5
//最后结果：15； 至此所有成员遍历完成，整个方法的返回值就是最后一轮的返回值15
```

reduce方法和reduceRight方法的第一个参数都是一个函数。该函数接受以下四个参数。

01. 累积变量，默认为数组的第一个成员
01. 当前变量，默认为数组的第二个成员
01. 当前位置（从0开始）
01. 原数组

这四个参数之中，只有前两个是必须的，后两个则是可选的。

``` JS
[1, 2, 3, 4, 5].reduce(function(a, b) {
    return a + b;
}, 10); // 指定初值,10; 可处理空数组取不到初始值，reduce方法报错的问题
// 25
```

reduce 比较适合对组内元素作比较的情况。比如找到数组的最大值:

``` JS
function findMax(entries) {
    return entries.reduce(function(max, entry) {
        return max > entry ? max : entry;
    }, '');
}
findMax([4, 6, 7, 2, 1, 999])
```

#### 链式操作

数组方法中，如果返回的还是数组，可以用链式操作。

``` JS
var users = [{
        name: 'tom',
        email: 'tom@example.com'
    },
    {
        name: 'peter',
        email: 'peter@example.com'
    }
];

users
    .map(function(user) {
        return user.email;
    })
    .filter(function(email) {
        return /^t/.test(email);
    })
    .forEach(function(email) {
        console.log(email);
    });

// "tom@example.com"
```

## 包装对象

包装对象，指的是与数值、字符串、布尔值分别相对应的 `Number` 、 `String` 、 `Boolean` 三个原生对象，可以把对应的原始类型的值变成（包装成）对象。

包装对象的目的让一切值都是对象，让JavaScript 有一个通用的数据模型，也使得原始类型有能力调用办法。

``` JS
// 作为构造函数，来完成包装对象
const v1 = new Number(123);
const v2 = new String('abc');
const v3 = new Boolean(true);

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false 变成包装对象后，也就不再和原值相等
```

`Number` 、 `String` 、 `Boolean` ，作为普通函数调用时，常常用于将**任何类型**的值转为**原始类型**的数值、字符串、布尔值。

``` JS
Number('123') // 123
String('abc') // "abc"
Boolean('hh') // true

Number(new Number(123)) === 123 // true ; 返回类型的原始值，正常
```

### 实例方法

包装对象 `Number` 、 `String` 、 `Boolean` 共同具有从 Object 对象继承的方法： `valueOf` 、 `toString` 方法。

* valueOf() 返回包装对象实例的原始类型的值
* toString() 返回包装对象实例对应的字符串形式

``` JS
new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"
```

### 原始类型与实例对象的自动转换

某些场合原始类型的值会主动当做包装对象调用包装对象的属性和方法，并在使用后立即销毁。

当原始类型的值直接调用方法的时候，会尝试将其自动转为包装对象的实例。

``` JS
"hello".length // 5; "hello"本身不是对象，不能调用length属性，js引擎会主动将其转换为包装对象，然后调用length属性，调用结束后这个临时对象就会被销毁。

// 等同于
new String("hello").legnth
// new String 为"hello"提供了多个方法，包括length
```

### 自定义方法

在包装对象的原型对象上添加上自定义方法和属性，实例便可以直接调用了。

``` JS
String.prototype.double = function() {
    return this.valueOf() + this.valueOf();
};
"abc".double // "abcabc"
```

### 三大包装对象之 Boolean 对象

``` JS
if (new Boolean(false)) {
    console.log('true'); // false的包装对象实例，是一个对象，对象的布尔值为true
} // true

if (new Boolean(false).valueOf()) {
    console.log('true'); // false的包装对象实例，对应的valueOf是false
} // 无输出
```

#### Boolean 函数的类型转换

Boolean 对象单独使用时作为一个工具方法，将任意值转换为布尔值。

``` JS
Boolean(undefined) // false
Boolean(null) // false
Boolean(NaN) // false
Boolean("") // false
Boolean(0) // false

// 除此之外的都会转为true
Boolean({}) && Boolean([]) && Boolean(function() {}) &&
    Boolean('false') && Boolean(/foo/) // true 

    // !! 双重否定运算符可以将任意值转为对应的布尔值
    !! function() {} // true
```

仔细分辨 Boolean 是作为构造函数和工具函数，往往产生相反的结果。

``` JS
Boolean(false) // false
Boolean(new Boolean(false)) // true
```

### 三大包装对象之 Number 对象

Number 对象单独使用时作为一个工具方法，将任意值转换为数值。

``` JS
Number(false) // 0
```

Number 对象作为构造函数，提供了很多方法。

#### Number 的静态属性

直接定义在 Number 对象上的属性有：

* Number. POSITIVE_INFINITY：正的无限，指向Infinity。
* Number. NEGATIVE_INFINITY：负的无限，指向-Infinity。
* Number. NaN：表示非数值，指向NaN。
* Number. MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最* 接近0的负数为-Number. MIN_VALUE。
* Number. MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。
* Number. MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。

#### Number 的实例方法

* Number.prototype.toString() ：Number对象部署了自己的toString方法，用来将一个数值转为字符串形式。

``` JS

10. toString() // SyntaxError ; 导致的语法错误是因为会被引擎理解是小数点；如果表明后面的点号用于调用对象属性，而非小数点，可以用以下方法

(10).toString() // "10"
10..toString() // "10"
10.0.toString() // "10"

// 默认将数值转换为十进制，再输出字符串
(10).toString() // "10"

// 接受参数，输出指定进制的字符串
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
```

toString 只能将十进制的转为其他进制的字符串，如果要将其它进制的数转为是十进制，用 parseInt 方法。

* Number.prototype.toFixed() ：将一个数转化为指定位数的小数，再转为字符串

``` JS
(10).toFixed(2) // "10.00"
10.005.toFixed(2) // "10.01"

(10).toFixed(101) // RangeError ; 小数有效位数0 -100，超出将报错

// 由于浮点数的原因，小数5的四舍五入是不确定的，使用的时候要小心
(10.055).toFixed(2) // 10.05
(10.005).toFixed(2) // 10.01
```

* Number.prototype.toExponential() ：将一个数转为科学计数法形式。

``` JS
(10).toExponential() // "1e+1"
(10).toExponential(2) // "1.00e+1"

(1234).toExponential() // "1.234e+3"
(1234).toExponential(101) // RangeError ; 小数有效位数0 -100，超出将报错
```

* Number.prototype.toPrecision() ：将一个数转为指定位数的有效数字。

``` JS
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"

(12.34).toPrecision(0) // RangeError ; 有效位数 1 -100，超出将报错
(12.45).toPrecision(4) // "12.4" ; 注意浮点数的导致小数四舍五入不准确的问题
```

* Number.prototype.toLocaleString() ：接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。

``` JS
(123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
// "一二三"

(123).toLocaleString('zh-Hans-CN', {
    style: 'percent'
})
// "12,300%"

(123).toLocaleString('zh-Hans-CN', {
    style: 'currency',
    currency: 'CNY'
})
// "￥123.00"
```

##### 也可以在 `Number` 的原型对象上自定义方法，被Number的实例继承

``` JS
Number.prototype.add = function(x) {
    return this + x;
};

8['add'](2) // 10
```

### 三大包装对象之 Number 对象

Number 对象单独使用时作为一个工具方法，将任意值转换为字符串。

``` JS
String(true) // "true"
String(5) // "5"
```

#### String 的静态方法

* String.fromCharCode() ：参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。

``` JS
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111) // "hello"
```

暂时还不清楚有什么用。

#### String 的实例属性

* String.prototype.length：返回字符串的长度。

#### String 的实例方法

以下方法均不影响原数组。

| 方法          | 语法                          | 行为                                                           |
|---------------|-------------------------------|----------------------------------------------------------------|
| charAt        | "abc".charAt(1)               | 返回指定位置的字符                                                |
| charCodeAt    | "abc".charCodeAt(1)           | 返回指定位置的字符的Unicode 码点                                   |
| concat        | "abc".concat("edf", 'gh')     | 拼接多个字符串返回新的字符串                                       |
| slice         | "abc".slice(start, end)       | 访问两个位置之间的字符串，返回一个新的字符串。同Array的slice方法         |
| substr        | "abc".substr(start, length)   | 访问开始位置起连续长度的一个字符串，并返回                            |
| indexOf       | "abc".indexOf('b', start)     | 返回参数字符串在指定字符串中从头部开始第一次出现的位置，如果找不到返回-1   |
| lastIndexOf   | "abc".lastIndexOf('a', start) | 同indexOf方法，区别在于从尾部开始匹配                               |
| trim          | "abc".trim()                  | 去除字符串两端的空格（包括换行符、制表符、回车符），返回一个新字符串         |
| toLowerCase   | "abc".toLowerCase()           | 将字符串全部转换为小写，并返回一个新字符串                            |
| toUpperCase   | "abc".toUpperCase()           | 将字符串全部转换为大写，并返回一个新字符串                            |
| match         | "abcdf".match('ab')           | 元字符串是否能匹配到参数字符串，返回一个匹配到第一个信息的数组，反之返回null |
| search        | "abcdf".search('ab')          | 同match返回匹配到的第一个位置，反之返回 -1                           |
| replace       | "abcdf".replace('ab', 12)     | 替换匹配到的字符串，默认只替换第一个                                 |
| split         | "abc".split('')               | 按照规定分割字符串，返回一个分割出来的字符串组成的数组                  |
| localeCompare | "abc".localeCompare('def')    | 按自然于然排序比较两个字符串的大小，返回1、0、-1                        |

* String.prototype.charAt()：返回指定位置的字符，参数是从0开始编号的位置。完全可以用数组下标替代。

``` JS
"123".charAt(2) // "3"

// 完全可以用数组下标代替
"123" [2]

// 唯一不同在于，位置不存在时候
"123".charAt(3) // ""
"123" [3] // undefined
```

* String.prototype.charCodeAt() ：方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于String.fromCharCode()的逆操作。

``` JS
'abc'.charCodeAt(1) // 98 ；1号位置的字母b对应的Unicode是98
```

* String.prototype.concat()：拼接字符串，返回一个新的字符串，不改变原字符串。

``` JS
var s1 = '1';
var s2 = '2';

s1.concat(s2) // "12"
s1 // "1"
```

与加号运算符的区别

``` JS
var one = 1;
var two = 2;
var three = '3';

''.concat(one, two, three) // "123"
one + two + three // "33"
```

* String.prototype.slice()

用于从原字符串取出子字符串并返回，不改变原字符串。它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。

``` JS
'JavaScript'.slice(0, 4) // "Java"
'JavaScript'.slice(4) // "Script"
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"
'JavaScript'.slice(2, 1) // "" ; 第二个参数的位置不能在第一个参数位置之前
```

> （不建议）String.prototype.substring() ： 同slice方法，substring行为不容易理解不建议使用。

* String.prototype.substr()：和slice类同，区别在于第二个参数表示取范围长度。

``` JS
'JavaScript'.substr(4, 6) // "Script"
'JavaScript'.substr(4) // "Script"
'JavaScript'.substr(-6) // "Script"
'JavaScript'.substr(4, -1) // ""
```

* String.prototype.indexOf()，String.prototype.lastIndexOf()：返回一个字符串在另一个字符串中第一次出现的位置。如果是-1，表示不匹配。

``` JS
'hello world'.indexOf('o') // 4
'JavaScript'.indexOf('script') // -1

// indexOf方法还可以接受第二个参数，表示从该位置开始向后匹配
'hello world'.indexOf('o', 6) // 7

// lastIndexOf方法的用法跟indexOf方法一致，主要的区别是lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配
'hello world'.lastIndexOf('o') // 7
// 另外，lastIndexOf的第二个参数表示从该位置起向前匹配
'hello world'.lastIndexOf('o', 6) // 4
```

* String.prototype.trim()：去除字符串两端的空格（还包括制表符（\t、\v）、换行符（\n）和回车符（\r）），返回一个新字符串。

``` JS
'  hello world  '.trim() // "hello world"
'\r\nabc \t'.trim() // 'abc'
```

* String.prototype.toLowerCase()，String.prototype.toUpperCase()： 字符串全部转为小写或者大写。

``` JS
'Hello World'.toLowerCase()
// "hello world"

'Hello World'.toUpperCase()
// "HELLO WORLD"
```

* String.prototype.match()：匹配第一个字符串，返回一个匹配信息的数组。没有匹配到返回null

``` JS
'cat, bat, sat, fat'.match('at') // ["at", index: 1, input: "cat, bat, sat, fat", groups: undefined]
'cat, bat, sat, fat'.match('good') // null
```

* String.prototype.search() ： 用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。

``` JS
'cat, bat, sat, fat'.search('at') // 1
'cat, bat, sat, fat'.search('good') // -1
```

* String.prototype.replace() ：用于替换匹配的子字符串，一般情况下只替换第一个匹配。

``` JS
'aaa'.replace('a', 'b') // "baa"
```

* String.prototype.split() ：分割字符串，返回数组

``` JS
'a|b|c'.split('|') // ["a", "b", "c"]
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]
'a|b|c'.split() // ['a|b|c']
'a|b|c'.split() // ["", "b", "c"] 

// 受第二个参数，限定返回数组的最大成员数。
'a|b|c'.split('|', 1) // ["a"]
```

match、search、replace、split 均可以正则表达式作为参数。

## 原生 Math 对象

Math是 JavaScript 的原生对象，提供各种数学功能。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在Math对象上调用。

### 静态属性

* Math. E：常数e。
* Math. LN2：2 的自然对数。
* Math. LN10：10 的自然对数。
* Math. LOG2E：以 2 为底的e的对数。
* Math. LOG10E：以 10 为底的e的对数。
* Math. PI：常数π。
* Math. SQRT1_2：0.5 的平方根。
* Math. SQRT2：2 的平方根。

### 静态方法

| title             | title                           |
|-------------------|---------------------------------|
| Math.abs(-5)      | 返回参数值的绝对值                 |
| Math.max(1, 2, 3) | 返回参数中的最大值                 |
| Math.min(1, 2, 3) | 返回参数中的最小值                 |
| Math.floor(-3.2)  | 返回小于参数值的最大整数（地板值）     |
| Math.ceil(-3.2)   | 返回大于参数值的最小整数（天花板值）   |
| Math.round(-3.2)  | 返回四舍五入后的值                 |
| Math.random(-3.2) | 返回一个可能等于0 一定小于1的伪随机数 |

* Math.floor() 向下取整，Math.ceil()向上取整； 结合返回一个数值的整数部分。

``` JS
function ToInteger(x) {
    x = Number(x);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}

ToInteger(3.2) // 3
ToInteger(-3.2) // -3
```

* Math.max()：最大值
* Math.min()：最小值

``` JS
Math.max(2, -1, 5) // 5
Math.min(2, -1, 5) // -1
Math.min() // Infinity
Math.max() // -Infinity
```

* Math.pow()：指数运算
* Math.sqrt()：平方根
* Math.log()：自然对数
* Math.exp()：e的指数
* Math.round()：四舍五入

``` JS
Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(0.6) // 1

// 等同于
Math.floor(x + 0.5)

// 注意对负数.5的处理
Math.round(-1.1) // -1
Math.round(-1.5) // -1
Math.round(-1.6) // -2
```

* Math.random()：返回0到1之间的一个伪随机数，可能等于0，但是一定小于1

``` JS
// 任意范围内的随机数
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
getRandomArbitrary(1.5, 6.5)

// 任意范围内的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(1, 6) // 5

// 随机字符
function random_str(length) {
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
    ALPHABET += '0123456789-_';
    var str = '';
    for (var i = 0; i < length; ++i) {
        var rand = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET.substring(rand, rand + 1);
    }
    return str;
}

random_str(6) // "NdQKOr"
```

* 还有一些三角函数方法
  + Math.sin()：返回参数的正弦（参数为弧度值）
  + Math.cos()：返回参数的余弦（参数为弧度值）
  + Math.tan()：返回参数的正切（参数为弧度值）
  + Math.asin()：返回参数的反正弦（返回值为弧度值）
  + Math.acos()：返回参数的反余弦（返回值为弧度值）
  + Math.atan()：返回参数的反正切（返回值为弧度值）

## 原生时间库 Date 对象

`Date` 对象是 `JavaScript` 原生的时间库。它以国际标准时间（UTC）1970年1月1日00:00:00作为时间的零点，可以表示的时间范围是前后各1亿天（单位为毫秒）。

### 作为普通函数直接调用

`Date` 可以作为普通函数直接调用，返回一个代表当前时间的字符串。

``` JS
// Date 是否代参，总是返回当前时间
Date() // "Sun Apr 05 2020 20:47:41 GMT+0800 (中国标准时间)"
Date(2020.2 .22) // "Sun Apr 05 2020 20:47:41 GMT+0800 (中国标准时间)"
```

### 作为构造函数的用法

``` JS
const today = new Date();
```

Date实例 与其他对象在求值时的表现不同，其他对象默认调用 valueOf 方法，Date实例调用toString方法返回一个该实例对应时间的字符串。

``` JS
new Date(); // "Sun Apr 05 2020 20:56:19 GMT+0800 (中国标准时间)"
// 相当于
new Date().toString(); // "Sun Apr 05 2020 20:56:19 GMT+0800 (中国标准时间)"
```

new Date() 对象可以接受各种格式的参数。

``` JS
// 参数为 毫秒数 ，相当于Unix 时间戳乘以1000 
new Date(1586091480580) // Sun Apr 05 2020 20:58:00 GMT+0800 (中国标准时间)

// 参数为日期字符串
new Date('January 6, 2020'); // Mon Jan 06 2020 00:00:00 GMT+0800 (中国标准时间)

// 参数为多个整数, 代表年、月、日、小时、分钟、秒、毫秒
new Date(2020, 2, 2, 0, 0, 0, 0); // Mon Mar 02 2020 00:00:00 GMT+0800 (中国标准时间)
```

接受参数的说明：

* 参数可以是负整数，代表1970年元旦之前的时间

``` JS
new Date(-1378218728000)
```

* 只要是能被Date.parse()方法解析的字符串，都可以当作参数

``` JS
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('February, 15, 2013')
new Date('February 15, 2013')
new Date('15 Feb 2013')
new Date('15, February, 2013')
```

* 参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略
  + 年：使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表1910年。如果是负数，表示公元前。
  + 月：0表示一月，依次类推，11表示12月。
  + 日：1到31。
  + 小时：0到23。
  + 分钟：0到59。
  + 秒：0到59
  + 毫秒：0到999。

``` JS
new Date(2013, 0) // 需要特别注意的是月份从0开始，日从1开始。
```

### 日期的运算

类型自动转换时，如果转为数值，对应毫秒数，如果转为字符串对应日期字符串。

``` JS
const d1 = new Date(2020, 2, 1);
const d2 = new Date(2020, 3, 1);

// 两个Date实例相减转为数值，相加则转为字符串
d1 - d2 // -2678400000 
d2 + d1 // "Sun Mar 01 2020 00:00:00 GMT+0800 (中国标准时间)Wed Apr 01 2020 00:00:00 GMT+0800 (中国标准时间)"
```

### Date对象的静态方法

* Date.now() ：返回当前时间距离零点时间的毫秒数
* Date.parse() ：解析日期字符串，YYYY-MM-DDTHH:mm:ss.sssZ 是标准格式，其他也行；解析失败返回NaN
* Date. UTC()：接受年、月、日等变量作为参数，返回该时间距离时间零点的毫秒数，与new Date() 不同的UTC是时间标准时间，new Date() 解释为当前时区时间。

### Date对象的实例方法

* Date.prototype.valueOf()：该方法等同于getTime方法
* Date.prototype.toString()：当前时间对应字符串

除此之外，还有三大类其他方法：

01. to类：从Date对象返回一个字符串，表示指定的时间。

| 方法               | 描述                                                |
|--------------------|-----------------------------------------------------|
| toString           | 返回一个完整的日期字符串                                |
| toUTCString        | 返回一个完整的 UTC（国际时间） 日期字符串（比北京时间晚8个小时） |
| toISOString        | 返回一个完整的ISO8601 写法的国际日期字符串               |
| toJSON             | 返回一个符合json格式的iso时间，结果与toISOString相同      |
| toDateString       | 返回日期字符串（不含小时、分和秒）                         |
| toTimeString       | 返回时间字符串（不含年月日）                              |
| toLocaleString     | 完整的本地时间                                        |
| toLocaleDateString | 本地日期（不含小时、分和秒）                              |
| toLocaleTimeString | 本地时间（不含年月日）                                   |
| toString           | 返回一个完整的日期字符串                                |
| toString           | 返回一个完整的日期字符串                                |
| toString           | 返回一个完整的日期字符串                                |
| toString           | 返回一个完整的日期字符串                                |

02. get类：获取Date对象的日期和时间，返回值都是整数。

| 方法               | 描述                                                |
|--------------------|-----------------------------------------------------|
|getTime | 返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法|
|getDate | 返回实例对象对应每个月的几号（从1开始）|
|getDay | 返回星期几，星期日为0，星期一为1，以此类推|
|getFullYear | 返回四位的年份|
|getMonth | 返回月份（0表示1月，11表示12月）|
|getHours | 返回小时（0-23）|
|getMilliseconds | 返回毫秒（0-999）|
|getMinutes | 返回分钟（0-59）|
|getSeconds | 返回秒（0-59）|
|getTimezoneOffset | 返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素|

03. set类：设置Date对象的日期和时间，跟get*方法一一对应的，但没有setDay因为星期是计算出来的。

| 方法               | 描述                                                |
|--------------------|-----------------------------------------------------|
|setDate(date) | 设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳|
|setFullYear(year [, month, date]) | 设置四位年份|
|setHours(hour [, min, sec, ms]) | 设置小时（0-23）|
|setMilliseconds() | 设置毫秒（0-999）|
|setMinutes(min [, sec, ms]) | 设置分钟（0-59）|
|setMonth(month [, date]) | 设置月份（0-11）|
|setSeconds(sec [, ms]) | 设置秒（0-59）|
|setTime(milliseconds) | 设置毫秒时间戳|


## RegExp 对象
新建正则表达式有两种方法。一种是使用字面量，以斜杠表示开始和结束；另一种是使用RegExp构造函数。
``` JS
// 字面量
const regex = /xyz/;

// 构造器
const regex = new RegExp('xyz');
```

两种写法是等价的，字面量在引擎编译代码时就会新建正则，第二种在运行时新建正则表达式，第一种效率更高。第一种也更加直观，实际应用中推荐采用字面量的方式。

### 实例属性

* RegExp.prototype.ignoreCase：返回一个布尔值，表示是否设置了i修饰符。
* RegExp.prototype.global：返回一个布尔值，表示是否设置了g修饰符。
* RegExp.prototype.multiline：返回一个布尔值，表示是否设置了m修饰符。
* RegExp.prototype.flags：返回一个字符串，包含了已经设置的所有修饰符，按字母排序。
------
* RegExp.prototype.lastIndex：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义，详细介绍请看后文。
* RegExp.prototype.source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。

``` JS
var r = /abc/igm;

r.lastIndex // 0
r.source // "abc"// JavaScript
```


### 实例方法
#### RegExp.prototype.test()：当前模式是否能匹配参数字符串，返回布尔值。
``` JS
/cat/.test('cats and dogs') // true
```
如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配，同时可以通过正则对象的lastIndex属性指定开始搜索的位置。
``` JS
var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false
```

#### RegExp.prototype.exec() ：用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回null。

``` JS
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // ["x"]
r2.exec(s) // null

//  正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员
var r = /_(x)/;
r.exec(s) // ["_x", "x"] ； 第一个成员是整个匹配的结果，第二个成员是圆括号匹配的结果
```

### 匹配规则
#### 字面量字符
大部分字符在正则表达式中，就是字面的含义，比如/a/匹配a，/b/匹配b。如果在正则表达式之中，某个字符只表示它字面的含义（就像前面的a和b），那么它们就叫做“字面量字符”（literal characters）。

``` JS
/dog/.test('old dog') // true
```
#### 元字符
除了字面量字符以外，还有一部分字符有特殊含义，不代表字面的意思。它们叫做“元字符”。

字符|名称|描述
-----|-----|-----
||元字符|
.|点字符|匹配一个除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符
^|位置字符| 字符串的开始位置
$|位置字符|字符串的结束位置
||选择符| 表示“或关系”（OR）
\\|转义符|^、.、[、$、(、)、|、*、+、?、{和\
[^xyz]|脱字符|表示除了x、y、z之外都可以匹配
[-]|连字符|字符的连续范围 [abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母
||预定义字符|某些常见模式的简写方式
\d | |匹配0-9之间的任一数字，相当于[0-9]
\D | |匹配所有0-9以外的字符，相当于[^0-9]
\w | |匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]
\W | |除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]
\s | |匹配空格（包括换行符、制表符、空格符等），相等于[ \t\r\n\v\f]
\S | |匹配非空格的字符，相当于[^ \t\r\n\v\f]
\b | |匹配词的边界
\B | |匹配非词边界，即在词的内部
{} |重复类|{n}表示恰好重复n次，{n,}表示至少重复n次，{n,m}表示重复不少于n次，不多于m次
||量词符|用来设定某个模式出现的次数，贪婪模式
|? | |某个模式出现0次或1次，等同于{0, 1}
|* | |某个模式出现0次或多次，等同于{0,}
|+ | |某个模式出现1次或多次，等同于{1,}
| |非贪婪模式 |
|+? | | 表示某个模式出现1次或多次，匹配时采用非贪婪模式|
|*? | | 表示某个模式出现0次或多次，匹配时采用非贪婪模式|
|?? | | 表格某个模式出现0次或1次，匹配时采用非贪婪模式|
| |修饰符 |模式的附加规则，放在正则模式的最尾部，可多个一起使用
|g|/b/g|全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果
|i|/b/i|正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写
|m|/abc/m| 多行模式，默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处，加上m修饰符以后，^和$还会匹配行首和行尾，即^和$会识别换行符（\n）

#### 组匹配
正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。
``` JS
/fred+/.test('fredd') // true
/(fred)+/.test('fredfred') // true

'abcabc'.match(/(.)b(.)/) // ['abc', 'a', 'c']
'abcabe'.match(/(.)b(.)/g) //  ["abc", "abe"]

// 正则表达式内部，还可以用\n引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号。
/(.)b(.)\1b\2/.test("abcabc")  // \1表示第一个括号匹配的内容（即a），\2表示第二个括号匹配的内容（即c）

// 括号嵌套
/y((..)\2)\1/.test('yabababab') // true; \1指向外层括号，\2指向内层括号
```
匹配网页标签
``` JS
var tagName = /<([^>]+)>[^<]*<\/\1>/;

tagName.exec("<b>bold</b>")[1]
```

#### 非捕获组
(?:x)称为非捕获组（Non-capturing group），表示不返回该组匹配的内容，即匹配的结果中不计入这个括号

``` JS
var m = 'abc'.match(/(?:.)b(.)/);
m // ["abc", "c"]
```

``` JS
// 正常匹配
var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// ["http://google.com/", "http", "google.com", "/"]

// 非捕获组匹配
var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// ["http://google.com/", "google.com", "/"]
```

#### 先行断言
x(?=y)称为先行断言（Positive look-ahead），x只有在y前面才匹配，y不会被计入返回结果
``` JS
var m = 'abc'.match(/b(?=c)/);
m // ["b"]
```

#### 先行否定断言
x(?!y)称为先行否定断言（Negative look-ahead），x只有不在y前面才匹配，y不会被计入返回结果

``` JS
/\d+(?!\.)/.exec('3.14')
// ["14"]
```



## JSON 对象
一种用于数据交换的文本格式,取代繁琐笨重的 XML。

JSON 对值的类型和格式有严格的规定：
1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
2. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
3. 字符串必须使用双引号表示，不能使用单引号。
4. 对象的键名必须放在双引号里面。
5. 数组或对象最后一个成员的后面，不能加逗号。

JSON 对象有两个静态方法。

### JSON.stringify()
将一个值转换为JSON字符串，可以被JSON.parse方法还原。

``` JS
JSON.stringify('abc') // ""abc"" ; 内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false])
// '[1,"false",false]'

JSON.stringify({ name: "张三" })
// '{"name":"张三"}'


// 如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify过滤
var obj = {
  a: undefined,
  b: function () {}
};
JSON.stringify(obj) // "{}"

// 如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"

// 正则对象会被转成空对象
JSON.stringify(/foo/) // "{}"

// JSON.stringify方法会忽略对象的不可遍历的属性
var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});
JSON.stringify(obj); // "{"foo":1}"
```


`JSON.stringify` 方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性，只对对象有效。

``` JS
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

第二个参数还可以是一个函数，用来更改JSON.stringify的返回值。
``` JS
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

参数对象的 toJSON 方法。

如果参数对象有自定义的toJSON方法，那么JSON.stringify会使用这个方法的返回值作为参数，而忽略原对象的其他属性。

``` JS
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// "{"name":"张三"}"
```

toJSON方法的一个应用是，将正则对象自动转为字符串。因为JSON.stringify默认不能转换正则对象，但是设置了toJSON方法以后，就可以转换正则对象了。

``` JS
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""

// 上面代码在正则对象的原型上面部署了toJSON()方法，将其指向toString()方法，因此转换成 JSON 格式时，正则对象就先调用toJSON()方法转为字符串，然后再被JSON.stringify()方法处理。
```

### JSON.parse()
JSON.parse方法用于将 JSON 字符串转换成对应的值，如果传入的字符串不是有效的 JSON 格式，JSON.parse方法将报错。
``` JS
try {
  JSON.parse("'String'");
} catch(e) {
  console.log('parsing error');
}
```

JSON.parse方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify方法类似

``` JS
function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
```