# promise

基础语法

```JS
new Promise((resolve, reject)=>{
  console.log('我是第一步')
  // resolve，reject只有一个状态会生效，谁在前面执行谁的状态
  // resolve('起床')
  reject('继续睡会')
}).then(
  // then 里面有俩函数，第一个接受resolve，另一个接受reject
  // 如果只关心成功状态，第二个参数可以不传
  // 通常更喜欢用catch承接reject状态
  resolve=>{
    console.log('成功状态',resolve)
}, reject=>{
  console.log('失败状态', reject)
})
```

也可以这么写，`promise.then()`，同样是承接上一个`promise` 的返回结果

```JS
const p =new Promise((resolve, reject)=>{
  console.log('我是第一步')
  reject('继续睡会')
})
p.then(
  resolve=>{
    console.log('成功状态',resolve)
}).catch(
  err=>console.log(err)
)
```

`then` 每次都是一个全新的 `promise`

```JS
const p =new Promise((resolve, reject)=>{
  console.log('我是第一步')
  reject('继续睡会')
})
const p1 = p.then()
const p2 = p1.then(
  console.log('call 1')
})

console.log(p1) // promise
// p1, p2 都是promise
```

`promise.then` 的返回值不是 promise 的话，默认返回的是 fulfilled 状态

```JS
new Promise((resolve, reject)=>{
  resolve(0)
}).then(setTimeout(()=>{console.log(123)}, 2000))
.then(console.log(456))
.then(console.log(789)).
then(res=>console.log(res))
// 456
// 789
// 0 //Promise {<rejected>: 0}
// 123

```

```JS
new Promise((resolve, reject)=>{
  setTimeout(()=>{resolve(0)},  2000)

}).then(setTimeout(()=>{console.log(1)}, 1000))
.then(console.log(2))
.then(console.log(3)).
then(res=>console.log(res))

// 2
// 3
// Promise {<pending>}
// 1
// 0
```

```JS
new Promise((resolve, reject)=>{
  console.log(-1)
  setTimeout(()=>{resolve(0)},  2000)
  console.log(-2)

}).then(setTimeout(()=>{console.log(1)}, 1000))
.then(console.log(2))
.then(msg=>{
  return new Promise(resolve=>{
    console.log(3)
    resolve(msg)
    console.log(4)
  })
  console.log(5)
}).
then(res=>console.log(res))
```

错误是冒泡的操作的，如果后面的 then 没对 reject 进行处理，将一直冒泡到 `catch` 处理错误

```JS
new Promise((resolve, reject)=>{
  reject(new Error('请求错误'))
})
.then(res=>{})
.then()
.catch(err=>console.log(err))

```

异步中的错误，会走系统处理，而非 catch。注意下面的区别

```JS
new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("fail");
  }, 2000);
}).catch(msg => {
  console.log(msg + "消息");
});
// Promise {<pending>}
// Uncaught Error: fail
// 系统处理错误
```

```JS
new Promise((resolve, reject) => {
  throw new Error("fail");
}).catch(msg => {
  console.log(msg + "消息");
});

// Error: fail消息
```

只要 promise 的 pending 状态改变就会执行`finally`

```JS
new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve()
  })
})
.then(msg => {
  console.log("resolve");
})
.catch(msg => {
  console.log("reject");
})
.finally(() => {
  console.log("resolve/reject状态都会执行");
});
```

#### 案例 封装一个定时器

```JS
function timeout(time) {
  return new Promise(resolve=>setTimeout(resolve, time))
}

timeout(3000)
.then(()=>{
  console.log('3s后开始')
  return timeout(1000)
})
.then(()=>{
  console.log('再1s后开始')
})
```

### promise.resolve 快速返回一个成功的 promise 对象

```JS
Promise.resolve('直接返回一个promise').then(res=>{console.log(res)})
```

### reject 和 resolve 类型，快速返回一个失败的 primise

```JS
Promise.reject('直接返回一个promise').catch(res=>{console.log(res)})
```

### promise.all 同时执行多个并行异步操作

- 同时执行一个或多个异步
- 参数必须是可迭代类型的 array、set
- 一个失败了就会 reject
- 都成功后返回 promise 结果的数组

```JS
let p1 = new Promise((resolve, reject) => {
  resolve("fulfilled");
});
let p2 = new Promise((resolve, reject) => {
  resolve("fulfilled2");
});
Promise.all([p1, p2]).then(reason => {
  console.log(reason);
}).catch(err=>console.log(err))

// ["fulfilled", "fulfilled2"]
```

### allSettled 和 all 不同的是，结果永远是 fulfilled

```JS
let p1 = Promise.resolve('resolve')
let p2 = Promise.reject('reject')
Promise.allSettled([p1, p2]).then(reason => {
  console.log(reason);
});
// [{status: "fulfilled", value: "resolved"},{status: "rejected", reason: "rejected"}]
```

### race 哪一个快去哪一个值

```JS
const p1 = new Promise(resolve=>{
  setTimeout(resolve, 1000)
})
const p2 = new Promise((resolve, reject)=>{
  setTimeout(reject, 900)
})

Promise.race([p1, p2])
```

### any 有一个成功就输出成功

- 全部失败才抛出失败，失败是一个数组

```JS
const p1 = new Promise(resolve=>{
  setTimeout(resolve, 1000)
})
const p2 = new Promise((resolve, reject)=>{
  setTimeout(reject, 900)
})
Promise.any([p1, p2]).then(err=>{console.log(err)})
```

### promise 队列

```JS
// JavaScript
```
