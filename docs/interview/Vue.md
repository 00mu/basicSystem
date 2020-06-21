# Vue

目录
[题目来源](https://juejin.im/post/59ffb4b66fb9a04512385402)

## Vue 使用

### vue 父子组件如何通讯

- props
- emit

### 如何用自定义事件进行 vue 组件通讯

### vue 父子组件生命周期调用顺序

<img :src="$withBase('/vue_life_cycle.png')">

### 面试会考察哪些 vue 高级特性

### vue 如何自己实现 v-model

### vue 组件更新之后如何获取最新 DOM

### slot 是什么

### vue 动态组件是什么

### vue 如何异步加载组件

### vue 如何缓存组件

### vue 组件如何抽离公共逻辑

### vue-router 知识点串讲

## Vue 原理（必考）

### 如何理解 MVVM

- 组件化
- 数据驱动视图

1. M -> model (date)
2. V -> View (template)
3. VM -> ViewModel (事件等)

<img :src="$withBase('/vue_mvvm.png')">

### 监听 data 变化的核心 API 是什么

核心 API-Object.defineProperty setter getter

Object.defineProperty 缺点

- 深度递归，需要递归到底一次性计算量大
- 无法监听新增属性和删除属性（Vue.set Vue.delete）
- 无法原生监听数组，需要特殊处理

### 如何深度监听 data 变化

```JS
// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView() // 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments)
        // Array.prototype.push.call(this, ...arguments)
    }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)

                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue

                // 触发更新视图
                updateView()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }

    // 污染全局的 Array 原型
    // Array.prototype.push = function () {
    //     updateView()
    //     ...
    // }

    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }

    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 准备数据
const data = {
    name: 'zhangsan',
    age: 20,
    info: {
        address: '北京' // 需要深度监听
    },
    nums: [10, 20, 30]
}

// 监听数据
observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
// // console.log('age', data.age)
// data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
// delete data.name // 删除属性，监听不到 —— 所以有 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4) // 监听数组

```

### vue 如何监听数组变化

### 虚拟 DOM-面试里的网红

### 用过虚拟 DOM 吗

### 虚拟 DOM-diff 算法概述

### 深入 diff 算法源码解析

- 生成 vnode
- patch 函数
- patchVnode 函数
- updateChildren 函数

### 虚拟 DOM-考点总结和复习

vdom 核心概念

- h 函数
- vnode
- patch
- diff
- key

### 模板编译前置知识点-with 语法

### vue 模板被编译成什么

### vue 组件可用 render 代替 template

### 回顾和复习已学的知识点

### vue 组件是如何渲染和更新的

### vue 组件是异步渲染的

### 如何用 JS 实现 hash 、H5 history 路由

-

### vue 原理-考点总结和复习

## Vue 实战

### v-for 为何使用 key

### 组件 data 为何是函数

### 何时使用 keep-alive

### 何时需要使用 beforeDestroy

### diff 算法时间复杂度

### vue 常见性能优化

## Vue3

### vue3 要来了 vue2 就过时了吗？

### Proxy 基本使用-part1

### Proxy 基本使用-part2

### vue3 用 Proxy 实现响应式

兼容性不好，无法 polyfill
