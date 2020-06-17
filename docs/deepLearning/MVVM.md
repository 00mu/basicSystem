# MVVM 浅聊

- 画架构图？ 架构师啊原来
  架构组
- 提供基础的组件
-

## MVVM 模式 - 目标

最符合的现代 UI 的模式

- view 层的组件有一定的输入和反馈能力
- 每一个组件都来自 UI 库
- 组装是由完全声明式的代码完成的
- model 层的编写是完全自由的，和 view 完全无关 ，modle 其中是普通的 JS 对象

view <=> viewModle -> model

## viewModle 是什么？

是链接 view 和 model 层的胶水，连接层，写的 vue 可以称之为 vm

数据和视图的绑定

## modle 要怎么写？

modle 层不应该知道 view 和 viewmodle 的存在

在一些场景下，modle 可能是已经存在但是与 UI 无关的代码

一个合格的 mvvm 框架应该能够以极低的成本为这些 modle 提供展示和操作的能力

## 代码得跟着写一遍才行

vue3.0 的环境还不是好配

## mixin 的问题？是什么

## typescript 越复杂月应该使用这个

## vue3.0

更新系统 和 响应系统

- tree-shaking
- compositon API(新加)
- Fragments
- teleport
- suspense（sync 在将渲染树渲染到屏幕之前，内部先处理好所有的异步组件，然后在渲染到页面）

- 为什么不推荐使用 class 的方式
  混入(mixin) 将不再作为推荐使用， Composition API 可以实现更灵活且无副作用的复用代码

## 响应式

ES5 Object.defineProperty() getter setter

reat 事件拦截

### 响应

- getter
- setter

```JS
// 其实这就是一个observe函数
function convert(obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]; // 闭包
    Object.defineProperty(obj, key, {
      get(){
        console.log(`gettiing key "${key}:${internalValue}"`)
        return internalValue
      },
      set(newValue){
        console.log(`setting key "${key}:${newValue}"`)
        internalValue = newValue;
      }
    })
  });
}
```

### 跟踪依赖

订阅模式

dep 类

1. dep => depend & notify
2. autorun

```JS
window.Dep = class Dep{
  constructor() {
    this.subscribers = new Set()
  }
  // 收集依赖
  deep(){
    if(activeUpdate){
      // 注册当前active UPdate 作为订阅者 subscriber
      this.subscribers.add(activeUpdate)
    }
  }
  // 通知
  notify(){
    // run all subscriber functions
    this.subscribers.forEach(sub=>sub())
  }
}

let activeUpdate;

function autorun(update){
  function wrappedUpdate(){
    activeUpdate = wrappedUpdate;
    update()
    activeUpdate = null
  }
}

autorun(()=>{
  dep.depend()
})
```

简单实践版本不需要关心边界情况
、、

总结以上三个函数，我们就搞定了一个 mini 的响应系统
observe 需要一个对象，监听它的 getter 和 setter，在 getter 和 setter 里面我么可以设置依赖，然后利用 dep 类和 autorun 函数和 depnotify；本质上我们创建了一个响应对象。

当我们通过赋值和改变属性值，它调用 dep.notify 出发改变，这就是 vue 更新系统的工作原理。

## 插件的编写

vue.use()

插件本质上也是一个函数

Vue.mixin(options)

`$options` 实例属性

```JS
const myPlugin = {
  install(Vue){
    Vue.minxin({
      create(){
        if(this.$options.rules){

        }
      }
    })
  }
}

const vm = new Vue({
  data: {foo:10}
  rules:[{
    foo:{

    }
  }]
})
```

`$watch` 监听变化，执行一个回调

vue-loader 构建时预编译模板

## render

- (compiled into ) render function 编译的渲染函数
  1. returns new virtural DOM - new virtual dom
  2. diffed against old virtual -dom update
  3. applied to Actual DOM
- (renturns) virtural DOM 虚拟 dom
- (gennerates) ACTUAL dOM 真实 dom

所有的 data 属性是具有响应性的，帮助组件的渲染函数收集依赖

### Actual dom

`document.createElement('div')`

渲染出来是底层 c++编写的浏览器引擎实现，它只是提供了 JS 中的 API，供我们使用

### virtual dom

`vm.$createElement('div')`

相比之下，vue 中的虚拟 dom 会在每个实例通过 this.\$createElement 返回一个虚拟的节点，这个虚拟节点也表示一个 div

JS DOM 相互调用的成本很高，修改 DOM 是缓慢的，尽管引擎做了优化

虚拟 DOM，真正的价值不在于让框架变得更快，而是以声明的方式构成你想要的 DOM 结构。这提供了更过的可能，另一个好处是将 dom 逻辑从真实的 dom 中分离开来。so，我们并不一定渲染成 dom，让渲染到 ios 或者安卓或者服务端称为可能。

当然虚拟 dom 并不是唯一可以实现的方式，但他是一个好的方式。

最后。渲染函数，只是返回虚拟 dom 的函数

templates 在 vuejs 是通过渲染函数编译的

`vue-template-explorer.now.sh`

每一个组件豆油一个负责监视的观察者，收集依赖项，清理并通知所有内容。

渲染放在 antorun 中，自动循环渲染，每个组件都有自己的主动循环渲染

组件树由许多这样的组件组成，每个组件都只负责自己的依赖

这有一个优势，一个精确的依赖跟踪系统，摆脱渲染优化的问题。reat 是自上而下的渲染模型

为此，我们花费了将数据转化为 getter 和 setter 的开销。

### JSX 和 template

其实是一回事，当我们在谈论他们的时候要考虑最终目标；他们都是一种声明 dom 的状态的关系。模板只是一种更静态？更受约束的表达形式； JSX 或渲染函数更加的动态，具有更大的灵活性，你可以做任何你想做的事，只要是代码可以实现的你都可以放在渲染函数中，可以摆脱新语法和模板的限制，以便完成更复杂的渲染要求。

HTML 和模板语法接近，任何 html 解析器都可以解析它们，更加熟悉方便的还原设计，模板的静态性能更容易优化编译。

vue 提供了两种方式，默认使用模板，你也可以选用 render function

### Render Function API

h 函数，称之为超脚本，只是一种惯例

```JS
export default {
  render(h){
    return h('div', {}, [...])
  }
}

// 第二个参数是各种各样的属性，并不是必须的
// 第三个参数是各种子节点，包括文本节点或者组件节点
```

组件节点

```JS
import MyCompontens form ".."
h(MyCompontens, {
  props: {...}
})
```

```JS
<div id="app">
<example :tags="['h1','h2', 'h3']"></example>
</div>

Vue.compontent('example', {
  // render: h=>h()
  // 箭头函数的中 this 指向外部上下文，所以你拿不到
  // 我们改写成普通函数
  // render: function(h){}
  // 简化下
  props: ['tags']
  render(h){
    return h('div', this.tags.map((tag, i)=>h(tag, i)))
    ])
  }
})

new Vue({el: '#app'})
```

函数组件 有称之为 无状态组件

普通组件支持实例化，函数组件不支持实例

### 高阶组件

有更强的复用性
更利于测试，和外部没有逻辑和耦合

还记得高阶函数的定义吗？至少满足下面一个条件就是高级函数

- 函数作为参数
- 函数作为返回值

```JS
高阶组件是一个方法，这个方法接收一个原始组件作为参数，并返回新的组件
```

有时 mixin 更容易使用

```JS

@装饰器
function
```

一个展示用户头衔的组件，是有个状态组件，他要保持状态，并负责 api 请求

在 create 申明周期，只表示实例被创建，
montend，dom 被创建

## 状态管理

代码越来越多的时候，代码如何存放和状态如何管理的问题，查明问题越来约重要

flux，单向数据流，就想眼睛一样，在需要的时候你自然知道改用他

### vuex

data 之所以使用函数，是因为我们希望每个组件的实例都有自己独立的唯一数据，而不是这些组件共享相同的数据。？

自己用起来

原理是基于 vue 实例实现响应性

状态管理器

高端花哨的库都是基于前端小点搞的

## 函数组件

最后我得说，其实『状态驱动』才是 Vue 的精髓所在

### 订阅-发布 设计模式搞明白

vue 中的是那个

- observer（监听器）：
- watcher（订阅者）：
- compile（编译器）：
