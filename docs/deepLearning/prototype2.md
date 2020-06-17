# 03（二） 原型与继承

## 原型链检测

1. `a instanceof A`， 返回一个布尔值，检测的是 a 的整个原型链上是否有 构造函数的 「原型对象」即 A.prototype

2. `a.__proto__ === A.prototype` ，检测 a 的原型是否为 A.prototype；`__proto__` 是所有浏览器都支持的非标准属性

3. `Object.getPrototypeOf(a)` ，获取 a 的原型，是 `__proto__` 标准写法； `Object.setPrototypeOf(a, A.prototype)` 将 A.prototype 设置为 a 的原型，等价与 `a.__proto__ === A.prototype`

4. `a.hasOwnProperty('name')`， 返回一个布尔值，检测的是 a 自身是否拥有属性 `name`，而非来自继承； `for in`会遍历整个原型链上 enumerable 不为 false 的属性和方法

5. `A.isPrototypeOf(a)`，A 对象是否在 a 对象的原型链上；eg: a = Object.create(A)，返回 true

## 多态

面向对象的多态，根据不同的对象响应不同的结果

```JS
function Dog(){}
Dog.prototype.say = function() {
  console.log('汪汪汪')
}

function Duck() {}
Dog.prototype.say = function() {
  console.log('嘎嘎嘎')
}

for (const iterator of [new Dog(), new Duck()]) {
  iterator.say()
}

// 汪汪汪
// 嘎嘎嘎
```

## 借用方法

```JS
function Dog(name, age){
  this.name = name;
  this.age = age;
  function view(){
    console.log(this.name, this.age)
  }
}
Dog.prototype.say = function() {
  return '汪汪汪'
}

function xDog() {}
// xDog 继承了 Dog
xDog.__proto__ = Dog.prototype;

// 1. 自己写一个方法
xDog.prototype.say = function () {
  console.log('小花汪汪汪')
}

// 2. 使用父级的方法
xDog.prototype.say = function () {
  console.log(`小花${Dog.prototype.say}`)
}

// 3. call、apply
function Ddog(...args){
  Dog.apply(this, ...args)
}
Ddog.prototype = Object.create(Dog.prototype);

const  xiaoniu = new Ddog('zhangsan', 18)
// new 出来的实例拥有了 name和age属性

```

## 对象的创建方式

### 工厂函数实现封装继承

```JS
function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.show = function(){
  console.log(this.name , this.age)
}

// 继承失基于原型的继承 而非原型连的继承
// 工厂函数，原型工厂，批量制造原型

// 构造函数sub的原型对象sub.prototype 继承 构造函数sup 原型对象的属性sup.prototype;
// 这样，sub的实例的原型链 sub.prototype->sup.prototype，从而可以拥有sub.prototype 和 sup.prototype的属性和方法，实现继承。

function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  // Object.create 创建的对象因为重新赋值，会丢失自己的所有属性和方法；此时需要将constructor重新指会自身
  // 使用defineProperty的原因在于默认的 constructor 是不可遍历的，修改enumerable
  // Object.getPropertyDescriptor(sub.prototype, 'constructor') 查看属性描述
  Object.defineProperty(sub.prototype, 'constructor', {
    value : sub,
    enumerable: false
  })
}

// Admin 继承 User
extend(Admin, User);
// 接受参数； apply 来借用其他函数的方法 为自己所用
function Admin(...args){
  User.apply(this, args)
}
// 实例
let admin = new Admin('周', 18)

```

### 对象工厂派生对象 并 实现继承

```JS
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function(){
  console.log(this.name, this.age)
}

// 对象工厂
function admin(name, age){
  const instance = Object.create(User.prototype);
  User.call(instance, name, age)
  console.log(instance)
  return instance;
}

let lisi = admin('李思', 30)

console.log(lisi)
// User {name: "李思", age: 30}


// lisi的原型就是User.prototype
Object.getPrototypeOf(lisi) === User.prototype // true
```

### 多继承的困扰 mixin 混入

如果要使用时很多方法怎么办？

```JS
function Address(){}
Address.prototype.getAddress = function(){console.log('获取地址')}

function Credit(){}
Credit.prototype.total = function(){console.log('积分统计')}

function Request(){}
Credit.prototype.ajax = function(){console.log('请求后台')}

function User(name, age){
  // User的实例如果要使用以上的办法，怎么办？
  // ？ 将 以上对象都挂到 User的原型链上，一个个继承 显然不行，因为使得Address Credit Request产生了关联

  // 那怎么办？
}
```

改良，改成对象一次压入

```JS
const address = {
  getAddress(){console.log('获取地址')}
}
const credit = {
  total(){console.log('积分统计')}
}
const request = {
  ajax(){console.log('请求后台')}
}

// mixin 当用到的对象合并到原型就行了
User.prototype = Object.assign(User.prototype, address, credit, request)

```

### mixin 内部继承与 super 关键字

```JS

const request = {
  ajax(){
    return'请求后台'
  }
}

const credit = {
  __proto__: request,
  total(){
    // console.log(this.__proto__.ajax());
    // super 替代了 this.__proto__
    console.log(super.ajax() + '积分统计')
  }
}

function User(){}

User.prototype = Object.assign(User.prototype, credit, request)



let admin = new User();
admin.total()
```
