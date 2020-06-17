# 03（三） 面向对象 类

类 让 面向对象编程更加舒服（语法糖）

## 面向对象编程

### 三大特点

1. 继承：可以实现子类调用自己没有的属性方法
2. 封装：将属性和方法封装这对象中，可以利用私有或者公有属性，对外提供可以访问的方法或属性

### 五大原则（关注两大）

1. 单一原则：一个类应该有且只有一个去改变它的理由，这意味着一个类应该只有一项工作
2. 开放封闭：对象或实体应该对扩展开放，对修改封闭

## class 声明类的语法

构造函数

```JS
function User(){
  this.name = name;
}
let admin = new User('管理员')
admin.name //
```

class 声明

```JS
class User{
  // constructor 会自动被执行
  constructor(name){
    this.name = name
  }
  getName(){
    return this.name
  }
  show（）{

  }
}

let admin = new User('管理员')
```

类 和 原型没啥区别 语法糖，写法更加清洗

```JS
class User{}
User.prototype.constructor === User // true

function Animal(){}
Animal.prototype.constructor === Animal // true
```

类里面的方法主动放到原型对象中了

```JS
// 类中的方法
class User{
  show(){

  }
}

// 对应的原型写法
function User(){}
User.prototype.show = function(){}
```

### constructor

属性放在函数中，保证每个实例的属性是独有的。this 指向实例

方法放在原型中，各个实例是共享的。

```JS
class User{
  site = "baidu.com";  // 定义在外边就是共享的属性
  constructor(name){
    this.name = name; // this 实例独有属性
  }
}
const u = new User('人')
Object.getOwnPropertyNames(u) // ['name']

// 等价于
function Hd(name){
  this.name = name
}
const p = new Hd('东西')

Object.getOwnPropertyNames(p) // ['name']
```

### class 声明的方法为什么不能遍历？

```JS
// 原型中不遍历到原型链的属性，需要这么操作
for(const key in u){
if(h.hasOwnproperty(key)){
console.log(key)
}
}

// 类中 已经帮你解决了
```

因为类中的方法已经设置了不可遍历

原型链的上属性没啥用？

### class 默认使用了严格模式

this 指向 undefined 而非 window

### 静态属性

分配给原型的属性，定义到函数上，称之为静态属性

```JS
function User(){}
User.name = "zhangsan"

class Animal{
  static name = "zhangsan"
}
```

```JS
class User{
  show(){
    console.log("原型方法")
  }

  static show(){
    console.log("原型方法")
  }
}


// 调用
User.show() //原型方法

new User().show() // 原型方法

```

使用场景

```JS
class Member{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  static create(...agrs){
    // return new Member(...agrs)
    return new this(...agrs)  // 这里的this是Member
  }
}

// 比较方便的创建对象

let abc = Member.create('李思'， 78)

// 到目前为止还没理解 看起来没啥区别
let def = new Member('李思'， 78)
```

那我们再举个例子

```JS
const data = [
  {name: 'js', price: 100},
  {name: 'html', price: 233},
  {name: 'css', price: 45},
  {name: 'mysql', price: 677},
]

class Lesson{
  constructor(data){
    this.model = data
  }

  price(){
    return this.model.price
  }

  // 访问器的形式，调用的时候不用写括号
  get name(){
    return this.model.name
  }

  // 静态方法不是对单个数据进行处理的
  static createBatch(data){
    return data.map(item=>new Lesson(item))
  }

  // 获取最贵的课程
  static maxPrice(data){
    return data.sort((a,b)=>b.price()-a.price())[0]
  }
}

// 课程的集合
let lessons = Lesson.createBatch(data)
// 最贵的课程
console.log(Lesson.maxPrice(lessons))
console.log(Lesson.maxPrice(lessons).price())
console.log(Lesson.maxPrice(lessons).name) // name方法访问器的形式，不用括弧了

```

### 继承中的 super
