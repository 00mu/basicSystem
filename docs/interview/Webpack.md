# 工程化

基于 webpack 搭建一套前端自动化构建体系，是现代 JSer 的基本功

## 模块

### 01. 什么是模块

- 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
- 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

模块化的好处：

1. 避免命名冲突(减少命名空间污染)
2. 更好的分离, 按需加载
3. 更高复用性
4. 高可维护性

### 02. 模块化有哪些规范

1. CommonJS

   同步加载模块，Node.js 遵守 CommonJS 规范，输入的是被输出的值的拷贝

   基本语法：

   - 暴露模块 `module.exports = value`或`exports.xxx = value`
   - 引入模块 `require(xxx)`

   同步是阻塞的用在服务端么有问题，在浏览器就不行，就有了 AMD 和 CMD

2. AMD

   异步加载模块，RequireJS 遵守 AMD 规范

3. CMD

   异步加载模块，Sea.js 遵守 CMD 规范

   AMD 和 CMD 的区别，简单来说：

   1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行
   2. CMD 推崇依赖就近，AMD 推崇依赖前置
   3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一

4. ES6 模块化

   ES6 模块与 CommonJS 模块有重大的差异；ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

   1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
   2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

5. UMD

   UMD 是 AMD 和 CommonJS 的糅合,AMD 模块以浏览器第一的原则发展，异步加载模块。CommonJS 模块以服务器第一原则发展。

   这迫使人们又想出另一个更通用的模式 UMD （Universal Module Definition）。希望解决跨平台的解决方案。UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式。再判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。

### 03. import、require、export、module.exports

    webpack 本身维护了一套模块系统，这套模块系统兼容了所有前端历史进程下的模块规范，包括 amd commonjs es6 等

1. #### 为何有的地方使用 require 去引用一个模块时需要加上 default？ require('xx').default

   我们在上文 babel 对导出模块的转换提到，es6 的 export default 都会被转换成 exports.default，即使这个模块只有这一个输出。

   ```JS
   // a.js
   export default 123;
   ```

   ```JS
   // b.js
    // 错误
   var foo = require('./a.js')

    // 正确
   var foo = require('./a.js').default
   ```

2. #### 经常在各大 UI 组件引用的文档上会看到说明 import { button } from 'xx-ui' 这样会引入所有组件内容，需要添加额外的 babel 配置，比如 babel-plugin-component？

   我们在使用各大 UI 组件库时都会被介绍到为了避免引入全部文件，请使用 babel-plugin-component 等 babel 插件。

   ```JS
   import { Button, Select } from 'element-ui'
   ```

   由前文可知 import 会先转换为 commonjs， 即

   ```JS
   var a = require('element-ui');
   var Button = a.Button;
   var Select = a.Select;
   ```

   var a = require('element-ui'); 这个过程就会将所有组件都引入进来了。

   所以 babel-plugin-component 就做了一件事，将 import { Button, Select } from 'element-ui' 转换成了

   ```JS
   import Button from 'element-ui/lib/button'
   import Select from 'element-ui/lib/select'
   ```

   即使转换成了 commonjs 规范，也只是引入自己这个组件的 js，将引入量减少到最低。

   所以我们会看到几乎所有的 UI 组件库的目录形式都是

   ```JS
   |-lib
   ||--component1
   ||--component2
   ||--component3
   |-index.common.js
   ```

   index.common.js 给 import element from 'element-ui' 这种形式调用全部组件。

3. #### 为什么可以使用 es6 的 import 去引用 commonjs 规范定义的模块，或者反过来也可以又是为什么？
   我们得知即使我们使用了 es6 的模块系统，如果借助 babel 的转换，es6 的模块系统最终还是会转换成 commonjs 的规范。所以我们如果是使用 babel 转换 es6 模块，混合使用 es6 的模块和 commonjs 的规范是没有问题的，因为最终都会转换成 commonjs。
4. #### 我们在浏览一些 npm 下载下来的 UI 组件模块时（比如说 element-ui 的 lib 文件下），看到的都是 webpack 编译好的 js 文件，可以使用 import 或 require 再去引用。但是我们平时编译好的 js 是无法再被其他模块 import 的，这是为什么？

   通过 webpack 模块化原理章节给出的 webpack 配置编译后的 js 是无法被其他模块引用的，webpack 提供了 output.libraryTarget 配置指定构建完的 js 的用途

   默认 var：
   如果指定了 output.library = 'test' 入口模块返回的 module.exports 暴露给全局 var test = returned_module_exports

   commonjs：
   如果 library: 'spon-ui' 入口模块返回的 module.exports 赋值给 exports['spon-ui']

   commonjs2：
   入口模块返回的 module.exports 赋值给 module.exports

   所以 element-ui 的构建方式采用 commonjs2 ，导出的组件的 js 最后都会赋值给 module.exports，供其他模块引用。

5. #### babel 在模块化的场景中充当了什么角色？以及 webpack ？哪个启到了关键作用？

   按理说 webpack 的模块化方案已经很好的将 es6 模块化转换成 webpack 的模块化，但是其余的 es6 语法还需要做兼容性处理。babel 专门用于处理 es6 转换 es5。当然这也包括 es6 的模块语法的转换。

   其实两者的转换思路差不多，区别在于 webpack 的原生转换 可以多做一步静态分析，使用 tree-shaking 技术

   babel 能提前将 es6 的 import 等模块关键字转换成 commonjs 的规范。这样 webpack 就无需再做处理，直接使用 webpack 运行时定义的 **webpack_require** 处理。

6. #### 听说 es6 还有 tree-shaking 功能，怎么才能使用这个功能？
   通过静态分析 es6 的语法，可以删除没有被使用的模块。他只对 es6 的模块有效，所以一旦 babel 将 es6 的模块转换成 commonjs，webpack2 将无法使用这项优化。所以要使用这项技术，我们只能使用 webpack 的模块处理，加上 babel 的 es6 转换能力（需要关闭模块转换）。

## 概念解释

### 01. webpack 和 gulp 的区别

webpack 是一个模块打包器，强调的是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源都看成是模块，通过 loader 和 plugin 对资源进行处理。

gulp 是一个前端自动化构建工具，强调的是前端开发的工作流程，可以通过配置一系列的 task，第一 task 处理的事情（如代码压缩，合并，编译以及浏览器实时更新等）。然后定义这些执行顺序，来让 glup 执行这些 task，从而构建项目的整个开发流程。自动化构建工具并不能把所有的模块打包到一起，也不能构建不同模块之间的依赖关系。

### 02. babel 和 webpack 的区别

### 03. module，chunk 和 bundle 的区别

module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：

1. 我们直接写出来的是 `module`
2. webpack 处理时是 `chunk`
3. 最后生成浏览器可以直接运行的 `bundle`

### 04. filename 和 chunkFilename 的区别

**filename** 指列在 entry 中，打包后输出的文件的名称。

**chunkFilename** 指未列在 entry 中，却又需要被打包出来的文件的名称。

### 05. webpackPrefetch、webpackPreload 和 webpackChunkName 到底是干什么的

1. webpackChunkName 修改 chunkFileName 的

```JS
{
 entry: {
     index: "../src/index.js"
 },
 output: {
     filename: "[name].min.js",  // index.min.js
     chunkFilename: '[name].bundle.js', // 1.bundle.js，chunk id 为 1，辨识度不高
 }
}
```

```JS
async function getAsyncComponent() {
    var element = document.createElement('div');

    // 在 import 的括号里 加注释 /* webpackChunkName: "lodash" */ ，为引入的文件取别名
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

    return element;
}
```

2. webpackPrefetch（预拉取） 和 webpackPreload （预加载）

区别：

```JS
const { default: _ } = await import(/* webpackChunkName: "lodash" */ /* webpackPrefetch: true */ 'lodash');

const { default: _ } = await import(/* webpackChunkName: "lodash2" */ /* webpackPreload: true */ 'lodash');
```

html

```html
<link rel="prefetch" as="script" href="vendor~loadsh.bundle.js" />
<link rel="preload" as="script" href="vendor~loadsh2.bundle.js" />
```

preload 是告诉浏览器预先请求当前页面需要的资源（关键的脚本，字体，主要图片等）。

prefetch 应用场景稍微又些不同 —— 用户将来可能跳转到其它页面需要使用到的资源。如果 A 页面发起一个 B 页面的 prefetch 请求，这个资源获取过程和导航请求可能是同步进行的，而如果我们用 preload 的话，页面 A 离开时它会立即停止。

### 06. 文件指纹 hash、chunkhash、contenthash 有什么不同

文件指纹是打包后输出的文件名的后缀

哈希一般是结合 CDN 缓存来使用的。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的 HTML 引用的 URL 地址也会改变，触发 CDN 服务器从源服务器上拉取对应数据，进而更新本地缓存。

- hash 整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改

- chunkhash 和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash

- `contenthash` 根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

#### JS 的文件指纹设置

设置 output 的 filename，用 chunkhash。

```JS
module.exports = {
    entry: {
        app: './scr/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path:__dirname + '/dist'
    }
}
```

#### CSS 的文件指纹设置

设置 MiniCssExtractPlugin 的 filename，使用 contenthash。

```JS
module.exports = {
    entry: {
        app: './scr/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
    },
    plugins: [new MiniCssExtractPlugin({
        filename: `[name][contenthash:8].css`
    })]
}

```

#### 图片的文件指纹设置

设置 file-loader 的 name，使用 hash。

```JS
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'img/[name][hash:8].[ext]'
                }
            }]
        }]
    }
}

```

### 06. sourse-map 中 eval、cheap、inline 和 module 各是什么意思

sourse-map 就是一份源码和转换后代码的映射文件。

1. source-map

   大而全，啥都有，就因为啥都有可能会让 webpack 构建时间变长，看情况使用。

2. cheap-module-eval-source-map

   这个一般是开发环境（dev）推荐使用，在构建速度报错提醒上做了比较好的均衡。

3. cheap-module-source-map

   一般来说，生产环境是不配 source-map 的，如果想捕捉线上的代码报错，我们可以用这个

source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。
map 文件只要不打开开发者工具，浏览器是不会加载的。
线上环境一般有三种处理方案：

hidden-source-map：借助第三方错误监控平台 Sentry 使用

nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高

sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)

注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积大小，并降低整体性能。

### 07. 说一说 Loader 和 Plugin 的区别

`Loader` 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。 因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

`Plugin` 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

`Loader` 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

`Plugin` 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

### 08. 有哪些常见的 Loader？你用过哪些 Loader？

- raw-loader：加载文件原始内容（utf-8）
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- svg-inline-loader：将压缩后的 SVG 内容注入代码中
- image-loader：加载并且压缩图片文件
- json-loader 加载 JSON 文件（默认包含）
- handlebars-loader: 将 Handlebars 模版编译成函数并返回
- babel-loader：把 ES6 转换成 ES5
- ts-loader: 将 TypeScript 转换成 JavaScript
- awesome-typescript-loader：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
- sass-loader：将 SCSS/SASS 代码转换成 CSS
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
- eslint-loader：通过 ESLint 检查 JavaScript 代码
- tslint-loader：通过 TSLint 检查 TypeScript 代码
- mocha-loader：加载 Mocha 测试用例的代码
- coverjs-loader：计算测试的覆盖率
- vue-loader：加载 Vue.js 单文件组件
- i18n-loader: 国际化
- cache-loader: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

### 09. 有哪些常见的 Plugin？你用过哪些 Plugin？

- ignore-plugin：忽略部分文件
- html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
- web-webpack-plugin：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
- uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)
- terser-webpack-plugin: 支持压缩 ES6 (Webpack4)
- webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
- mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代 extract-text-webpack-plugin)
- serviceworker-webpack-plugin：为网页应用增加离线缓存功能
- clean-webpack-plugin: 目录清理
- ModuleConcatenationPlugin: 开启 Scope Hoisting
- speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
- webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

### 10. 模块打包原理知道吗

Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。

### 11. 文件监听原理呢

在发现源码发生变化时，自动重新构建出新的输出文件。
Webpack 开启监听模式，有两种方式：

启动 webpack 命令时，带上 --watch 参数在配置 webpack.config.js 中设置 watch:true

缺点：每次需要手动刷新浏览器

原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。

### 12. 说一下 Webpack 的热更新原理吧

(敲黑板，这道题必考)
Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该 chunk 的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

### 13. 如何对 bundle 体积进行监控和分析

VSCode 中有一个插件 Import Cost 可以帮助我们对引入模块的大小进行实时监测，还可以使用 webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积。

bundlesize 工具包可以进行自动化资源体积监控

### 14. 如何优化 Webpack 的构建速度

(这个问题就像能不能说一说「从 URL 输入到页面显示发生了什么」一样）
使用高版本的 Webpack 和 Node.js

- 使用高版本的 Webpack 和 Node.js
- 多进程/多实例构建：HappyPack(不维护了)、thread-loader
- 压缩代码

  - 多进程并行压缩

    - webpack-paralle-uglify-pluginug
    - lifyjs-webpack-plugin 开启 parallel 参数 (不支持 ES6)
    - terser-webpack-plugin 开启 parallel 参数

  - 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。

- 图片压缩

  - 使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
  - 配置 image-webpack-loader

- 缩小打包作用域：

  - exclude/include (确定 loader 规则范围)
  - resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
  - resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
  - resolve.extensions 尽可能减少后缀尝试的可能性 noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
  - IgnorePlugin (完全排除模块)
  - 合理使用 alias

- 提取页面公共资源

  - 基础包分离：

    - 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
    - 使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4 内置) ，替代了 CommonsChunkPlugin 插件

- DLL：

  - 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
  - HashedModuleIdsPlugin 可以解决模块数字 id 问题

- 充分利用缓存提升二次构建速度：

  - babel-loader 开启缓存
  - terser-webpack-plugin 开启缓存
  - 使用 cache-loader 或者 - hard-source-webpack-plugin

- Tree shaking

  - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉(只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
  - 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
  - 使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码

    - purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用(建议)

- Scope hoisting
  - 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
  - 必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法
- 动态 Polyfill

  - 建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。 (部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)

### 15. 代码分割的本质是什么？有什么意义呢

SplitChunksPlugin

源代码直接上线和打包成唯一脚本 main.bundle.js 这两种极端方案之间的一种更适合实际场景的中间状态。

### 16. 是否写过 Loader？简单描述一下编写 loader 的思路

Loader 支持链式调用，所以开发上需要严格遵循“单一职责”，每个 Loader 只负责自己需要负责的事情。

- Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用
- Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 Webpack 该 Loader 是否需要二进制数据
- 尽可能的异步化 Loader，如果计算量很小，同步也可以 Loader 是无状态的，我们不应该在 Loader 中保留状态使用 loader-utils 和 schema-utils
- 为我们提供的实用工具加载本地 Loader 方法
  - Npm link
  - ResolveLoader

### 17. 是否写过 Plugin？简单描述一下编写 Plugin 的思路

webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。Webpack 的 Tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。

- compiler 暴露了和 Webpack 整个生命周期相关的钩子
- compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
- 插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件
- 找出合适的事件点去完成想要的功能

  - emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(emit 事件是修改 Webpack 输出资源的最后时机)
  - watch-run 当依赖的文件发生变化时会触发

- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住

### 18. 聊一聊 Babel 原理吧

大多数 JavaScript Parser 遵循 estree 规范，Babel 最初基于 acorn 项目(轻量级现代 JavaScript 解析器)

Babel 大概分为三大部分：

1. 解析：将代码转换成 AST

2. 词法分析：将代码(字符串)分割为 token 流，即语法单元成的数组语法分析：分析 token 流(上面生成的数组)并生成 AST
3. 转换：访问 AST 的节点进行变换操作生产新的 AST
   > Taro 就是利用 babel 完成的小程序语法转换
4. 生成：以新的 AST 为基础生成代码

## Babel

### 01. babel-runtime 和 babel-polyfill

因为有兼容的需求，根据文档使用 babel-polyfill 和 babel-runtime 两个插件解决问题

如果我们没有配置一些规则，Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign ）都不会转码。

#### babel-polyfill

它的初衷是模拟一整套 ES2015+ 运行时环境，所以它的确会以全局变量的形式 polyfill Map、Set、Promise 之类的类型，也的确会以类似 Array.prototype.includes() 的方式去注入污染原型，这也是官网中提到最适合应用级开发的 polyfill，再次提醒如果你在开发 library 的话，不推荐使用（或者说绝对不要使用）。

原理是当运行环境中并没有实现的一些方法，babel-polyfill 会给其做兼容。 但是这样做也有一个缺点，就是会污染全局变量，而且项目打包以后体积会增大很多，因为把整个依赖包也搭了进去。所以并不推荐在一些方法类库中去使用。

babel-polyfill 是直接在原型链上增加方法

用法

```JS
// 1.
npm install --save babel-polyfill
// 2. 在应用的入口引用，以确保它能够最先加载：

import "babel-polyfill"
// 或者
require("babel-polyfill")
```

#### babel-runtime

为了不污染全局对象和内置的对象原型，但是又想体验使用新鲜语法的快感。就可以配合使用 `babel-runtime` 和 `babel-plugin-transform-runtime`。
比如当前运行环境不支持 `promise`，可以通过引入 `babel-runtime/core-js/promise` 来获取 `promise`，
或者通过 `babel-plugin-transform-runtime` 自动重写你的 `promise`。也许有人会奇怪，为什么会有两个 runtime 插件，其实是有历史原因的：刚开始开始只有 `babel-runtime` 插件，但是用起来很不方便，在代码中直接引入 helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的 helper 代码。所以，Babel 又开发了 `babel-plugin-transform-runtime`，这个模块会将我们的代码重写，如将 `Promise` 重写成`\_Promise`（只是打比方），然后引入`\_Promise helper` 函数。这样就避免了重复打包代码和手动引入模块的痛苦。

用法

```JS
// 1.
npm install --save-dev babel-plugin-transform-runtime
// 2.
npm install --save babel-runtime
// 3. 写入 `.babelrc`
```

```JS babelrc
{
  "plugins": ["transform-runtime"]
}
```

1. babel-polyfill 会污染全局环境
2. babel-runtime 不会污染全局
3. 产出第三方的 lib 要用 babel-runtime

### 03 为何 Proxy 不能被 polyfill

Proxy 的功能用 Object.defineProperty 无法模拟

### 02. webpack 是用来做什么的，原理是什么

-

- webpack 中的 loader 的作用是什么
- 有没有自己写过一个 webpack 的 loader
- webpack 中 plugin 的作用是什么，有没有自己写过
- 使用 webpack 时如何优化项目体积
- 什么是 HMR，原理是什么
- 使用 webpack 打包时，如何更好地利用 long term cache
- 随着 http2 的发展，webpack 有没有更好的打包方案
- webpack 中 tree shaking 的原理是什么
- vue-loader 的实现原理是什么
- 对于已经 import 但未实际使用的模块使用 webpack 还会对它打包吗？
- Code Splitting 的原理是什么

需要自己配置 webpack！
前端为什么需要打包构建？

babel 是语言编译工具
webpack 用来打包

[很好的 webpack](https://juejin.im/post/5e6f4b4e6fb9a07cd443d4a5#heading-18)

## 深入运行机制

### 01. webpack 运行机制概述

初始化配置参数 -> 绑定事件钩子回调 -> 确定 Entry 逐一遍历 -> 使用 loader 编译文件 -> 输出文件

简单说

1. **初始化**：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
2. **编译**：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
3. **输出**：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

### 02. 什么是 webpack 事件流

在分析 webpack 运行流程时，我们可以借助一个概念，便是 webpack 的事件流机制。

什么是 webpack 事件流？

> Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。<br/>
> Webpack 通过 Tapable 来组织这条复杂的生产线。 Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 Webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。

我们将 webpack 事件流理解为 webpack 构建过程中的一系列事件，他们分别表示着不同的构建周期和状态，我们可以像在浏览器上监听 click 事件一样监听事件流上的事件，并且为它们挂载事件回调。我们也可以自定义事件并在合适时机进行广播，这一切都是使用了 webpack 自带的模块 Tapable 进行管理的。我们不需要自行安装 Tapable ，在 webpack 被安装的同时它也会一并被安装，如需使用，我们只需要在文件里直接 require 即可。

apable 的原理其实就是我们在前端进阶过程中都会经历的 EventEmit，通过发布者-订阅者模式实现，它的部分核心代码可以概括成下面这样：

```JS
class SyncHook{
    constructor(){
        this.hooks = [];
    }

    // 订阅事件
    tap(name, fn){
        this.hooks.push(fn);
    }

    // 发布
    call(){
        this.hooks.forEach(hook => hook(...arguments));
    }
}
```

### 03. webpack 运行流程

![img](https://user-gold-cdn.xitu.io/2018/9/28/1661ef768d3c5553?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

1. 首先，webpack 会读取你在命令行传入的配置以及项目里的 webpack.config.js 文件，初始化本次构建的配置参数，并且执行配置文件中的插件实例化语句，生成 Compiler 传入 plugin 的 apply 方法，为 webpack 事件流挂上自定义钩子。
2. 接下来到了 entryOption 阶段，webpack 开始读取配置的 Entries，递归遍历所有的入口文件
3. Webpack 接下来就开始了 compilation 过程。会依次进入其中每一个入口文件(entry)，先使用用户配置好的 loader 对文件内容进行编译（buildModule），我们可以从传入事件回调的 compilation 上拿到 module 的 resource（资源路径）、loaders（经过的 loaders）等信息；之后，再将编译好的文件内容使用 acorn 解析生成 AST 静态语法树（normalModuleLoader），分析文件的依赖关系逐个拉取依赖模块并重复上述过程，最后将所有模块中的 require 语法替换成**webpack_require**来模拟模块化操作。
4. emit 阶段，所有文件的编译及转化都已经完成，包含了最终输出的资源，我们可以在传入事件回调的 compilation.assets 上拿到所需数据，其中包括即将输出的资源、代码块 Chunk 等等信息。

### 04. 什么是 ATS

抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree）; 其实你只要记着，AST 是一棵树。
![img](https://user-gold-cdn.xitu.io/2018/9/28/1661ef768d8da46a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
转换成 AST 的目的就是将我们书写的字符串文件转换成计算机更容易识别的数据结构，这样更容易提取其中的关键信息，而这棵树在计算机上的表现形式，其实就是一个单纯的 Object。
![img](https://user-gold-cdn.xitu.io/2018/9/28/1661ef768da14f58?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 05. 总结

纵观 webpack 构建流程，我们可以发现整个构建过程主要花费时间的部分也就是递归遍历各个 entry 然后寻找依赖逐个编译的过程，每次递归都需要经历 String->AST->String 的流程，经过 loader 还需要处理一些字符串或者执行一些 JS 脚本，介于 node.js 单线程的壁垒，webpack 构建慢一直成为它饱受诟病的原因。这也是 happypack 之所以能大火的原因，我们可以来看一段 happypack 的示例代码:

都是利用了 node.js 原生的 cluster 模块去开辟多进程执行构建，不过在 4 之后大家就可以不用去纠结这一问题了，多进程构建已经被集成在 webpack 本身上了，除了增量编译，这也是 4 之所以能大幅度提升构建效率的原因之一。

## webpack 是什么？

- webpack 已是前端打包构建的不二选择
- 每日必用 面试必考
- 成熟的工具，重点在于配置和使用，原理并不高优
- 性能优化（开发、生产）

1. 基本配置

   - 拆分配置和 merge
   - 设置代理 proxy
   - 处理 ES6 (`loader: ['babel-loader']`)
   - 处理样式 loader 的执行顺序从后向前
   - 添加 hash

2. 高级配置

3. 优化打包效率

4. 优化产出代码

5. 构建流程概述

## babel 是什么？

- polyfill
- runtime

## 高级配置（必须掌握）

### webpack 如何配置多入口？

1. entry 创建多个入口
2. output 创建以 entry 的[name]作为文件名
3. plugin 针对每个入口都生成一个 html 实例

### webpack 如何抽离压缩 css 文件？

生产环境必须抽离 css，使用缓存。

```JS
module: {
    rules: [
        // 抽离 less --> css
        {
            test: /\.less$/,
            loader: [
                MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                'css-loader',
                'less-loader',
                'postcss-loader'
            ]
        }
    ]
},
plugins: [
    // 抽离 css 文件
    new MiniCssExtractPlugin({
        filename: 'css/main.[contentHash:8].css'
    })
],
optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
}
```

### webpack 如何抽离公共代码和第三方代码？

optimization 中分割代码块
进行缓存分组

```JS
plugins:[
// 多入口 - 生成 index.html
new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    filename: 'index.html',
    // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
    chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
}),
// 多入口 - 生成 other.html
new HtmlWebpackPlugin({
    template: path.join(srcPath, 'other.html'),
    filename: 'other.html',
    chunks: ['other', 'common']  // 考虑代码分割
})],


optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

    // 分割代码块
    splitChunks: {
        chunks: 'all',
        /**
         * initial 入口chunk，对于异步导入的文件不处理
            async 异步chunk，只对异步导入的文件处理
            all 全部chunk
            */

        // 缓存分组
        cacheGroups: {
            // 第三方模块
            vendor: {
                name: 'vendor', // chunk 名称
                priority: 1, // 权限更高，优先抽离，重要！！！
                test: /node_modules/,
                minSize: 0,  // 大小限制
                minChunks: 1  // 最少复用过几次
            },

            // 公共的模块
            common: {
                name: 'common', // chunk 名称
                priority: 0, // 优先级
                minSize: 0,  // 公共模块的大小限制
                minChunks: 2  // 公共模块最少复用过几次
            }
        }
    }
}
```

### webpack 如何实现异步加载 JS

也是创建一个 chunk
import(''./).then(res=>{})

### module chunk bundle 的区别

- module 一切皆模块
- chunk 根据入口文件分析出来的依赖模块的一个合成（内存中），如 entry、import()、splitChunk
- bundle 最终的输出文件

### 什么是 Tree-Shaking

没有用到的代码不打包，不用单独配置
只能用 es 引入

### HashedModuleIdsPlugin 插件 正确使用方法

添加 hash HashedModuleIdsPlugin
为了一份理想的缓存文件，我们需要做这些事情：

    - 抽离 boilerplate（[runtime & manifest）
    - 将 module identifier 默认的数字标识方式转成使用路径标识
    - JS 文件使用 chunkhash
    - 抽离的 CSS 样式文件使用 contenthash
    - gif|png|jpe?g|eot|woff|ttf|svg|pdf 等使用 hash
    - 设置 namedChunks 为 true

https://imweb.io/topic/5b6f224a3cb5a02f33c013ba

### ES Module 和 Commonjs 的区别

- ES6 Module 静态引入，编译时引入
- Commonjs 动态引入，执行时引入
- 只有 ES6 Module 才能静态分析，实现 Tree-shaking

### 什么是 Scope Hosting

合并作用域，多个函数合并

- 体积更小
- 创建的函数作用域更少
- 代码可读性更好

```JS
resolve: {
    mainFields: [
        //npm中第三方模块优先采用 jsnext：mian 中指向的es6模块化的文件
        'jsnext:main'
    ]
}
// 配置
plugins: [
    new MouldConctenationPlugin()
]
```

### babel

### babel-runtime 和 babel-polyfill 的区别是什么？

polyfill 会污染全局环境
第三方 lib 用 runtime，会重新命名

### webpack 面试真题-为何 Proxy 不能被 Polyfill

### webpack 面试真题-常见性能优化方法

优化构建速度：
生产环境

- 优化 babel-loader
- IngorePlugin
- nopARSE
  开发环境
- 自动刷新
- 热更新
- dllPlugin

优化产出代码

- 小图 base64
- bundle 加 hash
- 使用 cdn 加速
- 懒加载
- 使用 production 环境，自动开启
  - 自动压缩
  - 删掉调试代码
  - 启动 Tree-Shaking

## 项目实践

### 01. 手写一个 loader

vw

[手把手教你撸一个 Webpack Loader](https://juejin.im/post/5a698a316fb9a01c9f5b9ca0)

### 02. 手写一个 plugin

### 02. 如果 webpack 打包一个第三方组件

### 04. 搭建 Promotion 多页(mpa)应用架构

### 05. 微前端架构

### 06. 实战篇 - 如何实现和淘宝移动端一样的模块化加载 （task-silce）

[https://juejin.im/post/5d33fd0f5188256e820c80d4](https://link)

## 工程

### 01. 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

[text](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22)

### 02. 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

    1.当修改了一个或多个文件；
    2.文件系统接收更改并通知webpack；
    3.webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
    4.HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
    5.HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。

### 03. webpack 打包 vue 速度太慢怎么办？

    缓存
    happypack多进程进行
    loader范围缩小到src项目文件！一些不必要的loader能关就关了吧
    动态链接库（DllPlugin）
    配置webpack的externals

### 04. webpack 中 loader 和 plugin 的区别是什么（平安）

    loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。

    plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务

### 05. babel 怎么把字符串解析成 AST，是怎么进行词法/语法分析的？
