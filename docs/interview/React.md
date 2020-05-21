# React 入门

**state 不可变值！state 不可变值！state 不可变值！**

## React 使用

### JSX 基础语法

1. class 组件

```JS
import React from 'react'
import './style.css'
import List from '../List'

class JSXBaseDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '双越',
            imgUrl: 'https://img1.mukewang.com/5a9fc8070001a82402060220-140-140.jpg',
            flag: true
        }
    }
    render() {
        // // 获取变量 插值
        // const pElem = <p>{this.state.name}</p>
        // return pElem

        // // 表达式
        // const exprElem = <p>{this.state.flag ? 'yes' : 'no'}</p>
        // return exprElem

        // // 子元素
        // const imgElem = <div>
        //     <p>我的头像</p>
        //     <img src="xxxx.png"/>
        //     <img src={this.state.imgUrl}/>
        // </div>
        // return imgElem

        // // class
        // const classElem = <p className="title">设置 css class</p>
        // return classElem

        // // style
        // const styleData = { fontSize: '30px',  color: 'blue' }
        // const styleElem = <p style={styleData}>设置 style</p>
        // // 内联写法，注意 {{ 和 }}
        // // const styleElem = <p style={{ fontSize: '30px',  color: 'blue' }}>设置 style</p>
        // return styleElem

        // 原生 html
        const rawHtml = '<span>富文本内容<i>斜体</i><b>加粗</b></span>'
        const rawHtmlData = {
            __html: rawHtml // 注意，必须是这种格式
        }
        const rawHtmlElem = <div>
            <p dangerouslySetInnerHTML={rawHtmlData}></p>
            <p>{rawHtml}</p>
        </div>
        return rawHtmlElem

        // // 加载组件
        // const componentElem = <div>
        //     <p>JSX 中加载一个组件</p>
        //     <hr/>
        //     <List/>
        // </div>
        // return componentElem
    }
}

export default JSXBaseDemo
```

2. 函数组件

```JS
待补充

```

### JSX 如何判断条件和渲染列表

```JS
class ListDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    id: 'id-1',
                    title: '标题1'
                },
                {
                    id: 'id-2',
                    title: '标题2'
                },
                {
                    id: 'id-3',
                    title: '标题3'
                }
            ]
        }
    }
    render() {
        return <ul>
            { /* vue v-for */
                this.state.list.map(
                    (item, index) => {
                        // 这里的 key 和 Vue 的 key 类似，必填，不能是 index 或 random
                        return <li key={item.id}>
                            index {index}; id {item.id}; title {item.title}
                        </li>
                    }
                )
            }
        </ul>
    }
}
```

### React 事件为何 bind this

方法中 this 的默认值 undefined

```JS
this.clickHander1 = this.clickHander1.bind(this)

render() {
    clickHandler1() {
        // console.log('this...',this) //this默认undefined
        // 需要在用bind绑定
        this.setState({
            name: 'list'
        })
    }

    // 静态方法， this指向当前实例
    clickHandler2 = () => {
        this.setState({
            name: 'list'
        })
    }

        // 获取 event
    clickHandler3 = (event) => {
        event.preventDefault() // 阻止默认行为
        event.stopPropagation() // 阻止冒泡
        console.log('target', event.target) // 指向当前元素，即当前元素触发
        console.log('current target', event.currentTarget) // 指向当前元素，假象！！！

        // 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件
        console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
        console.log('event.__proto__.constructor', event.__proto__.constructor)

        // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
        console.log('nativeEvent', event.nativeEvent)
        console.log('nativeEvent target', event.nativeEvent.target)  // 指向当前元素，即当前元素触发
        console.log('nativeEvent current target', event.nativeEvent.currentTarget) // 指向 document ！！！

        // 1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
        // 2. event.nativeEvent 是原生事件对象
        // 3. 所有的事件，都被挂载到 document 上
        // 4. 和 DOM 事件不一样，和 Vue 事件也不一样
    }
    // 传递参数
    clickHandler4(id, title, event) {
        console.log(id, title)
        console.log('event', event) // 最后追加一个参数，即可接收 event
    }
}
```

### React 事件和 DOM 事件的区别

- event 指向
  Reat 中的 event 不是原生的 event, 是 react 封装的。`_proto__.custructor` 是 syntheticevent。模拟了所有和 dom 事件一致的行为。
- event.nativeEvent 才是原生事件。
- react 中所有事件都是挂载到 document 的

### React 表单知识点串讲

### React 父子组件通讯

- 组件和 props（类型检查）

### state 有什么注意事项

- 第一，state 要在构造函数中定义
- 第二，不要直接修改 state ，使用不可变值
- 第三，setState 可能是异步更新（有可能是同步更新）

  正常操作是异步的，需要在回调函数中拿最新的 state；

  setTimeout 中 setState 是同步的

  自定义的 DOM 事件，setState 是同步的

```JS
this.setState({
        count: this.state.count + 1
    }, () => {
        // 联想 Vue $nextTick - DOM
        console.log('count by callback', this.state.count) // 回调函数中可以拿到最新的 state
    })
```

- 第四，state 异步更新的话，更新前会被合并

  传入是对象的话，会被合并（类似 Object.assign ）；

  传入函数，不会被合并（因为函数是无法合并的）；

### 什么场景需要用 React Portals(传送门)

Portals 将组件渲染到父组件以外，常用 dialog pops 等，用来脱离父组件文档流的限制

```JS
render() {
    return ReactDOM.craetePortal( <
        div className = "modal" > {
            this.props.children
        } < /div>
    )
}
```

### 什么场景需要用 React Context（上下文）

- 父组件向所有子组件传递数据，比如公共信息（语言、主题）
- 用 props 太繁琐
- redux 小题大做了

### React 性能优化（尤为重要）SCU

性能优化永远是 React 的重点，对于 React 更加重要。因为

1. React 逻辑中，默认：父组件有更新，所有子组件都跟着更新
2. 在 SCU 中，新旧值对比默认返回 true，表示可渲染，阻止渲染
3. React 给了你需要优化的时候不渲染的权力
4. SCU 的基础是 state 不可变值，因为一旦修改了 state，SUC 对比就永远一致了

```JS
shouldCompontentUpdate(nextProps, nextState) {
    if(nextProps.count !== this.state.count){
    // 可以引入 loadsh
    return true // 可以渲染
    }
    return false // 不可以渲染
}
```

一次行递归到底非常消耗性能，所以并不建议深度比较（深拷贝 深比较 都需要慎用）。React 提供了两个可以浅比较的 api，隐式在 scu 生命周期进行浅比较

- PureCompontent(纯组件)
- memo（买~猫~ 备忘录） 函数组件中的 PureCompontent

**immutable.js**，是彻底拥抱不可变质的，基于共享数据而不是深拷贝，速度快。语法和 es6 不同有学习和迁移成本。

```JS
const map1 = Immutable.Map({a:1, b:2,c:3})
const map2 = map1.set('b', 50)
map1.get('b') // 2
map2.get('b') // 50
```

### 如何对组件抽离公共逻辑

1. 高阶组件 HOC
   高阶组件不是一种功能，而是一种模式（工厂模式）

```JS
// 高阶组件不是一种功能，而是一种模式（工厂模式）
const HOCfactory = (Component)=>{
  class HOC extends React.Component{
    // 在此定义多个组件的公共逻辑
    render(){
      return <Component {...this.props}/> // 返回拼装的结果
    }
  }
  return HOC
}

const e1 = HOCfactory(WrappendComponent1)
const e2 = HOCfactory(WrappendComponent2)
```

2. Render Props
   也是一种技巧性的操作，vue 不适用。
   核心思想是：通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件

3. hook
   还没理解。。。

### 什么是 React Render Props

### Redux 考点串讲

### 描述 Redux 单项数据流

action->dispatch->reducer->state->view

### 串讲 react-redux 知识点

### Redux action 如何处理异步

### 简述 Redux 中间件原理

### 串讲 react-router 知识点

- 路由模式（has、H5 history）,同 vue-router
- 路由配置（动态路由、懒加载），同 vue-router

## React 原理

大厂用 React 的概率更高，因为更好的技术，熟练后效率可能比 vue 更高一些。大厂更热衷考察原理

### 函数编程与 react 关系

使用纯函数和不可变值（scu redux）

### vdom 和 diff 是实现 React 的核心技术

vdom
vue2.x vue3.0 react 实现 vdom 细节都不相同；核心概念和实现思路都一样

- 和 vue 差不多
- h 函数->vnode->path 函数

diff

- 只比较同一层级，不再深度比较
- tag 不同直接删掉重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较

### JSX 本质是什么

- 等同于 vue 模板
- vue 模板不是 html（）
- jsx 也不是 js（转化为 React.creatElement(tag, null, child)）

React.creatElement 是什么

```JS
React.createElement('div', {...}, child1, child2, child3)
React.createElement(List, null, child1, child2, '文本节点')
// h 函数
// 返回 vnode
// patch
```

- 即 h 函数，返回 vnode
- 第一个参数可能是组件，也可能是 html tag
  1. 组件名首字母必须大写，来区分是组件而不是 html tag
  2. 是组件的话继续找组件的 jsx 来拆分，直到最底层是 html

### 说一下 React 的合成事件机制

1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
2. event.nativeEvent 是原生事件对象
3. 所有的事件，都被挂载到 document 上
4. 和 DOM 事件不一样，和 Vue 事件也不一样

合成事件-图示

1. DOM：事件冒泡到顶层 document
2. 合成事件层：实例化成同一的 reactevent
3. 事件处理函数：dispatchEvent 派发，event 对象交由对应的处理器执行

为什么要合成事件机制？

- 更少的依赖 dom 事件，从而更好的兼容行和跨平台
- 挂载到 document（事件代理），较少内存的消耗，避免频繁的解绑
- 方便事件的统一管理（如事务机制，后面再讲）

### 说一下 setState 的 batchUpdate 机制

- 有时异步（普通），有时同步（setTimeout、Dom 事件）
- 有时合并（对象形式，像 Object.assign），有时不合并（函数形式）

```JS
// 对象形式
this.setState({
    count: this.state.count + 1
})

// 函数形式
this.setState((prevState, props) => {
    return {
        count: prevState.count + 1
    }
})
```

1. setState 主流程的关键节点

   是否处于 bath update 机制中？保存组件于 dirtyComponnets 中（异步）：直接更新（同步）

2. 哪些能命中 batchUpdate 机制？（react 可以管理的 入口）

- 生命周期（和他调用的函数）
- react 中注册的事件（和他调用的事件）

3. 哪些不能命中 batchUpdate 机制？（react 管不到的 入口）

- setTimeout setIntervald 等
- 自定义的 dom 事件

### 简述 React 事务机制

bactchUpdate

### setState 是同步还是异步

  <img :src="$withBase('/setState.png')">
接上一条，

- setState 无所谓同步异步
- 看是否命中 bactchUpdate 机制
- 判断 isBatchUpdates 是否为 true（异步）反之同步

setState 是异步的，setTimeout 和自定义事件中是同步的

### 说一下 React 组件渲染和更新的过程

- 回顾 vue 组件渲染更新(响应式、模板监听、虚拟 dom)
  <img :src="$withBase('/vueRender.png')">

  1. Component render Function ->vdom
  2. 同时 render touch Date ，触发 setter 通知 watcher
  3. 重新渲染下组件

- 回顾 jsx 本质和 vdom

  1. JSX 即 createElement 函数
  2. 执行生成 vnode
  3. patch(elem, vnode)和 patch(vnode, newVnode)

1. 组件渲染和更新过程

   - props state
   - render() 生成 vnode
   - patch(elem, vnode)

2. 更新的过程

   - setState(newState) --> dirtyComponnets
   - render() 生成 newVnode
   - path(vnode, newVnode)

### React-fiber 如何优化性能

1. fiber 将上述的 patch 拆分为两个阶段：

   1. reconciliation 阶段：diff 算法，纯 JS 计算
   2. commit 阶段：将 diff 结果渲染为 dom
   3. 同时再有 dom 操作需求，将卡顿

2. 为什么要分两个步骤？

   - JS 单线程，并且和 dom 渲染共用线程
   - 组件足够复杂的时候，计算和渲染压力大

3. fiber 的解决方案

   - 将 reconciliation 进行任务拆分
   - DOM 需要渲染时暂停，空闲时恢复（通过 window.requestIdleCallback api，执行子任务）

### React 原理-考点总结和复习

## React 实践

### setState 何时会合并？

### 组件之间如何通讯

props
redux
自定义事件

### 组件的生命周期

<img :src="$withBase('/react_life_cycle.png')">

- 单组件的生命周期
- 父子组件的生命周期（和 vue 一致）

### ajax 应该放在哪个生命周期

同 Vue，放在 dom 加载完毕，componentDidMount 中

### 渲染列表，为何使用 key

- 同 vue，必须使用 key，并且不能是 index 和 random
- diff 算法中通过 tag 和 key 来判断，是否是 sameNode，sameNode 只需移动移动 开销小
- 用 key 减少渲染次数，提升渲染性能

### React 函数组件和 class 组件有何区别

- 函数组件（纯函数：返回一个新值，没有副作用），输入 props，输出 jsx
- 没有实例，没有生命周期，没有 state
- 不能扩展其他方法
- 函数组件能满足的就用函数组件来写

函数组件是 class 组件 的精简版，更复合 react 的设计理念：
通过设置一个组件渲染出一个组件（数据驱动视图）

```JS
import React from 'react'
import ListItem from './ListItem'

function List({ list = [], deleteItem, toggleCompleted }) {
    return <div>
        {list.map(item => <ListItem
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            toggleCompleted={toggleCompleted}
        />)}
    </div>
}

export default List
```

### 什么是 React 非受控组件？

1. 什么是受控组件

   - 表单的值，受 state 控制
   - 需要自行监听 onchange，更新 state

2. 什么是非受控组件(非受控组件使用场景)

   在一些场景下需要手动才做 dom 元素，就需要用到非受控组件

```JS
// 1 创建ref
this.nameInputRef = React.createRef() //创建ref
// 2 绑定ref
<input defaultValue = {this.state.name} ref = {this.nameInputRef} />
// 3. 获取ref
this.nameInputRef.current
```

### React 何时使用异步组件？

- 同 vue
- 加载大组件
- 路由懒加载
- 依赖 React.lazy、React.Suspense 两个 api

```JS
const ContextDemo = React.lazy(() => import('./ContextDemo'))

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <p>引入一个动态组件</p>
            <hr />
            <React.Suspense fallback={<div>Loading...</div>}>
                <ContextDemo/>
            </React.Suspense>
        </div>

        // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
        // 2. 看 network 的 js 加载
    }
}
```

### react-router 如何配置懒加载

和使用异步组件差不多,
依赖 React.lazy、React.Suspense 两个 api

### 多个组件公共逻辑如何抽离

- HOC（高阶组件）
- Render Props
- Hook

### redux 如何进行异步请求

- 异步 action
  同步 action 是返回一个对象，异步 action 是 patch 一个对象
- 使用中间件 redux-thunk

### React 常见性能优化方式

1. react 框架的优化
   - 渲染列表时正确添加 key
   - 自定义事件、DOM 事件及时销毁
   - 合理使用异步组件
   - 减少函数 bind this 的次数（放在哪？）
   - 合理使用 scu PureCompontent 和 memo
   - 合理使用 immutable.js
2. webpack 层面的优化
3. 前端通用的性能优化，图片懒加载
4. 使用 SSR

### React 和 Vue 的区别

还是有很多共通点：

1.  都支持组件化
2.  都是数据驱动视图
3.  都是使用 vdom 操作 dom（数据驱动视图的基础）

区别：

1. React 使用 jsx 拥抱 js，Vue 使用的 templete 拥抱 html
2. React 函数式编程(setState 来监听数据)，Vue 声明式编程（definePrototype）;对数据监听和组件更新的方式不一样的
3. React 更多需要自力更生，Vue 把想要的给你（指令、插值、vfor...）
