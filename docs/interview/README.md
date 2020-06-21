# 目录

面试高频考点，常看常新，夯实基础， 查缺补漏

前言

HTML&CSS：

对 Web 标准的理解、浏览器内核差异、兼容性、hack、CSS 基本功：布局、盒子模型、选择器优先级、
HTML5、CSS3、Flexbox

JavaScript：

数据类型、运算、对象、Function、继承、闭包、作用域、原型链、事件、RegExp、JSON、Ajax、
DOM、BOM、内存泄漏、跨域、异步装载、模板引擎、前端 MVC、路由、模块化、Canvas、ECMAScript 6、Nodejs

其他：

移动端、响应式、自动化构建、HTTP、离线存储、WEB 安全、优化、重构、团队协作、可维护、易用性、SEO、UED、架构、职业生涯、快速学习能力

无论工作年头长短都应该掌握的知识点：

[来源](https://juejin.im/entry/5781b8db0a2b58005765e628)
1、DOM 结构 —— 两个节点之间可能存在哪些关系以及如何在节点之间任意移动。

2、DOM 操作 —— 如何添加、移除、移动、复制、创建和查找节点等。

3、事件 —— 如何使用事件，以及 IE 和标准 DOM 事件模型之间存在的差别。

4、XMLHttpRequest —— 这是什么、怎样完整地执行一次 GET 请求、怎样检测错误。

5、严格模式与混杂模式 —— 如何触发这两种模式，区分它们有何意义。

6、盒模型 —— 外边距、内边距和边框之间的关系，及 IE8 以下版本的浏览器中的盒模型

7、块级元素与行内元素 —— 怎么用 CSS 控制它们、以及如何合理的使用它们

8、浮动元素 —— 怎么使用它们、它们有什么问题以及怎么解决这些问题。

9、HTML 与 XHTML —— 二者有什么区别，你觉得应该使用哪一个并说出理由。

10、JSON —— 作用、用途、设计结构。

[日](https://q.shanyue.tech/fe/)

#### HTML

- 【Q001】网站开发中，如何实现图片的懒加载
- 【Q019】如何实现选中复制的功能
- 【Q126】localhost:3000 与 localhost:5000 的 cookie 信息是否共享
- 【Q159】什么是 CSRF 攻击

#### DOM

- 【Q160】如何设置一个 cookie
- 【Q161】如何删除一个 cookie
- 【Q210】如何判断当前环境时移动端还是 PC 端
- 【Q214】input 中监听值的变化是在监听什么事件
- 【Q284】prefetch 与 preload 的区别是什么

#### CSS

- 【Q009】如何实现一个元素的水平垂直居中
- 【Q017】css 如何实现左侧固定 300px，右侧自适应的布局
- 【Q034】如何实现一个 loading 动画
- 【Q175】如何使用 css 写一个魔方
- 【Q178】如何使用 css 写一个有 3D 效果的立方体
- 【Q184】有没有使用过 css variable，它解决了哪些问题
- 【Q185】谈谈你对 styled-component 的看法
- 【Q190】使用 CSS 如何画一个三角形
- 【Q279】display: inline 的元素设置 margin 和 padding 会生效吗
- 【Q280】html 的默认 display 属性是多少
- 【Q281】响应式布局需要注意哪一些
- 【Q282】对一个非定长宽的块状元素如何做垂直水平居中

- css 盒模型
- 画一条 0.5px 的线
- link 标签和 import 标签的区别
- transition 和 animation 的区别
- Flex 布局
- BFC（块级格式化上下文，用于清楚浮动，防止 margin 重叠等）
- 垂直居中的方法
- 关于 js 动画和 css3 动画的差异性
- 块元素和行元素
- 多行元素的文本省略号
- 双边距重叠问题（外边距折叠）

#### JS

- 【Q003】什么是防抖和节流，他们的应用场景有哪些
- 【Q022】如何实现一个简单的 Promise
- 【Q027】在前端开发中，如何获取浏览器的唯一标识
- 【Q031】js 中如何实现 bind
- 【Q032】js 中什么是 softbind，如何实现
- 【Q088】如何实现 promise.map，并限制并发数
- 【Q102】有没有用 npm 发布过 package，如何发布
- 【Q137】js 代码压缩的原理是什么
- 【Q148】关于 JSON，以下代码输出什么
- 【Q159】什么是 CSRF 攻击
- 【Q168】在 js 中如何把类数组转化为数组
- 【Q169】Array(100).map(x => 1) 结果是多少
- 【Q177】如何在 url 中传递数组
- 【Q181】如何用一行代码实现 compose 函数
- 【Q196】前端中遇到过处理二进制的场景吗
- 【Q197】什么是 TypedArray
- 【Q198】如何实现类似 lodash.get 函数
- 【Q201】js 中什么是可选链
- 【Q202】如何实现一个深拷贝
- 【Q215】什么是跨域，如何解决跨域问题
- 【Q220】请简述一下 event loop
- 【Q228】如何实现一个 flatMap 函数 (头条)
- 【Q230】如何裁剪图片 (情景：选择头像)
- 【Q240】如何实现一个 async/await
- 【Q241】如何使用 async/await 实现 Promise.all 的效果
- 【Q243】有没有遇到 js 捕捉不到异常堆栈信息的情况
- 【Q245】有没有用过 Promise.allSettled() ，它是干什么的
- 【Q249】使用 js 实现一个 lru cache
- 【Q253】cookie 有哪些字段
- 【Q263】你们项目的测试覆盖率是怎么做的
- 【Q266】bind 与 call/apply 的区别是什么
- 【Q267】CSP 是干什么用的了
- 【Q272】如何查看你们 JS 项目中应采用的 node 版本
- 【Q285】有没有做过裁剪头像图片的需求，如何实现
- 【Q295】fetch 中 crendentials 指什么意思，可以取什么值

#### Vue

- 【Q011】vue3.0 中为什么要使用 Proxy，它相比以前的实现方式有什么改进
- 【Q071】react 与 vue 数组中 key 的作用是什么
- 【Q089】vue 中 v-if 和 v-show 的区别是什么
- 【Q090】vue 中 computed 的原理是什么
- 【Q091】vue-loader 的实现原理是什么
- 【Q100】如何使用 react/vue 实现一个 message API
- 【Q146】如果使用 SSR，可以在 created/componentWillMount 中访问 localStorage 吗
- 【Q154】在 react/vue 中数组是否可以以在数组中的次序为 key

[问题来源](https://juejin.im/post/59ffb4b66fb9a04512385402)

1. vue 的底层原理?
1. vue 组件之间的通信？
1. JS 中判断数据类型的方法有几种?
1. vue 与 angular 的区别?
1. 说说你对 angular 脏检查理解？
1. active-class 是哪个组件的属性？
1. 嵌套路由怎么定义？
1. 怎么定义 vue-router 的动态路由？怎么获取传过来的动态参数？
1. vue-router 有哪几种导航钩子？
1. scss 是什么？在 vue.cli 中的安装使用步骤是？有哪几大特性？
1. mint-ui 是什么？怎么使用？说出至少三个组件使用方法？
1. v-model 是什么？怎么使用？ vue 中标签怎么绑定事件？
1. iframe 的优缺点？
1. 简述一下 Sass、Less，且说明区别？
1. axios 是什么？怎么使用？描述使用它实现登录功能的流程？
1. axios+tp5 进阶中，调用 axios.post(‘api/user’)是进行的什么操作？axios.put(‘api/user/8′)呢？
1. vuex 是什么？怎么使用？哪种功能场景使用它？
1. mvvm 框架是什么？它和其它框架（jquery）的区别是什么？哪些场景适合？
1. 自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？
1. 说出至少 4 种 vue 当中的指令和它的用法？
1. vue-router 是什么？它有哪些组件？
1. 导航钩子有哪些？它们有哪些参数？
1. Vue 的双向数据绑定原理是什么？
1. 请详细说下你对 vue 生命周期的理解？
1. 请说下封装 vue 组件的过程？
1. 你是怎么认识 vuex 的？
1. vue-loader 是什么？使用它的用途有哪些？
1. 请说出 vue.cli 项目中 src 目录每个文件夹和文件的用法？
1. vue.cli 中怎样使用自定义的组件？有遇到过哪些问题吗？
1. 聊聊你对 Vue.js 的 template 编译的理解？
1. vue 的历史记录
1. vuejs 与 angularjs 以及 react 的区别？
1. 1.与 AngularJS 的区别
1. 2.与 React 的区别
1. vue 生命周期面试题
1. 什么是 vue 生命周期？
1. vue 生命周期的作用是什么？
1. vue 生命周期总共有几个阶段？
1. 第一次页面加载会触发哪几个钩子？
1. DOM 渲染在 哪个周期中就已经完成？
1. 简单描述每个周期具体适合哪些场景？
1. cancas 和 SVG 的是什么以及区别

[来源](https://link)

- 0.那你能讲一讲 MVVM 吗？
- 1.简单说一下 Vue2.x 响应式数据原理
- 2.那你知道 Vue3.x 响应式数据原理吗？
- 3.再说一下 vue2.x 中如何监测数组变化
- 4.nextTick 知道吗，实现原理是什么？
- 5.说一下 Vue 的生命周期
- 6.你的接口请求一般放在哪个生命周期中？
- 7.再说一下 Computed 和 Watch
- 8.说一下 v-if 和 v-show 的区别
- 9.组件中的 data 为什么是一个函数？
- 10.说一下 v-model 的原理
- 11.Vue 事件绑定原理说一下
- 12.Vue 模版编译原理知道吗，能简单说一下吗？
- 13.Vue2.x 和 Vue3.x 渲染器的 diff 算法分别说一下
- 14.再说一下虚拟 Dom 以及 key 属性的作用
- 15.keep-alive 了解吗
- 16.Vue 中组件生命周期调用顺序说一下加载渲染过程子组件更新过程父组件更新过程销毁过程
- 加载渲染过程
- 子组件更新过程
- 父组件更新过程
- 销毁过程
- 17.Vue2.x 组件通信有哪些方式？
- 18.SSR 了解吗？
- 19.你都做过哪些 Vue 的性能优化？编码阶段 SEO 优化打包优化用户体验
- 编码阶段
- SEO 优化
- 打包优化
- 用户体验
- 20.hash 路由和 history 路由实现原理说一下

#### React

- 【Q010】了解 React 中的 ErrorBoundary 吗，它有那些使用场景
- 【Q013】有没有使用过 react hooks，它带来了那些便利
- 【Q014】如何使用 react hooks 实现一个计数器的组件
- 【Q021】React 中，cloneElement 与 createElement 各是什么，有什么区别
- 【Q038】使用 react 实现一个通用的 message 组件
- 【Q066】如何使用 react hooks 实现 useFetch 请求数据
- 【Q067】react 如何使用 render prop component 请求数据
- 【Q068】React Portal 有哪些使用场景
- 【Q069】什么是 virtual DOM，它的引入带了什么好处
- 【Q071】react 与 vue 数组中 key 的作用是什么
- 【Q092】react 中 ref 是干什么用的，有哪些使用场景
- 【Q100】如何使用 react/vue 实现一个 message API
- 【Q142】react hooks 中如何模拟 componentDidMount
- 【Q146】如果使用 SSR，可以在 created/componentWillMount 中访问 localStorage 吗
- 【Q151】react hooks 如何替代或部分替代 redux 功能
- 【Q152】如何实现一个 react hook，你有没有自己写过一个
- 【Q154】在 react/vue 中数组是否可以以在数组中的次序为 key
- 【Q164】React 中 fiber 是用来做什么的
- 【Q211】React hooks 中 useCallback 的使用场景是什么
- 【Q235】useEffect 中如何使用 async/await
- 【Q271】react hooks 的原理是什么
- 【Q277】redux 解决什么问题，还有什么其他方案
- 【Q278】为什么不能在表达式里面定义 react hooks

#### webpack

- 【Q072】webpack 是用来做什么的，原理是什么
- 【Q073】webpack 中的 loader 的作用是什么
- 【Q074】有没有自己写过一个 webpack 的 loader
- 【Q075】webpack 中 plugin 的作用是什么，有没有自己写过
- 【Q077】使用 webpack 时如何优化项目体积
- 【Q078】什么是 HMR，原理是什么
- 【Q080】使用 webpack 打包时，如何更好地利用 long term cache
- 【Q082】随着 http2 的发展，webpack 有没有更好的打包方案
- 【Q086】webpack 中 tree shaking 的原理是什么
- 【Q091】vue-loader 的实现原理是什么
- 【Q203】对于已经 import 但未实际使用的模块使用 webpack 还会对它打包吗？
- 【Q205】Code Splitting 的原理是什么

#### node

- 【Q118】有没有读过 koa 的源码，什么是洋葱模型呢
- 【Q123】如何监控文件的变动
- 【Q139】在 Node 应用中如何利用多核心 CPU 的优势
- 【Q140】Node 中 cluster 的原理是什么
- 【Q204】Node 中如何判断一个路径是文件还是文件夹
- 【Q237】以下代码，koa 会返回什么数据
- 【Q239】Node 如何进行进程间通信
- 【Q242】有没有用过 continuous local storage，用在了哪里
- 【Q244】Promise 在异步资源的生命周期 (async_hooks) 中是如何被销毁的
- 【Q247】在 node 中如何监听异步资源的生命周期
- 【Q248】测试中 TDD 与 BDD 有什么区别
- 【Q251】node --max-old-space-size=4096 是什么意思
- 【Q256】如何理解 Node 的异步非阻塞 IO
- 【Q264】当 Node 应用发生 gc 时，如何监控
- 【Q265】Node 应用中如何查看 gc 的日志
- 【Q274】如何获取你们 Node 项目的 cpu profile 快照
- 【Q289】Node 中循环引用会发生什么
- 【Q290】Node 中 require 时发生了什么
- 【Q291】node 中的垃圾回收有哪些机制
- 【Q298】如何创建一个进程

#### 计算机基础

- 【Q002】当 ping 一个 IP 地址时发生了什么
- 【Q004】如何获取一个进程的内存并监控
- 【Q025】简述 TCP socket 建立的过程
- 【Q028】在 linux 中如何获取登录的用户
- 【Q030】linux 中如何打印所有网络接口
- 【Q035】http 常见的状态码有哪些
- 【Q036】http 状态码中 301，302 和 307 有什么区别
- 【Q037】linux 有哪些发行版，你最喜欢哪一个
- 【Q041】CoW 策略指什么，docker 中有哪些应用
- 【Q043】如何使用命令查看一个文件有多少字符以及多少行
- 【Q044】如何使用 vim 查看文件有多少个字符以及多少行
- 【Q045】如何把一个 CIDR 地址转化为 IP 地址范围段
- 【Q048】如何实现一个优先级队列
- 【Q049】什么是守护进程
- 【Q050】http 状态码 502 和 504 有什么区别
- 【Q053】什么是对象存储，与块存储和文件存储有什么区别
- 【Q054】简述 TCP 的三次握手
- 【Q055】如何在 linux 中打印所有环境变量
- 【Q061】如何判断两个链表是否相交
- 【Q063】SIGINT SIGTERM SIGKILL 有什么区别
- 【Q065】有没有使用过 oss，对象存储相比块存储和文件存储有什么优缺点
- 【Q070】如何用 linux 命令输出文件的特定行
- 【Q079】简述 http 的缓存机制
- 【Q081】http proxy 的原理是什么
- 【Q084】随着 http2 的发展，前端性能优化中的哪些传统方案可以被替代
- 【Q085】http2 与 http1.1 有什么不同
- 【Q087】什么是 CNAME 记录和 A 记录
- 【Q093】如何实现一个 LRU
- 【Q096】cron 表达式 (_ 10 _ \* \_) 会如何触发
- 【Q097】cron 表达式 (30 10 \_ \* \*) 会如何触发
- 【Q098】在 linux 中如何查看 cron 执行的情况
- 【Q099】git 如何查看某个文件的提交历史
- 【Q106】什么是 IO 多路复用
- 【Q107】什么是 Basic Auth 和 Digest Auth
- 【Q108】gzip 的原理是什么
- 【Q109】可以对图片开启 gzip 压缩吗，为什么
- 【Q110】http 的请求报文与响应报文的格式是什么
- 【Q111】http 响应头中的 ETag 值是如何生成的
- 【Q112】如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改
- 【Q114】如何查看一个文件的 inode number
- 【Q115】文件系统中 mtime 和 ctime 指什么，都有什么不同
- 【Q116】http 服务中静态文件的 Last-Modified 是根据什么生成的
- 【Q117】既然 http 是无状态协议，那它是如何保持登录状态
- 【Q119】https 是如何保证报文安全的
- 【Q120】TCP 是如何保证可靠性的
- 【Q121】我们如何从 http 的报文中得知该服务使用的技术栈
- 【Q122】在发送 http 请求报文时，Host 是必要的吗
- 【Q123】如何监控文件的变动
- 【Q127】vpn 的原理是什么
- 【Q129】shell 中 ${} 与 $() 各是什么意思
- 【Q133】http 响应头中如果 content-type 为 application/octet-stream，则代表什么意思
- 【Q134】ssh 的原理是什么
- 【Q136】http 向 https 做重定向应该使用哪个状态码
- 【Q138】一个守护进程的创建步骤是什么，如何用 C 语言创建
- 【Q140】Node 中 cluster 的原理是什么
- 【Q141】http 响应头中的 Date 与 Last-Modified 有什么不同，网站部署时需要注意什么
- 【Q144】http 1.1 中的 keep-alive 有什么作用
- 【Q145】如何判断端口是否可达
- 【Q147】当在浏览器中看到某资源使用了 http2 后，使用 curl 为什么看到的仍是 http 1.1
- 【Q149】什么是队首阻塞，如何解决，原理如何
- 【Q162】如何禁止服务器被 ping
- 【Q170】什么是文件描述符 (file descriptor)
- 【Q171】在服务器内如何得知自己的公网 IP
- 【Q173】简述 UDP socket 建立的过程
- 【Q174】TCP 三次握手发生在 socket 建立的哪一步
- 【Q176】如何在数组中找出三个数之和为 N
- 【Q179】ssh 如何设置 IP whiteList
- 【Q182】简述 TCP 的四次挥手，三次挥手可以吗
- 【Q183】tcp 中 time_wait 堆积过多会有什么问题，为什么它超时时间这么长
- 【Q186】写一个关于全排列，全组合的函数
- 【Q188】大数乘法和大数加法
- 【Q192】简述你们前端项目中资源的缓存配置策略
- 【Q199】如何判断文件中的换行符是 LF 还是 CRLF
- 【Q206】no-cache 与 no-store 的区别是什么
- 【Q252】https 中如何保证证书是可信任的
- 【Q254】进程与线程的区别是什么
- 【Q273】http2 中的首部压缩的实现原理是什么
- 【Q276】如何查看 node_modules(某一文件夹) 的体积有多大
- 【Q283】http 请求头中的 X-Forwarded-For 代表什么意思
- 【Q288】如何求数组中的 TOP k
- 【Q297】服务器的平均负载如何计算
- 【Q298】如何创建一个进程

#### 工程问题

- 【Q083】网站性能优化都有哪些点
- 【Q094】你们的前端代码上线部署一次需要多长时间，需要人为干预吗
- 【Q137】js 代码压缩的原理是什么
- 【Q153】权限设计中的 RABC 是指什么
- 【Q156】如何进行代码质量检测
- 【Q189】performance API 中什么指标可以衡量首屏时间
- 【Q191】什么是 Open Graph 协议，用来做什么
- 【Q192】简述你们前端项目中资源的缓存配置策略
- 【Q193】如何加速 npm install
- 【Q194】npm i 与 npm ci 的区别是什么
- 【Q195】package-lock.json 有什么作用，如果项目中没有它会怎么样，举例说明
- 【Q200】前端如何进行多分支部署
- 【Q236】主域名的 SEO 是否比二级域名要更好
- 【Q250】刚刚启动了一个服务，如何知道这个服务对应的端口号是多少
- 【Q255】图片防盗链原理是什么
- 【Q268】你如何看待 serverless
- 【Q269】什么是 XSS 攻击，如何避免
- 【Q276】如何查看 node_modules(某一文件夹) 的体积有多大
- 【Q292】peerDependency 是为了解决什么问题
- 【Q293】semver 指什么，试图解释一下
- 【Q294】optionalDependencies 的使用场景是什么
- 【Q296】package-lock.json 与 yarn.lock 有什么区别

#### 开放问题

- 【Q037】linux 有哪些发行版，你最喜欢哪一个
- 【Q060】你们项目中的计划任务是如何组织的
- 【Q083】网站性能优化都有哪些点
- 【Q094】你们的前端代码上线部署一次需要多长时间，需要人为干预吗
- 【Q103】你在工作中遇到最有挑战的事情是什么
- 【Q104】你在工作中遇到最受挫折的事情是什么
- 【Q105】你为什么从上家公司离职
- 【Q113】如何看待 toB 与 toC
- 【Q216】你对未来的工作有什么期待
- 【Q217】你对未来的三年规划和五年规划是什么样的
- 【Q218】当你入职后发现压力过大怎么办
- 【Q219】工作中你有没有很佩服的人
- 【Q221】作为技术负责人，你每天的工作是什么样的
- 【Q225】你相比去年，有哪些成长
- 【Q227】你如何看待 996
- 【Q231】你周末都喜欢做些什么
- 【Q262】当一个排期五天的任务需要在两天后上线如何解决

一阵操作

- 面试题目： 根据你的等级和职位的变化，入门级到专家级，广度和深度都会有所增加。
- 题目类型： 理论知识、算法、项目细节、技术视野、开放性题、工作案例。
- 细节追问： 可以确保问到你开始不懂或面试官开始不懂为止，这样可以大大延展题目的区分度和深度，知道你的实际能力。因为这种知识关联是长时期的学习，临时抱佛脚绝对是记不住的。
- 回答问题再棒，面试官（可能是你面试职位的直接领导），会考虑我要不要这个人做我的同事？所以态度很重要、除了能做事，还要会做人。（感觉更像是相亲( •̣̣̣̣̣̥́௰•̣̣̣̣̣̥̀ )）
- 资深的前端开发能把 absolute 和 relative 弄混，这样的人不要也罢，因为团队需要的是：你这个人具有可以依靠的才能（靠谱）。
- Doctype 作用？标准模式与兼容模式各有什么区别?
- HTML5 为什么只需要写 ？
- 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
- 页面导入样式时，使用 link 和@import 有什么区别？
- 介绍一下你对浏览器内核的理解？
- 常见的浏览器内核有哪些？
- 详细文章：浏览器内核的解析和对比
- html5 有哪些新特性、移除了那些元素？如何处理 HTML5 新标签的浏览器兼容问题？如何区分 HTML 和 ↵HTML5？
- 简述一下你对 HTML 语义化的理解？
- HTML5 的离线储存怎么使用，工作原理能不能解释一下？
- 详细的使用请参考：有趣的 HTML5：离线存储
- 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？
- 详细的使用请参考：有趣的 HTML5：离线存储
- 请描述一下 cookies，sessionStorage 和 localStorage 的区别？
- iframe 有那些缺点？
- Label 的作用是什么？是怎么用的？
- HTML5 的 form 如何关闭自动完成功能？
- 如何实现浏览器内多个标签页之间的通信? (阿里)
- webSocket 如何兼容低浏览器？(阿里)
- 页面可见性（Page Visibility API） 可以有哪些用途？
- 如何在页面上实现一个圆形的可点击区域？
- 实现不使用 border 画出 1px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。
- 网页验证码是干嘛的，是为了解决什么安全问题。
- title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

### css

- 介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？
- CSS 选择符有哪些？哪些属性可以继承？
- CSS 优先级算法如何计算？
- CSS3 新增伪类有那些？
- 元素的每个
- 元素。↵ p:last-of-type 选择属于其父元素的最后
- 元素的每个
- 元素。↵ p:only-of-type 选择属于其父元素唯一的
- 元素的每个
- 元素。↵ p:only-child 选择属于其父元素的唯一子元素的每个
- 元素。↵ p:nth-child(2) 选择属于其父元素的第二个子元素的每个
- 元素。↵↵ :after 在元素之前添加内容,也可以用来做清除浮动。↵ :before 在元素之后添加内容 ↵ :enabled ↵ :disabled 控制表单控件的禁用状态。↵ :checked 单选框或复选框被选中。↵
- 如何居中 div？如何居中一个浮动元素？如何让绝对定位的 div 居中？
- 给 div 设置一个宽度，然后添加 margin:0 auto 属性
- 居中一个浮动元素
- 让绝对定位的 div 居中
- display 有哪些值？说明他们的作用。
- position 的值 relative 和 absolute 定位原点是？
- CSS3 有哪些新特性？
- 请解释一下 CSS3 的 Flexbox（弹性盒布局模型）,以及适用场景？
- 用纯 CSS 创建一个三角形的原理是什么？
- 一个满屏 品 字布局 如何设计?
- 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用 hack 的技巧 ？
- li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
- 为什么要初始化 CSS 样式。
- absolute 的 containing block(容器块)计算方式跟正常流有什么不同？
- CSS 里的 visibility 属性有个 collapse 属性值是干嘛用的？在不同浏览器下以后什么区别？
- position 跟 display、margin collapse、overflow、float 这些特性相互叠加后会怎么样？
- 对 BFC 规范(块级格式化上下文：block formatting context)的理解？
- css 定义的权重
- 请解释一下为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式
- 移动端的布局用过媒体查询吗？
- 使用 CSS 预处理器吗？喜欢那个？
- CSS 优化、提高性能的方法有哪些？
- 浏览器是怎样解析 CSS 选择器的？
- 在网页中的应该使用奇数还是偶数的字体？为什么呢？
- margin 和 padding 分别适合什么场景使用？
- 抽离样式模块怎么写，说出思路，有无实践经验？[阿里航旅的面试题]
- 元素竖向的百分比设定是相对于容器的高度吗？
- 全屏滚动的原理是什么？用到了 CSS 的那些属性？
- 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？
- 视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？）
- ::before 和 :after 中双冒号和单冒号 有什么区别？解释一下这 2 个伪元素的作用。
- 如何修改 chrome 记住密码后自动填充表单的黄色背景 ？
- 你对 line-height 是如何理解的？
- 设置元素浮动后，该元素的 display 值是多少？（自动变成 display:block）
- 怎么让 Chrome 支持小于 12px 的文字？
- 让页面里的字体变清晰，变细用 CSS 怎么做？（-webkit-font-smoothing: antialiased;）
- font-style 属性可以让它赋值为“oblique” oblique 是什么意思？
- position:fixed;在 android 下无效怎么处理？
- 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）
- display:inline-block 什么时候会显示间隙？(携程)
- overflow: scroll 时不能平滑滚动的问题怎么处理？
- 有一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度。
- png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？
- 什么是 Cookie 隔离？（或者说：请求资源的时候不要让它带 cookie 怎么做）
- style 标签写在 body 后与 body 前有什么区别？
- 什么是 CSS 预处理器 / 后处理器？

#### JavaScript

- 介绍 js 的基本数据类型。
- 介绍 js 有哪些内置对象？
- 说几条写 JavaScript 的基本规范？
- JavaScript 原型，原型链 ? 有什么特点？
- JavaScript 有几种类型的值？，你能画一下他们的内存图吗？
- Javascript 如何实现继承？
- JavaScript 继承的几种实现方式？
- javascript 创建对象的几种方式？
- Javascript 作用链域?
- 谈谈 This 对象的理解。
- eval 是做什么的？
- 什么是 window 对象? 什么是 document 对象?
- null，undefined 的区别？
- 参考阅读：undefined 与 null 的区别
- 写一个通用的事件侦听器函数。
- ["1", "2", "3"].map(parseInt) 答案是多少？
- 事件是？IE 与火狐的事件机制有什么区别？ 如何阻止冒泡？
- 什么是闭包（closure），为什么要用它？
- javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？
- 如何判断一个对象是否属于某个类？
- new 操作符具体干了什么呢?
- 用原生 JavaScript 的实现过什么功能吗？
- Javascript 中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？
- JSON 的了解？
- `[].forEach.call(\$\$("_"),function(a){a.style.outline="1px solid #"+(~~(Math.random()_(1<<24))).tostring(16)})< code="">` 能解释一下这段代码的意思吗？
- js 延迟加载的方式有哪些？
- Ajax 是什么? 如何创建一个 Ajax？
- 同步和异步的区别?
- 同步的概念应该是来自于 OS 中关于同步的概念:不同进程为协同完成某项工作而在先后次序上调整(通过阻塞,唤醒等方式).同步强调的是顺序性.谁先谁后.异步则不存在这种顺序性.
- 同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作。
- 异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。
- （待完善）
- 如何解决跨域问题?
- 页面编码和被请求的资源编码如果不一致如何处理？
- 模块化开发怎么做？
- 立即执行函数,不暴露私有成员
- （待完善）
- AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？
- AMD 规范在这里：github.com/amdjs/amdjs…
- CMD 规范在这里：github.com/seajs/seajs…
- requireJS 的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 ↵ 缓存的？）
- 谈一谈你对 ECMAScript6 的了解？
- ECMAScript6 怎么写 class 么，为什么会出现 class 这种东西?
- 异步加载 JS 的方式有哪些？
- documen.write 和 innerHTML 的区别
- DOM 操作——怎样添加、移除、移动、复制、创建和查找节点?
- .call() 和 .apply() 的区别？
- 数组和对象有哪些原生方法，列举一下？
- JS 怎么实现一个类。怎么实例化这个类
- JavaScript 中的作用域与变量声明提升？
- 如何编写高性能的 Javascript？
- 那些操作会造成内存泄漏？
- JQuery 的源码看过吗？能不能简单概况一下它的实现原理？
- jQuery.fn 的 init 方法返回的 this 指的是什么对象？为什么要返回 this？
- jquery 中如何将数组转化为 json 字符串，然后再转化回来？
- jQuery 的属性拷贝(extend)的实现原理是什么，如何实现深拷贝？
- jquery.extend 与 jquery.fn.extend 的区别？
- jQuery 的队列是如何实现的？队列可以用在哪些地方？
- 谈一下 Jquery 中的 bind(),live(),delegate(),on()的区别？
- JQuery 一个对象可以同时绑定多个事件，这是如何实现的？
- 是否知道自定义事件。jQuery 里的 fire 函数是什么意思，什么时候用？
- jQuery 是通过哪个方法和 Sizzle 选择器结合的？（jQuery.fn.find()进入 Sizzle）
- 针对 jQuery 性能的优化方法？
- Jquery 与 jQuery UI 有啥区别？
- JQuery 的源码看过吗？能不能简单说一下它的实现原理？
- jquery 中如何将数组转化为 json 字符串，然后再转化回来？
- jQuery 和 Zepto 的区别？各自的使用场景？
- 针对 jQuery 的优化方法？
- Zepto 的点透问题如何解决？
- jQueryUI 如何自定义组件?
- 需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？
- 如何判断当前脚本运行在浏览器还是 node 环境中？（阿里）
- 移动端最小触控区域是多大？
- jQuery 的 slideUp 动画 ，如果目标元素是被外部事件驱动, 当鼠标快速地连续触发外部元素事件, 动画会滞后的反复执行，该如何处理呢?
- 把 Script 标签 放在页面的最底部的 body 封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？
- 移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？（click 有 300ms 延迟,为了实现 safari 的双击事件的设计，浏览器要知道你是不是要双击操作。）
- 知道各种 JS 框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?
- Underscore 对哪些 JS 原生对象进行了扩展以及提供了哪些好用的函数方法？
- 解释 JavaScript 中的作用域与变量声明提升？
- 那些操作会造成内存泄漏？
- JQuery 一个对象可以同时绑定多个事件，这是如何实现的？
- Node.js 的适用场景？
- (如果会用 node)知道 route, middleware, cluster, nodemon, pm2, server-side rendering 么?
- 解释一下 Backbone 的 MVC 实现方式？
- 什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?
- 知道什么是 webkit 么? 知道怎么用浏览器的各种工具来调试和 debug 代码么?
- 如何测试前端代码么? 知道 BDD, TDD, Unit Test 么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?
- 前端 templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?
- 简述一下 Handlebars 的基本用法？
- 简述一下 Handlerbars 的对模板的基本处理流程， 如何编译的？如何缓存的？
- 用 js 实现千位分隔符?(来源：前端农民工，提示：正则+replace)
- 检测浏览器版本版本有哪些方式？
- What is a Polyfill?
- 做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？
- 我们给一个 dom 同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？
- Object.is() 与原来的比较操作符“ ===”、“ ==”的区别？

- react-router 路由系统的实现原理？
- React 中如何解决第三方类库的问题?

#### 开放问题

- 原来公司工作流程是怎么样的，如何与其他人协作的？如何夸部门合作的？
- 你遇到过比较难的技术问题是？你是如何解决的？
- 设计模式 知道什么是 singleton, factory, strategy, decrator 么?
- 常使用的库有哪些？常用的前端开发工具？开发过什么应用或组件？
- 页面重构怎么操作？
- 列举 IE 与其他浏览器不一样的特性？
- 99%的网站都需要被重构是那本书上写的？
- 什么叫优雅降级和渐进增强？
- 是否了解公钥加密和私钥加密。
- WEB 应用从服务器主动推送 Data 到客户端有那些方式？

####

- http 和 https
- tcp 三次握手，一句话概括
- TCP 和 UDP 的区别
- WebSocket 的实现和应用
- HTTP 请求的方式，HEAD 方式
- 一个图片 url 访问后直接下载怎样实现？
- web Quality （无障碍）
- 几个很实用的 BOM 属性对象方法?
- HTML5 drag api
- http2.0
- 补充 400 和 401、403 状态码
- fetch 发送 2 次请求的原因
- Cookie、sessionStorage、localStorage 的区别
- web worker
- 对 HTML 语义化标签的理解
- iframe 是什么？有什么缺点？
- Doctype 作用? 严格模式与混杂模式如何区分？它们有何意义?
- Cookie 如何防范 XSS 攻击
- Cookie 和 session 的区别
- 一句话概括 RESTFUL
- 讲讲 viewport 和移动端布局
- click 在 ios 上有 300ms 延迟，原因及如何解决？

"$HTML， HTTP，web综合问题[](https://juejin.im/entry/58c60601da2f605dc5a90282)
"$CSS 部分[](https://juejin.im/entry/58c60601da2f605dc5a90282)
"$JavaScript[](https://juejin.im/entry/58c60601da2f605dc5a90282)
"$编程题[](https://juejin.im/entry/58c60601da2f605dc5a90282)
"\$其他[](https://juejin.im/entry/58c60601da2f605dc5a90282)

1、前端需要注意哪些 SEO[](https://juejin.im/entry/58c60601da2f605dc5a90282)
2、<img>的 title 和 alt 有什么区别[](https://juejin.im/entry/58c60601da2f605dc5a90282)
3、HTTP 的几种请求方法用途[](https://juejin.im/entry/58c60601da2f605dc5a90282)
4、从浏览器地址栏输入 url 到显示页面的步骤[](https://juejin.im/entry/58c60601da2f605dc5a90282)
5、如何进行网站性能优化[](https://juejin.im/entry/58c60601da2f605dc5a90282)
6、HTTP 状态码及其含义[](https://juejin.im/entry/58c60601da2f605dc5a90282)
7、语义化的理解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
8、介绍一下你对浏览器内核的理解？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
9、html5 有哪些新特性、移除了那些元素？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
10、HTML5 的离线储存怎么使用，工作原理能不能解释一下？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
11、浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢[](https://juejin.im/entry/58c60601da2f605dc5a90282)
12、请描述一下 cookies，sessionStorage 和 localStorage 的区别？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
13、iframe 有那些缺点？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
14、WEB 标准以及 W3C 标准是什么?[](https://juejin.im/entry/58c60601da2f605dc5a90282)
15、xhtml 和 html 有什么区别?[](https://juejin.im/entry/58c60601da2f605dc5a90282)
16、Doctype 作用? 严格模式与混杂模式如何区分？它们有何意义?[](https://juejin.im/entry/58c60601da2f605dc5a90282)
17、行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？行内元素和块级元素有什么区别？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
18、HTML 全局属性(global attribute)有哪些[](https://juejin.im/entry/58c60601da2f605dc5a90282)
1、css sprite 是什么,有什么优缺点[](https://juejin.im/entry/58c60601da2f605dc5a90282)
2、display: none;与 visibility: hidden;的区别[](https://juejin.im/entry/58c60601da2f605dc5a90282)
3、link 与@import 的区别[](https://juejin.im/entry/58c60601da2f605dc5a90282)
4、什么是 FOUC?如何避免[](https://juejin.im/entry/58c60601da2f605dc5a90282)
5、如何创建块级格式化上下文(block formatting context),BFC 有什么用[](https://juejin.im/entry/58c60601da2f605dc5a90282)
6、display,float,position 的关系[](https://juejin.im/entry/58c60601da2f605dc5a90282)
7、清除浮动的几种方式，各自的优缺点[](https://juejin.im/entry/58c60601da2f605dc5a90282)
8、为什么要初始化 CSS 样式?[](https://juejin.im/entry/58c60601da2f605dc5a90282)
9、css3 有哪些新特性[](https://juejin.im/entry/58c60601da2f605dc5a90282)
10、display 有哪些值？说明他们的作用[](https://juejin.im/entry/58c60601da2f605dc5a90282)
11、介绍一下标准的 CSS 的盒子模型？低版本 IE 的盒子模型有什么不同的？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
12、CSS 优先级算法如何计算？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
13、对 BFC 规范的理解？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
14、谈谈浮动和清除浮动[](https://juejin.im/entry/58c60601da2f605dc5a90282)
15、position 的值， relative 和 absolute 定位原点是[](https://juejin.im/entry/58c60601da2f605dc5a90282)
16、display:inline-block 什么时候不会显示间隙？(携程)[](https://juejin.im/entry/58c60601da2f605dc5a90282)
17、PNG,GIF,JPG 的区别及如何选[](https://juejin.im/entry/58c60601da2f605dc5a90282)
1、闭包[](https://juejin.im/entry/58c60601da2f605dc5a90282)
2、说说你对作用域链的理解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
3、JavaScript 原型，原型链 ? 有什么特点？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
4、请解释什么是事件代理[](https://juejin.im/entry/58c60601da2f605dc5a90282)
5、Javascript 如何实现继承？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
6、谈谈 This 对象的理解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
7、事件模型[](https://juejin.im/entry/58c60601da2f605dc5a90282)
8、new 操作符具体干了什么呢?[](https://juejin.im/entry/58c60601da2f605dc5a90282)
9、Ajax 原理[](https://juejin.im/entry/58c60601da2f605dc5a90282)
10、如何解决跨域问题?[](https://juejin.im/entry/58c60601da2f605dc5a90282)
11、模块化开发怎么做？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
12、异步加载 JS 的方式有哪些？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
13、那些操作会造成内存泄漏？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
14、XML 和 JSON 的区别？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
15、谈谈你对 webpack 的看法[](https://juejin.im/entry/58c60601da2f605dc5a90282)
16、说说你对 AMD 和 Commonjs 的理解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
17、常见 web 安全及防护原理[](https://juejin.im/entry/58c60601da2f605dc5a90282)
18、用过哪些设计模式？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
19、为什么要有同源限制？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
20、offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别[](https://juejin.im/entry/58c60601da2f605dc5a90282)
21、javascript 有哪些方法定义对象[](https://juejin.im/entry/58c60601da2f605dc5a90282)
22、常见兼容性问题？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
22、说说你对 promise 的了解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
23、你觉得 jQuery 源码有哪些写的好的地方[](https://juejin.im/entry/58c60601da2f605dc5a90282)
24、vue、react、angular[](https://juejin.im/entry/58c60601da2f605dc5a90282)
25、Node 的应用场景[](https://juejin.im/entry/58c60601da2f605dc5a90282)
26、谈谈你对 AMD、CMD 的理解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
27、那些操作会造成内存泄漏？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
28、web 开发中会话跟踪的方法有哪些[](https://juejin.im/entry/58c60601da2f605dc5a90282)
29、介绍 js 的基本数据类型[](https://juejin.im/entry/58c60601da2f605dc5a90282)
30、介绍 js 有哪些内置对象？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
31、说几条写 JavaScript 的基本规范？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
32、JavaScript 有几种类型的值？，你能画一下他们的内存图吗？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
33、javascript 创建对象的几种方式？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
34、eval 是做什么的？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
35、null，undefined 的区别？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
36、["1", "2", "3"].map(parseInt) 答案是多少？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
37、javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
38、JSON 的了解？\*\*[](https://juejin.im/entry/58c60601da2f605dc5a90282)
39、js 延迟加载的方式有哪些？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
40、同步和异步的区别?[](https://juejin.im/entry/58c60601da2f605dc5a90282)
41、渐进增强和优雅降级[](https://juejin.im/entry/58c60601da2f605dc5a90282)
42、defer 和 async[](https://juejin.im/entry/58c60601da2f605dc5a90282)
43、说说严格模式的限制[](https://juejin.im/entry/58c60601da2f605dc5a90282)
44、attribute 和 property 的区别是什么？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
45、谈谈你对 ES6 的理解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
1、写一个通用的事件侦听器函数[](https://juejin.im/entry/58c60601da2f605dc5a90282)
2、如何判断一个对象是否为数组[](https://juejin.im/entry/58c60601da2f605dc5a90282)
3、冒泡排序[](https://juejin.im/entry/58c60601da2f605dc5a90282)
4、快速排序[](https://juejin.im/entry/58c60601da2f605dc5a90282)
5、编写一个方法 求一个字符串的字节长度[](https://juejin.im/entry/58c60601da2f605dc5a90282)
1、谈谈你对重构的理解[](https://juejin.im/entry/58c60601da2f605dc5a90282)
2、什么样的前端代码是好的[](https://juejin.im/entry/58c60601da2f605dc5a90282)
3、对前端工程师这个职位是怎么样理解的？它的前景会怎么样？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
4、你觉得前端工程的价值体现在哪[](https://juejin.im/entry/58c60601da2f605dc5a90282)
5、平时如何管理你的项目？[](https://juejin.im/entry/58c60601da2f605dc5a90282)
