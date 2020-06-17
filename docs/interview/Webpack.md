# webpack 和 babel

需要自己配置 webpack！
前端为什么需要打包构建？

babel 是语言编译工具
webpack 用来打包

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

### webpack 优化构建速度-知识点串讲

### 用 IngorePlugin 忽略无用文件

### happyPack 是什么

### webpack 如何配置热更新

### 何时使用 DllPlugin

### webpack 优化构建速度-考点总结和复习

### webpack 优化产出代码-考点串讲

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
