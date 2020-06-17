# 待续 异步

Promise
有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）

关键词： JS 单线程、事件循环、队伍队列

主线程执行完毕，不断的读取任务队列

例 1：加载图片，回调函数的异步

```JS
// 定义 图片加载 方法
function loadimg(url, resolve, reject){
  const img = new Image()
  img.src = url;
  img.onload = resolve;
  img.onerror = reject;
}

// 调用
loadimg('http://baidu.com/**.png',
()=>{
  console.log('加载成功的回调')
},
()=>{
  console.log('加载失败的回调！')
}
)
```

定时器线程

例 2：一个 div 不断的向右边移动

```HTML
<div class="Redblock" style="width:: 100px; height: 100px; background-color: red;">
```

```JS
function interval(cb, delay = 50) {
  let intervalId = setInterval(() => cb(intervalId), delay);
}

interval((id) => {
  console.log(id)
  const div = document.querySelector(".Redblock");
  let left = parseInt(window.getComputedStyle(div).left);

  div.style.left = left + 10 + "px";

  if (left >= 200 -10) {
    clearInterval(id);
  }
});

```

```javascript
// const p = Promise.race([
//   fetch("/resource-that-may-take-a-while"),
//   new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error("request timeout")), 5000);
//   }),
// ]);

// p.then(console.log).catch(console.error);
```

避免回调地狱=》Promise
宏任务 && 微任务

```JS
// pedding 等待
// resolved 成功状态
// rejected 失败状态
new Promise((resolve, reject)=>{
  resolve('成功');
  // reject('失败');
}).then(
  (res)=>{
  console.log(res)
}, res=>{console.log(123)}).then(()=>{
  console.log(1)
  console.log(2)
}
```

同步任务 微任务 宏任务

```JS
setTimeout(()=>{
  console.log('我是异步-宏任务')
})
new Promise(resolve=>{
  resolve()
  console.log('我是同步任务')
}).then(red=>{
  console.log('我是异步-微任务')
})
console.log('1')

// 我是同步任务
// 1
// 我是异步-微任务
// 我是异步-宏任务
```

宏任务套微任务

```JS
new Promise(resolve=>{
  setTimeout(()=>{
    resolve()
    console.log('我是异步-宏任务')
  })
  console.log('我是同步任务')
}).then(red=>{
  console.log('我是异步-套在宏任务下的微任务')
})
console.log('1')
```

promise 的状态是单向不可逆的，一旦发生不可改变

Promise.then

第一个 then 里面不做任何处理，会继续向后处理

```JS
new Promise((resolve, reject)=>{
  reject('任务失败了')
}).then().then(
  msg=>{
    console.log(msg)
  },
  res=>{
    console.log(res)
  }
)
```

then 也是一个 promise

```JS
new Promise((resolve, reject)=>{
  reject('失败')
}).then(
  setTimeout(()=>{
    console.log(1)
  })
).then(
  null,
  msg=>{
    console.log(2)
  },
)
```

后一个 then 接受前一个返回的 promise

```JS
new Promise((resolve, reject)=>{
  reject('失败1')
}).then(null, err => new Promise((resolve, reject)=>{
    reject('失败2')
  })
).then(
  res => console.log('res' + res),
  err => console.log('err' + err) // 这里来接受失败2
)

// err失败2
```

JS 内部封装的一些 promise（待续）

除了 reject 抛出错误外，一些常用的 rejected 状态的情况

```JS
new Promise((resolve, reject)=>{
  // reject('拒绝')
  // reject(new Error('这是一个错误'))
  // throw new Error('也会执行rejected')
  // hd + 1 // 变量未定义等
}).then(null, err=>{
  console(err, '都会走到这里来')
})
```

catch 放在最后面统一处理 rejected 的错误

自定义错误

finnly 永远会执行，不管请求成功鱼钩最后都要结束 loading

手写一个加载图片吧

```JS
function loadimg(url){
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.src = url;
    img.onload = resolve(img)
    img.onerror = reject()
  })
}

loadimg('https://timgsa.baidu.com/tim7.jpg').then(res=>{console.log(1, res)}).catch(err=>{console.log(2, err)})
```

封装一个 setTimeout

```JS
function timeout(delay=100){
  return new Promise(resolve=>{
    setTimeout(() => {
      resolve()
    }, delay);
  })
}
timeout(2000).then(()=>{
  console.log(1);
  return timeout(1000)
}).then(()=>{console.log(2)})
```

then 里面如果不是 reject 形式，他就是一个同步任务

```JS
console.log(1)
new Promise(reject=>{
  console.log(2)
  reject()
  console.log(3)
}).then(console.log(4))

// 都是同步输出

// 1
// 2
// 3
// 4
```

重写 div 变化的例子

```HTML
<div
  class="Redblock"
  style="
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: 0;
  "
></div>
```

```JS
function interval(delay, callback) {
  return new Promise((resolve) => {
    let id = setInterval(function () {
      callback(id, resolve);
    }, delay);
  });
}

interval(100, (id, resolve) => {
  const div = document.querySelector(".Redblock");
  let left = parseInt(window.getComputedStyle(div).left);

  if (left >= 200 - 10) {
    clearInterval(id);
    resolve("移动结束");
  }
  div.style.left = left + 10 + "px";
})
  .then((res) => {
    console.log("状态1：" + res);
    // 注意这里的return， 如果下一个then要生效的话，此then必须return一个promise
    return interval(1000/60, (id, resolve) => {
      const div = document.querySelector(".Redblock");
      let width = parseInt(window.getComputedStyle(div).width);

      if (width >= 200 - 10) {
        clearInterval(id);
        resolve("变胖结束");
      }
      div.style.width = width + 10 + "px";
    });
  })
  .then((res) => {
    console.log("状态2：" + res);
  });
```
