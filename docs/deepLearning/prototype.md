# 03 原型与原型链

图一来展示 实例、构造函数、原型对象及原型链之间的关系，图二进一步详细梳理关系。
<img :src="$withBase('/prototype1.png')" alt="实例、构造函数、原型对象">
1. 构造函数：用来初始化创建对象的函数；
2. 实例：通过构造函数的new操作符创建的对象；
3. 构造函数的prototype属性（显式原型）指向实例对象的原型对象；
4. 原型对象的constructor属性指向构造函数，实例继承其原型对象的属性constructor属性也指向构造函数；
5. 实例对象的__prototype属性（隐式原型）指向原型对象；

<img :src="$withBase('/prototype2.png')" alt="实例、构造函数、原型对象">

``` JS
function Foo(){};
var f1 = new Foo;
```

``` JS
// A框中：
// 1. 实例的__ptoto__属性 和 构造函数的prototype属性共同指向原型对象Foo.prototype；
f1.__ptoto__ === Foo.prototype;
// 2. 原型对象的constructor指向构造函数；
Foo.prototype.constructor === Foo;
// 3. f1 继承原型对象的属性，f1.constructor也指向构造函数；
f1.constructor === Foo;

// B框中：
// 4. 原型对象本身也是对象，任何对象都可以看做Object构造函数new操作的实例化，
// 所以对象Foo.prototype的__proto__指向Object函数的原型对象Object.prototype；
Foo.prototype.__proto__ === Object.prototype
// 5. Object()函数的原型对象的构造函数指向Object
Object.prototype.constructor === Object;
// 6. Object.prototype作为实例对象，它的原型对象是null；原型链的终点是null，原型链不可以形成闭环
Object.prototype.__proto__ === null;

// C框中：
// 7. 函数也是对象，Foo可以看做Function函数的实例化
Foo.__proto__ === Function.prototype;
// 8. 原型对象的构造函数是构造函数本身
Function.prototype.constructor === Function;
// 9. Function 是 Function的实例
Function.__proto__ === Function.prototype;
// 10. Object作为构造函数同时也是Function的实例，
Object.__proto__ === Function.prototype
```


略绕的是：
* 函数（Function也是函数）是 `new Function `的结果，所以函数可以作为实例对象，构造函数是Function()，原型对象是Function.prototype
* 对象（函数也是对象）是 `new Object` 的结果，所以对象可以作为实例对象，构造函数是Object()，原型对象是Object.prototype
* 函数f1原型链指向顺序沿着，1->4->6 指向了终点null