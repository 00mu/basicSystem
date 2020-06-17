# 数据

## Symbol

独一无二的值，当做一个永远不会重复的字符串来使用

### 语法

```JS
let a  = Symbol();

let user=Symbol('给symbol一个描述，知道是啥用的')

console.log(user.description) // 给symbol一个描述，知道是啥用的

let cms1 = Symbol.for("cms");
let cms2 = Symbol.for("cms");
Symbol.keyFor(cms1) === Symbol.keyFor(cms1) // true  'cms'
```

### 场景 避免重复

#### 例 1

避免重复，比如一个班里面有两位 "李四"

```JS
let user1 = {
  name: '李四',
  key: Symbol()
}
let user2 = {
  name: '李四',
  key: Symbol()
}
let grad = {
  [user1.key]: 10,
  [user2.key]: 10,
}

console.log(grad)

// 防止出现这种情况
let grad1 = {
  lisi: 10,
  lisi: 10,
}

```

#### 例 2 缓存容器

```JS
class Catch{
  static data = {};
  static set(name, value){
    return this.data[name]= value;
  }
  static set(name){
    return this.data[name];
  }
}
let user = {
  name: 'apple',
  age: 10,
  key: Symbol('user')
}
let cat = {
  name: 'apple'
  age: 100,
  key: Symbol('cat')
}
Catch.set(user.name, user)
Catch.set(cat.name, cat)

console.log(Catch.get('apple')) // 只能取到最后一个结果，被覆盖了


Catch.set(user.key, user)
Catch.set(cat.key, cat)

Catch.get(cat.key) // 这就能取到正确值
```

### 对象属性私有化

for in 这些是遍历不到的
