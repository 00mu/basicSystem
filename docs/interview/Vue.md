# Vue

## ss

1.  ### 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

    官网推荐推荐的使用 key，应该理解为“使用唯一 id 作为 key”。因为 index 作为 key，和不带 key 的效果是一样的。index 作为 key 时，每个列表项的 index 在变更前后也是一样的，都是直接判断为 sameVnode 然后复用。

    说到底，key 的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。

    正是因为带唯一 key 时每次更新都不能找到可复用的节点，不但要销毁和创建 vnode，在 DOM 里添加移除节点对性能的影响更大

2.  ### 聊聊 Redux 和 Vuex 的设计思想

    - 共同点

    首先两者都是处理全局状态的工具库，大致实现思想都是：全局 state 保存状态---->dispatch(action) ------>reducer(vuex 里的 mutation)----> 生成 newState; 整个状态为同步操作；

    - 区别

    最大的区别在于处理异步的不同，vuex 里面多了一步 commit 操作，在 action 之后 commit(mutation)之前处理异步，而 redux 里面则是通过中间件处理

3.  ### 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

    #### 核心是利用 ES5 的 Object.defineProperty,这也是 Vue.js 为什么不能兼容 IE8 及以下浏览器的原因。

    Object.defineProperty 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

    Object.defineProperty( obj, // 定义属性的对象 prop, // 要定义或修改的属性的名称 descriptor, // 将被定义或修改属性的描述符【核心】

    observe 的功能就是用来监测数据的变化。实现方式是给非 VNode 的对象类型数据添加一个 Observer,如果已经添加过则直接返回，否则在满足一定条件下去实例化一个 Observer 对象实例。

    Observer 是一个类,它的作用是给对象属性添加 getter 和 setter,用于 依赖收集 和 派发更新

    #### 依赖收集 getter（重点关注以下两点）

    - const dep = new Dep() // 实例化一个 Dep 实例

    - 在 get 函数中通过 dep.depend 做依赖收集

    Dep 是一个 Class,它定义了一些属性和方法，它有一个静态属性 target，这是一个全局唯一 Watcher【同一时间内只能有一个全局的 Watcher 被计算】。Dep 实际上就是对 Watcher 的一种管理，Dep 脱离 Watcher 单独存在是没有意义的。Watcher 和 Dep 就是典型的观察者设计模式。

    Watcher 是一个 Class,在它的构造函数中定义了一些和 Dep 相关的属性：

    ```JS
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    ```

    收集过程：当我们实例化一个渲染 watcher 的时候，首先进入 watcher 的构造函数逻辑，然后执行他的 this.get()方法，进入 get 函数把 Dep.target 赋值为当前渲染 watcher 并压栈（为了恢复用）。接着执行 vm.\_render()方法，生成渲染 VNode,并且在这个过程对 vm 上的数据访问，这个时候就触发数据对象的 getter（在此期间执行 Dep.target.addDep(this)方法，将 watcher 订阅到这个数据持有的 dep 的 subs 中，为后续数据变化时通知到哪些 subs 做准备）。然后递归遍历添加所有子项的 getter。

    Watcher 在构造函数中初始化两个 Dep 实例数组。newDeps 代表新添加的 Dep 实例数组，deps 代表上一次添加的 Dep 实例数组。 依赖清空：在执行清空依赖（cleanupDeps）函数时，会首先遍历 deps,移除对 dep 的订阅，然后把 newDepsIds 和 depIds 交换，newDeps 和 deps 交换，并把 newDepIds 和 newDeps 清空。考虑场景，在条件渲染时，及时对不需要渲染数据的订阅移除，减少性能浪费。

    考虑到 Vue 是数据驱动的，所以每次数据变化都会重写 Render,那么 vm.\_render()方法会再次执行，并再次触发数据

    收集依赖的目的是为了当这些响应式数据发生变化，触发它们的 setter 的时候，能知道应该通知哪些订阅者去做相应的逻辑处理【派发更新】

    派发更新 setter（重点关注以下两点）

    *childOb = !shallow && observe(newVal) // 如果 shallow 为 false 的情况，会对新设置的值变成一个响应式对象
    *dep.notify() // 通知所有订阅者
    派发过程：当我们组件中对响应的数据做了修改，就会触发 setter 的逻辑，最后调用 dep.notify()方法，它是 Dep 的一个实例方法。具体做法是遍历依赖收集中建立的 subs，也就是 Watcher 的实例数组【subs 数组在依赖收集 getter 中被添加，期间通过一些逻辑处理判断保证同一数据不会被添加多次】，然后调用每一个 watcher 的 update 方法。

    update 函数中有个 queueWatcher(this)方法引入了队列的概念，是 vue 在做派发更新时优化的一个点，它并不会每次数据改变都会触发 watcher 回调，而是把这些 watcher 先添加到一个队列中，然后在 nextTick 后执行 watcher 的 run 函数

    队列排序保证：

    组件的更新由父到子。父组件创建早于子组件，watcher 的创建也是
    用户自定义 watcher 要早于渲染 watcher 执行，因为用户自定义 watcher 是在渲染 watcher 前创建的
    如果一个组件在父组件 watcher 执行期间被销毁，那么它对应的 watcher 执行都可以被跳过，所以父组件的 watcher 应该先执行。
    队列遍历：排序完成后，对队列进行遍历，拿到对应的 watcher,执行 watcher.run()。
    run 函数解析：先通过 this.get()得到它当前的值，然后做判断，如果满足新旧值不等、新值是对象类型、deep 模式任何一个条件，则执行 watcher 的回调，注意回调函数执行的时候会把第一个参数和第二个参数传入新值 value 和旧值 oldValue，这就是当我们自己添加 watcher 时候可以在参数中取到新旧值的来源。对应渲染 watcher 而言，在执行 this.get()方法求值的时候，会执行 getter 方法。因此在我们修改组件相关数据时候，会触发组件重新渲染，接着重新执行 patch 的过程

    手写一个数据绑定

    ```JS
    <input id="input" type="text" />
    <div id="text"></div>

    let input = document.getElementById("input");
    let text = document.getElementById("text");
    let data = { value: "" };
    Object.defineProperty(data, "value", {
    set: function(val) {
        text.innerHTML = val;
        input.value = val;
    },
    get: function() {
        return input.value;
    }
    });
    input.onkeyup = function(e) {
    data.value = e.target.value;
    };
    ```

4.  ### Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

    1. 原生 DOM 操作 vs. 通过框架封装操作

       这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

    2. 对 React 的 Virtual DOM 的误解

       React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

    3. MVVM vs. Virtual DOM
       相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的
       O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：

       脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)

       依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。

       MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。

       Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by \$index 以后都比 React 快: dbmon (注意 Angular 默认版本无优化，优化过的在下面）

       顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

    4. 性能比较也要看场合
       在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

       初始渲染：Virtual DOM > 脏检查 >= 依赖收集
       小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
       大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化
       不要天真地以为 Virtual DOM 就是快，diff 不是免费的，batching 么 MVVM 也能做，而且最终 patch 的时候还不是要用原生 API。在我看来 Virtual DOM 真正的价值从来都不是性能，而是它

       **1) 为函数式的 UI 编程方式打开了大门；**

       **2) 可以渲染到 DOM 以外的 backend，比如 ReactNative。**

    5. 总结
       以上这些比较，更多的是对于框架开发研究者提供一些参考。主流的框架 + 合理的优化，足以应对绝大部分应用的性能需求。如果是对性能有极致需求的特殊情况，其实应该牺牲一些可维护性采取手动优化：比如 Atom 编辑器在文件渲染的实现上放弃了 React 而采用了自己实现的 tile-based rendering；又比如在移动端需要 DOM-pooling 的虚拟滚动，不需要考虑顺序变化，可以绕过框架的内置实现自己搞一个。

5.  ### 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

    每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

6.  ### 在 Vue 中，子组件为何不可以修改父组件传递的 Prop

    因为 vue 设计是单向数据流，数据的流动方向只能是自上往下的方向；

    所以我们需要将修改数据的源头统一为父组件，子组件像要改 prop 只能委托父组件帮它。从而保证数据修改源唯一

    在 vue 底层，做了一个类似全局标记 Flag;它的实现原理，还是 Object.defineProperty()API

    window.isUpdatingChildComponent = false;
    相当于一个 Flag;只有当在父组件中修改传递给子组件的 Prop 值的时候，才会被赋值为 True;
    在子组件 Proxy.vue 中代理父组件传递的 Prop 值； 使用 this.\$forceUpdate(); 强制更新；
    这时候，触发代理中的 setter；提示不可以在子组件中直接修改父组件传递的 Prop 值的警告；

7.  ### 双向绑定和 vuex 是否冲突

    在严格模式中使用 Vuex，当用户输入时，v-model 会试图直接修改属性值，但这个修改不是在 mutation 中修改的，所以会抛出一个错误。当需要在组件中使用 vuex 中的 state 时，有 2 种解决方案：

    1. 在 input 中绑定 value(vuex 中的 state)，然后监听 input 的 change 或者 input 事件，在事件回调中调用 mutation 修改 state 的值
    2. 使用带有 setter 的双向绑定计算属性。见以下例子[来自官方文档](https://vuex.vuejs.org/zh/guide/forms.html)：

8.  ### Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

    1. Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
    2. Object.defineProperty 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy 可以劫持整个对象，并返回一个新的对象。
    3. Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

    ```JS
    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()
    ```

    ```JS
    Object.defineProperty(obj, 'key', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'static'
    });
    ```

    ```JS
    const handler = {
        get: function(obj, prop) {
            return prop in obj ? obj[prop] : 37;
        }
    };

    const p = new Proxy({}, handler);
    ```

9.  ### Vue 的父组件和子组件生命周期钩子执行顺序是什么

    1. 加载渲染过程 父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted
    2. 子组件更新过程 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
    3. 父组件更新过程 父 beforeUpdate->父 updated
    4. 销毁过程 父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

10. ### react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别

    从最终渲染的 DOM 来看，这两者都是链接，都是 `<a>` 标签，区别是：

    `<Link>` 是 react-router 里实现路由跳转的链接，一般配合 `<Route>` 使用，react-router 接管了其默认的链接跳转行为，区别于传统的页面跳转，`<Link>` 的“跳转”行为只会触发相匹配的 `<Route>` 对应的页面内容更新，而不会刷新整个页面。
    而 `<a>` 标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一个页面（非锚点情况）

11. ### vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

    1. 将事件处理程序代理到父节点，减少内存占用率
    2. 动态生成子节点时能自动绑定事件处理程序到父节点

    从 vue 的角度上来看上面两点

    - 在 v-for 中，我们直接用一个 for 循环就能在模板中将每个元素都绑定上事件，并且当组件销毁时，vue 也会自动给我们将所有的事件处理器都移除掉。所以事件代理能做到的第一点 vue 已经给我们做到了
    - 在 v-for 中，给元素绑定的都是相同的事件，所以除非上千行的元素需要加上事件，其实和使用事件代理的性能差别不大，所以也没必要用事件代理

12. ### React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

    React 和 Vue 做优化的前提是“放弃了最优解“，本质上是一种权衡，有利有弊。

    倘若这个算法用到别的行业，比如医药行业，肯定是不行的，为什么？

    React 和 Vue 做的假设是：

    - 检测 VDOM 的变化只发生在同一层

    - 检测 VDOM 的变化依赖于用户指定的 key

    如果变化发生在不同层或者同样的元素用户指定了不同的 key 或者不同元素用户指定同样的 key， React 和 Vue 都不会检测到，就会发生莫名其妙的问题。

    但是 React 认为， 前端碰到上面的第一种情况概率很小，第二种情况又可以通过提示用户，让用户去解决，因此 这个取舍是值得的。 没有牺牲空间复杂度，却换来了在大多数情况下时间上的巨大提升。 明智的选择！

13. ### vue 渲染大量数据时应该怎么优化？

    - 冻结数组
    - 虚拟列表
    - 分页

14. ### vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？

    单页面应用的 html 是靠 js 生成，因为首屏需要加载很大的 js 文件(app.js vendor.js)，所以当网速差的时候会产生一定程度的白屏

    1. 使用首屏 SSR + 跳转 SPA 方式来优化
    2. 改单页应用为多页应用，需要修改 webpack 的 entry
    3. 改成多页以后使用应该使用 prefetch 的就使用
    4. 处理加载的时间片，合理安排加载顺序，尽量不要有大面积空隙
    5. CDN 资源还是很重要的，最好分开，也能减少一些不必要的资源损耗
    6. 使用 Quicklink，在网速好的时候 可以帮助你预加载页面资源
    7. 骨架屏这种的用户体验的东西一定要上，最好借助 stream 先将这部分输出给浏览器解析
    8. 合理使用 web worker 优化一些计算
    9. 缓存一定要使用，但是请注意合理使用
    10. 大概就这么多，最后可以借助一些工具进行性能评测，重点调优，例如使用 performance 自己实现下等

15. ### vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法

    简单来讲，重写了数组中的那些方法，首先获取到这个数组的**ob**,也就是它的 Observer 对象，如果有新的值，就调用 observeArray 继续对新的值观察变化，然后手动调用 notify，通知渲染 watcher，执行 update

    ```JS
    const arrayProto = Array.prototype
    export const arrayMethods = Object.create(arrayProto)
    const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
    ]

    /**
     * Intercept mutating methods and emit events
    */
    methodsToPatch.forEach(function (method) {
    // cache original method
    const original = arrayProto[method]
    def(arrayMethods, method, function mutator (...args) {
        const result = original.apply(this, args)
        const ob = this.__ob__
        let inserted
        switch (method) {
        case 'push':
        case 'unshift':
            inserted = args
            break
        case 'splice':
            inserted = args.slice(2)
            break
        }
        if (inserted) ob.observeArray(inserted)
        // notify change
        ob.dep.notify()
        return result
    })
    })
    ```

16. ### 谈一谈 nextTick 的原理

    js 事件机制

17. ### Vue 中的 computed 是如何实现的（腾讯、平安）

    实质是一个惰性的 watcher，在取值操作时根据自身标记 dirty 属性返回上一次计算结果/重新计算值 在创建时就进行一次取值操作，收集依赖变动的对象/属性(将自身压入 dep 中) 在依赖的对象/属性变动时，仅将自身标记 dirty 致为 true

18. ### Vue 中的 computed 和 watch 的区别在哪里（虾皮）

    computed：计算属性

    计算属性是由 data 中的已知值，得到的一个新值。 这个新值只会根据已知值的变化而变化，其他不相关的数据的变化不会影响该新值。 计算属性不在 data 中，计算属性新值的相关已知值在 data 中。 别人变化影响我自己。 watch：监听数据的变化

    监听 data 中数据的变化 监听的数据就是 data 中的已知值 我的变化影响别人

    1. watch 擅长处理的场景：一个数据影响多个数据

    2. computed 擅长处理的场景：一个数据受多个数据影响

19. ### v-if、v-show、v-html 的原理是什么，它是如何封装的？

    v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染；

    v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display；

    v-html 会先移除节点下的所有节点，调用 html 方法，通过 addProp 添加 innerHTML 属性，归根结底还是设置 innerHTML 为 v-html 的值

    目录
    [题目来源](https://juejin.im/post/59ffb4b66fb9a04512385402)

## Vue 使用

### vue 父子组件如何通讯

- `props`
- `emit`

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

核心 `API-Object.defineProperty setter getter`

`Object.defineProperty` 缺点

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
