# webpack 入门

JS 静态模块打包工具，内部构建一个**依赖图**映射项目所需的每个模块，并生成多个 `bundle。`

以下为和新概念

## 入口 entry

### intro

指示 webpack 应该使用哪个模块，开作为构建 依赖图的开始。会找出哪个模块和库是入口起点（直接/间接）依赖的。

`_webpack.config.js_`

### 单个入口

```JS
// 单个文件入口语法
module.exports = {
  entry: './path/to/my/entry/file.js'
};
// 等价
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
}
// 一次注入多个依赖文件，并将他们导向一个chunk时，可以使用数组
module.exports = {
  entry: ['./path/to/my/entry/file.js', './path/to/my/entry/file2.js']
}
//
```

### 对象语法

```JS
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

### 分离 app 和 vendor[第三方库]入口

在 `webpack < 4` 的版本中，通常将 `vendor` 作为单独的入口起点添加到 `entry` 选项中，以将其编译为单独的文件（与 `CommonsChunkPlugin` 结合使用）。而在 webpack 4 中不鼓励这样做。**而是使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。不要 为 vendor 或其他不是执行起点创建 entry。**

### 多页面应用程序

```JS
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

使用 optimization.splitChunks 为页面间共享的应用程序代码创建 bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。

## 输出 output

utput 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中

```JS
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

## 模式 mode

提供 mode 配置选项，告知 webpack 使用相应环境的内置优化

```JS
module.exports = {
  mode: 'production'
};
```

## loader

在 import 时预处理文件。
将不同于语言转换为 Javascript，图像转换为 dataUrl。
描述了如何处理非 js 模块，并在 bundle 中引入这些依赖。

```JS
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

通过（`loader`）预处理函数，`loader` 为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言翻译。。。

各种语言的 `loader`

- CoffeeScript
- TypeScript
- ESNext (Babel)
- Sass
- Less
- Stylus

## 插件 plugin

插件是支柱功能。`webpack` 自身也是构建于，你在 `webpack` 配置中用到的相同的插件系统之上！

## module

在 模块化编程 中，开发者将程序分解为功能离散的 `chunk(discrete chunks of functionality)`，并称之为*模块*。

每个模块具有比完整程序更小的接触面，使得验证、调试、测试轻而易举。 精心编写的*模块*提供了可靠的抽象和封装界限，使得应用程序中每个模块，都具备了条理清楚的设计和明确的目的。

`webpack` *模块*能够以各种方式表达它们的依赖关系。下面是一些示例：

-`ES2015 import` 语句

- `CommonJS require()` 语句
- `AMD define 和 require` 语句
- `css/sass/less` 文件中的 `@import` 语句。
- 样式(`url(...)`)或 HTML 文件(`<img src=...>`)中的图片链接

## 模块解析

`resolver` 是一个库(`library`)，用于帮助找到模块的绝对路径。 一个模块可以作为另一个模块的依赖模块，然后被后者引用

## manifest

`webpack` 的 `runtime` 和 `manifest`，管理所有模块的交互。
如果要通过浏览器缓存改善性能，那么 `manifest` 将至关重要。

webpack 如何管理所有所需模块之间的交互呢？这就是 `manifest` 数据用途的由来……

### `runtime`

`runtime`，以及伴随的 `manifest` 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

## 部署目标（target）

最终的运行环境
默认是 web

```JS
module.exports = {
  target: 'node'
};
```

## 模块热替换 `hot module replacement`（HMR）

修改模块无需加载整个页面

## 浏览器兼容性

`webpack` 支持所有符合 `ES5` 标准 的浏览器（不支持 IE8 及以下版本）。`webpack` 的 `import()` 和 `require.ensure()` 需要 `Promise`。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 提前加载 `polyfill`

在安装一个 `package`，而此 `package` 要打包到生产环境 `bundle` 中时，你应该使用 `npm install --save`。如果你在安装一个用于开发环境目的的 `package` 时（例如，`linter`, 测试库等），你应该使用 `npm install --save-dev`
