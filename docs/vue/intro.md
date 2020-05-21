## 组件的本质
就是一个函数，给我什么样的数据，我就渲染什么样的html内容

* 模板引擎时代，输出是html字符串
* vue、react，输出是Virtual DOM（VNode）

一个组件最核心的是render函数，剩余的其他内容，如 data、compouted、props 等都是为 render 函数提供数据来源服务的。

patch

* Virtual DOM 带来了 分层设计，它对渲染过程的抽象，使得框架可以渲染到 web(浏览器) 以外的平台，以及能够实现 SSR 等
* 至于 Virtual DOM 相比原生 DOM 操作的性能，这并非 Virtual DOM 的目标，确切地说，如果要比较二者的性能是要“控制变量”的，例如：页面的大小、数据变化量等。

函数式组件：
function MyComponent(props) {}
第二种方式是使用一个类
class MyComponent {}

是一个纯函数
没有自身状态，只接收外部数据
产出 VNode 的方式：单纯的函数调用
有状态组件：

是一个类，可实例化
可以有自身状态
产出 VNode 的方式：需要实例化，然后调用其 render 函数

###  用VNode描述真实Dom

``` JS
const elementVNode = {
    tag: 'div',
    data: {
        style: {
            width: '100px',
            height: '100px',
            backgroundColor: 'red'
        }
    }
    children: {
        tag: null,
        data: null,
        children: '文本内容'
    }
}
```

### 辅助创建 VNode 的 h 函数

h 函数作为创建 VNode 对象的函数封装；将模板编译成vnode树

``` JS
function(tag, data = null, children = null) {
    // 省略用于确定 flags 相关的代码

    let childFlags = null
    if (Array.isArray(children)) {
        const {
            length
        } = children
        if (length === 0) {
            // 没有 children
            childFlags = ChildrenFlags.NO_CHILDREN
        } else if (length === 1) {
            // 单个子节点
            childFlags = ChildrenFlags.SINGLE_VNODE
            children = children[0]
        } else {
            // 多个子节点，且子节点使用key
            childFlags = ChildrenFlags.KEYED_VNODES
            children = normalizeVNodes(children)
        }
    } else if (children == null) {
        // 没有子节点
        childFlags = ChildrenFlags.NO_CHILDREN
    } else if (children._isVNode) {
        // 单个子节点
        childFlags = ChildrenFlags.SINGLE_VNODE
    } else {
        // 其他情况都作为文本节点处理，即单个子节点，会调用 createTextVNode 创建纯文本类型的 VNode
        childFlags = ChildrenFlags.SINGLE_VNODE
        children = createTextVNode(children + '')
    }
}
```

以上用于确定非组件类型的VNode，组件类型的VNode没有子节点，所有子节点都是作为slots形式存在的。

<template>
  <div>

    <span></span>

  </div>
</template>

``` JS
const elementVNode = h('div', null, h('span'))

const elementVNode = {
    _isVNode: true,
    flags: 1, // VNodeFlags.ELEMENT_HTML
    tag: 'div',
    data: null,
    children: {
        _isVNode: true,
        flags: 1, // VNodeFlags.ELEMENT_HTML
        tag: 'span',
        data: null,
        children: null,
        childFlags: 1, // ChildrenFlags.NO_CHILDREN
        el: null
    },
    childFlags: 2, // ChildrenFlags.SINGLE_VNODE
    el: null
}

const elementWithTextVNode = h('div', null, '我是文本')

const elementWifthTextVNode = {
    _isVNode: true,
    flags: 1, // VNodeFlags.ELEMENT_HTML
    tag: 'div',
    data: null,
    children: {
        _isVNode: true,
        flags: 1, // VNodeFlags.ELEMENT_HTML
        tag: 'span',
        data: null,
        children: null,
        childFlags: 1, // ChildrenFlags.NO_CHILDREN
        el: null
    },
    childFlags: 2, // ChildrenFlags.SINGLE_VNODE
    el: null
}
```

### 在设计有状态组件时，我们会设计一个基础组件，所有组件都会继承基础组件，并且基础组件拥有用来报告错误信息的 render 函数
