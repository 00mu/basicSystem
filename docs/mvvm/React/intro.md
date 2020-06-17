React 入门

- 基本使用（必考）
- 高级特性（拉开差距）
- redux react-router

# 常见面试题

## react 组件间如何通讯

## JSX 本质是什么（vue 模板）

## context 是什么

## shouldCompontentUpdate(SCU)的用途

## 描述 redux 单项数据流（画出来）

## setState 是同步还是异步？（重点 api 没有之一，场景图）

## react 基本使用，必须掌握

- 变量、表达式
- class Style
- 子元素和组件

```JS
this.state = {
    name: ''
    imgUrl: '',
    flag: true
}

render() {
    // 获取变量
    const pEl = < p > {
        this.state.name
    } < /p>
    return pEl;
    // 表达式
    const exprEl = < p > {
        this.state.flag ? 'yes' : 'no'
    } < /p>
    return exprEl;
    // class
    <
    p className = "title" > < /p>
        // style
        // 静态的style
        <
        p style = "font-size: 30px; color: #999" > < /p>
        // 注意{{}}和{}区别
        <
        p style = {
            {
                fontSize: 20 px,
                color: red
            }
        } > < /p> <
    p style = {
        {
            fontSize: 20 px,
            color: red
        }
    } > < /p>
    const styleEl = {
        fontSize: 20 px,
        color: red
    }
    const styleEl = < p style = {
        styleEl
    } > < /p>

    // 原生html
    const rawHtml = '<span>文本<i>斜体</i></span>'
    const rawHtmlDate = {
        __html: rawHtml;
    }

    const rawHtmlEl = < div >
        <
        p dangerouslySetInnerHTML = {
            rawHtml
        } > < /p> / / 输出的是编译后的html <
        p > {
            rawHtml
        } < /p> / / 输出源码 <
        /div>
    return rawHtmlEl;

    //加载组件
    const componentEl = < div >
        <
        p > JSX中加载一个组件 < /p> <
    hr / >
        <
        List / >
        <
        /div>
    return componentEl;

},
```

### 条件判断渲染

```JS
render() {
    const blackBtn = < button className = "btn-black" > black btn < /button>
    const whiteBtn = < button className = "btn-white" > white btn < /button>

    // ifelse
    if (this.state.theme === 'black') {
        return blackBtn
    } else {
        return whiteBtn
    }
    // 三元运算符
    // &&

    return <div > {
            this.state.theme === 'black' ? blackBtn : whiteBtn
        } <
        /div>
}
```

### 列表渲染

- map（数组 map，重组一个新的数组，类似 vfor）
- key(和 vue 相同)

```js
render() {
    return <ul > {
            this.state.list.map(
                (item, index) => {
                    // key和vuekey类似，必填不能是index或者redom
                    return <li key = {
                            item.id
                        } >
                        index {
                            index
                        };
                    title {
                        item.title
                    } <
                    /li>
                }
            )
        } <
        /ul>
}
```

## 重点-事件

- bind this
- 关于 event 的参数
- 传递自定义参数

### 修改方法的 this 指向 bind this

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
}
```

### event

reat 中的 event 不是原生的 event, 是 react 封装的的。**proto**.custructor 是 syntheticevent 。event.nativeEvent 才是原生事件。

```JS
clickHandler3 = (event) => {
    // 是模拟的，模拟了所有和dom事件一致的行为
    console.log('target', event.target);
    console.log('current target', event.currentTarget);

    // 原生事件 event.nativeEvent
    console.log('current target', event.nativeEvent.currentTarget);
    console.log('current target', event.nativeEvent.currentTarget);
    // document，react中所有事件都是挂载到document的
    // 和dom事件也不一样和vue事件也不一样

    // todo 为什么要这么做？？？
}
```

传递参数，最后追加一个参数，即可接受 event

```JS
clickHandler4(id, title, envent) {
    console.log(id, title);
    console.log('event', event);
}
```

## 表单

- 受控组件(input 里面的值受 state 控制)、非受控组件（后面再讲）
- input、textarea、select 用 value
- checkbox radio 用 checked

```JS
class ListDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "周雅",
            city: "北京",
        };
    }

    render() {
        // 受控组件
        return ( <
            div className = "list" >
            <
            p > {
                this.state.name
            } < /p>
            // for是关键字，需要用htmlFor
            <
            label htmlFor = "nameInput" > 姓名 < /label>
            // react 中没有v-modle ，实现一看似个双向绑定的效果
            <
            input id = "nameInput"
            value = {
                this.state.name
            }
            onChange = {
                this.onOInputChange
            }
            /> < /
            div >
        );
    }
    onOInputChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    };
}
ReactDOM.render( < ListDemo / > , document.getElementById("root"));
```

1. textarea 和 input 的使用方式是一样的，不能 `<textarea>{***}</textarea>` 这么用

2. radio/checkbox 修改 checked 的值

## 组件使用 - props

- props 传递数据
- props 传递函数
- props 类型检查

## setState (! 非常重要)

- 不可变值（设么时候设置什么时候用，不能提前设置，不能修改原 state 值）（函数式编程，纯函数）

为什么不可变，shouldCompontentUpdate 时候讲

```JS
this.setState({
    list1: this.state.list1.concat(100),
    list2: [...this.state.list2, 100],
    list3: this.state.list3.slice(0, 3), // 截取
    list4: this.state.list4.filter(item => item > 100), // 筛选
    list5: list5Copy // 其他操作
})

// 不能直接对this.setState.list进行push pop splice。违反了不可变值
// 对象，使用Object.assign({}, this.state.obj1, {a:100})
// {...this.state.obj1, {a:100}}，也不能修改属性
const orderBy = (arr, props, orders) => [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
        if (acc === 0) {
            const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
            acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
        }
        return acc;
    }, 0)
);
```

- 可能会异步更新

什么时候是异步的？

```JS
// 异步
this.setState({
    count: this.state.count + 1
}, () => {
    // vue $nextTick
    console.log('回调可以拿到最新值', this.state.conut) //  回调拿到最新的值
})
console.log('同步拿不到最新值', this.state.conut) //  回调拿到最新的值
```

```JS
// setTimeout中的setState是同步的
setTimeout(() => {
    this.setState({
        count: this.state.count + 1
    })
    console.log('同步的，可以拿到', this.state.conut)
}, 0)

// 自定义的dom事件是同步的
bodyClickHandler = () => {
    this.setState({
        count: this.state.count + 1
    })
    console.log('同步的', this.state.count)
}
// 声明周期，创建
componentDidMonut() {
    document.addEventLister('click', this.bodyClickHandler)
}

// 销毁
componentWillUnMonut() {
    // 自定义的dom事件、setTimeout要及时销毁
    document.removeEventLister('click', this.bodyClickHandler)
}
```

- 可能会合并

传入对象

```JS
// 传入对象会被合并，执行结果只一次+1
// 原因是这里的setState是异步的
// 类似 Object.assign()
this.setState({
    count: this.state.count + 1
})
this.setState({
    count: this.state.count + 1
})
this.setState({
    count: this.state.count + 1
})
```

传入函数，不会被合并，因为函数没发合并

```JS
this.setState((prevent, props) => {
    return {
        count: prevent.count + 1
    }
})
```

## 组件声明周期

画出来

jsx 基本使用
条件
列表
事件
表单 受控组件
组件和 props
setState - 不可变值 可能是异步 可能会合并
react 的生命周期

和 vue 对比

## react 的高级特性（和 vue 差不多| 和其他候选人拉开差距）

- 考察做过的项目是否有深度和复杂度

### 函数组件

class 的精简版，更复合 react 的设计理念：
通过设置一个组件渲染出一个组件（数据驱动视图）

日常的一部分。

- class 组件

```JS
class List extends React.comment {
    constructor(props) {
        super(props)
    }
    render() {
        const {
            list
        } = props

        return <ul > {
                list.map((item, index) => {
                    return <li key = {
                            item.id
                        } >
                        <
                        span > {
                            item.title
                        } < /span>           < /
                    li >
                })
            } <
            /ul>
    },
}
```

- 函数组件

```JS
function List(props) {
    const {
        list
    } = props
    return <ul> {
            list.map((item, index) => {
                return <li key = {
                        item.id
                    } >
                    <
                    span > {
                        item.title
                    } < /span>           < /
                li >
            })
        } </ul>
}
```

- 纯函数，输入 props，输出 jsx
- 没有实例，没有生命周期，没有 state
- 不能扩展其他方法

#### 使用建议

函数组件能满足的就用函数组件来写。

### 非受控组件

- ref
- defaultValue defaultChecked
- 手动操作 dom 元素

#### 使用场景

- 必须手动操作 dom 元素，setState 实现不了
- 比如 文件上传、富文本编辑器

- 优先使用受控组件（符合数据驱动视图）
- 必须进行 dom 操作时

```JS
this.nameInputRef = React.createRef() //创建ref

    <input defaultValue = {
        this.state.name
    }
ref = {
        this.nameInputRef
    }> // 绑定ref

    this.nameInputRef.current // 获取ref
```

### Portals（传送门）

组件默认是按照层级 dom 树渲染的，如何让组件渲染到父组件以外
{this.props.children} 类似 vue slot，可以获取文本和子组件的父组件直接传入的内容

```JS
render() {
    return ReactDOM.craetePortal( <
        div className = "modal" > {
            this.props.children
        } < /div>
    )
}
```

使用场景

1. overflow: hidden
2. 父组件 z-index 值太小
3. fixed 需要放在 body 第一层

### context 上下文

- 在最外层公共信息（语言、主题）如何传递给每一个组件？
- 用 props 太繁琐
- redux 小题大做了

```JS
// 1. 创建Context 填入默认值
const ThemeContext = React.createContext("light")

// 底层组件-class组件
class ThemeBtn extends React.Component {
        // 指定context读取当前的theme context
        static contextType = ThemeContent
        // 也可以使用ThemeBtn.contextType = ThemeContext

        render() {
                const theme = this.context
                return <div >
                    button `s theme is {theme}
    </div>
  }
}
ThemeBtn.contextType = ThemeContext
// 底层组件- 函数组件
function ThemeLink(props) {
  //
  return <ThemeContent.Consumer>
  {value=><p>link theme is {value}
  </ThemeContent.Consumer>
}

// 嘴歪车给你
// 2. 生产方  ThemeContent.Provider
<ThemeContent.Provider value={this.state.theme}>
<ThemeBtn/>
<ThemeLink/>
</>
```

### 异步组件

vue：
import() webpack

React:
组件比较大或者路由懒加载的时候
React.lazy
React. Suspense

```JS
const ContextDemo = Reat.lazy(() => import('./ContextDemo'))

render() {
        return <div >
            <React.Suspense fallback = {
                <div> Loading... < /div>}> <
                ContextDemo / >
                <
                /React.Suspense> <
                /div>
            }
```

### 性能优化（涉及到 react 基本理念 不可变值）

- 性能优化永远是 React 面试的重点，对于 React 更加重要 \*

* shouldCompontentUpdate(SCU)
* PureCompontent 和 React.memmo
* 不可变值 (immutable.js 引入可以彻底杜绝变值)

#### SCU 基本用法

生命周期
shouldCompontentUpdate(nextProps, nextState) {
if(nextProps.count !== this.state.count){
// 可以引入 loadsh
return true // 可以渲染
}
return false // 不可以渲染
}

问题 1：默认返回 true，为什么还要给你一个可定制的权力？？

## React 逻辑中，默认：父组件有更新，所有子组件都跟着更新

SCU 默认会返回一个 true

问题 2：SUC 需要每次都用吗？
需要的时候才优化，这个权力交给你

## SCU 的基础是 state 不可变值

一旦在 setState 时修改了 state 的值，SCU 对比就永远一致了。

一次行递归到底非常消耗性能，所以并不建议深度比较
（深拷贝 深比较 都需要慎用）

### PureCompontent(纯组件) 和 memmo（买~猫~ 备忘录）

浅比较已经适用大部分情况，要求 state 设计层级不要太深

- PureCompontent ， SCU 实现了浅比较，比较第一层。依然需要不可变值
- memo 函数组件中的 PureCompontent

```JS
class List extends React.PureCompontent{
render(){

}
// 隐式添加一个scu的生命周期
// shouldCompontentUpdate(){
// //  浅比较
// }
}
```

React.memo

```JS
// memo
function MyCompent(props){
  //
}
function aerEqual(prevProps, nedxtProps) {

}
export default React.memo(MyCompent, aerEqual)

```

#### immutable.js （彻底拥抱『不可变值』）

- 彻底拥抱不可变值
- 基于共享数据（不是深拷贝），速度快
- 有一定学习和迁移成本，按需选用

<!-- 和es6语法不一致 -->

```JS
const map1 = Immutable.Map({a:1, b:2,c:3})
const map2 = map1.set('b', 50)
map1.get('b') // 2
map2.get('b') // 50
```

### 高阶组件 HOC

#### 关于组件公共逻辑的抽离

- mixin，已被 react 弃用
- 高阶组件（hight order componnent
- Render Props

高阶组件不是一种功能，而是一种模式（工厂模式）『vue 怎么实现高阶组件』

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

### Render Props

也是一种技巧性的操作，vue 不适用。
核心思想是：通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件

## redux

- vuex 作用相同，但比 vuex 学习成本高
- 不可变值，纯函数
- 面试常考

### 基本概念

- store state
- action
- reducer

### 单向数据流图

dispacth(action)
reducer->newState
subscribe 触发通知

### react-redux

### 异步 action

### 中间件
