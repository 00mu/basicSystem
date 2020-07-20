# CSS

对 Web 标准的理解、浏览器内核差异、兼容性、hack、CSS 基本功：布局、盒子模型、选择器优先级、 HTML5、CSS3、Flexbox

## 概念

### 01. 什么是 盒模型

页面渲染时，dom 元素所采用的 布局模型。可通过 box-sizing 进行设置。

- 标准盒模型 content-box
- IE 盒模型 border-box

### 02. 什么是 BFC

块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

触发条件：

- 根元素
- position: absolute/fixed
- display: inline-block / table
- float 元素
- ovevflow !== visible

应用:

- 阻止 margin 重叠
- 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个 div 都位于同一个 BFC 区域之中)
- 自适应两栏布局
- 可以阻止元素被浮动元素覆盖

### 03. 层叠上下文、层叠等级、层叠顺序、z-index

**层叠上下文：**

每个盒模型的位置是三维的，分别是平面画布上的 X 轴，Y 轴以及表示层叠的 Z 轴。一般情况下，元素在页面上沿 X 轴 Y 轴平铺，我们察觉不到它们在 Z 轴上的层叠关系。而一旦元素发生堆叠，这时就能发现某个元素可能覆盖了另一个元素或者被另一个元素覆盖。

元素提升为一个比较特殊的图层，在三维空间中 (z 轴) 高出普通元素一等。

触发条件：

- 根层叠上下文(html)
- position
- css3 属性
- flex
- transform
- opacity
- filter
- will-change
- -webkit-overflow-scrolling

**层叠等级**
![img](https://user-gold-cdn.xitu.io/2019/2/14/168e9d9f3a1d368b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

层叠等级：层叠上下文在 z 轴上的排序

- 在同一层叠上下文中，层叠等级才有意义
- z-index 的优先级最高
- 若父级有层级等级，受父级限制

### 04. 选择器优先级

- !important > 行内样式 > #id > .class > tag > \* > 继承 > 默认
- 选择器 从右往左 解析
- 权重叠加

### 05. CSS 有哪些样式可以给子元素继承

- 可继承的:font-size,font-weight,line-height,color,cursor 等
- 不可继承的一般是会改变盒子模型的:display,margin、border、padding、height 等

### 06. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些

- 行内: input,span,a,img 以及 display:inline 的元素
- 块级: p,div,header,footer,aside,article,ul 以及 display:block 这些
- void: br,hr

### 07. 外边距塌陷的问题

外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

只有普通文档流中块框的垂直外边距才会发生外边距合并。行内框、浮动框或绝对定位之间的外边距不会合并。

## Coding

### 01. 清除浮动的方式有哪些

- .clearfix
- clear:both
- overflow:hidden

```CSS
.clearfix::after {
  content:"";
  display:table;
  clear: both;
}
```

### 02. 单行省略 和 多行文本溢出省略

```CSS
/* 单行 */
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

```CSS
/* 多行 */
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

### 03. 水平垂直居中的 N 种写法

```HTML
<div class="wp">
    <div class="box size">123123</div>
</div>
```

1. absolute + margin auto

这种方法兼容性也很好，缺点是需要知道子元素的宽高

```CSS
.wp {
    position: relative;
}
.box {
    position: absolute;;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    width: 100px;
    height: 100px;
}
```

2. absolute + calc

```CSS
.wp {
    position: relative;
}
.box {
    position: absolute;;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
}
```

3. absolute + transform

   完美

```CSS
.wp {
    position: relative;
}
.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

4. css-table

   向下兼容性好，但语义并不优雅

```CSS
.wp {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.box {
    display: inline-block;
}
```

5. flex
   完美

```CSS
.wp {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

6. grid

```CSS
.wp {
    display: grid;
    justify-content: center;
    align-content: center;
}
```

grid 兼容性略差

## CSS3 动画

### 01. CSS 中 transition 和 animate 有何区别

`transition` 过渡效果, 没时间轴的概念, 通过事件触发(一次),没中间状态(只有开始和结束)

`animation` 补间动画，有时间轴的概念(帧可控),可以重复触发和有中间状态;

```CSS
animation: name duration timing-function delay iteration-count direction;
```

| 属性                      | 描述                                   |
| ------------------------- | -------------------------------------- |
| animation-name            | 规定需要绑定到选择器的 keyframe 名称   |
| animation-duration        | 规定完成动画所花费的时间，以秒或毫秒计 |
| animation-timing-function | 规定动画的速度曲线                     |
| animation-delay           | 规定在动画开始之前的延迟               |
| animation-iteration-count | 规定动画应该播放的次数                 |
| animation-direction       | 规定是否应该轮流反向播放动画           |

```CSS
transition: <property> <duration> <timing-function> <delay>;
```

| 属性                       | 描述                                  |
| -------------------------- | ------------------------------------- |
| transition-property        | 规定应用过渡的 CSS 属性的名称         |
| transition-duration        | 定义过渡效果花费的时间。默认是 0      |
| transition-timing-function | 规定过渡效果的时间曲线。默认是 "ease" |
| transition-delay           | 规定过渡效果何时开始。默认是 0        |

### 02. animation 动画停在最后一帧

设置 CSS 动画在执行之前和之后如何将样式应用于其目

```CSS
animation-fill-mode : none | forwards | backwards | both;
animation-fill-mode: forwards;
```

- none 是默认值，表示动画播放完成后，恢复到初始的状态。
- forwards 表示动画播放完成后，保持 @keyframes 里最后一帧的样式。
- backwards 表示开始播放动画之前，元素的样式将设置为动画第一帧的样式
- both 相当于同时配置了 forwards 和 backwards。也就是说，动画开始前，元素样式将设置为动画第一帧的样式；而在动画线束状态，元素样式将设置为动画最后一帧样式。

### 03. js 动画和 css3 动画有何区别

CSS 动画比 JS 流畅的前提：

- 在 Chromium 基础上的浏览器中
- JS 在执行一些昂贵的任务
- 同时 CSS 动画不触发 layout 或 paint
- 在 CSS 动画或 JS 动画触发了 paint 或 layout 时，需要 main thread 进行 Layer 树的重计算，这时 CSS 动画或 JS 动画都会阻塞后续操作。

仅触发 Composite，不触发 layout 或 paint

- backface-visibility
- opacity
- perspective
- perspective-origin
- transfrom

所以只有用上了 3D 加速或修改 opacity 时，才有机会用得上 CSS 动画的这一优势。

- 当您为 UI 元素采用较小的独立状态时，使用 CSS
- 在需要对动画进行大量控制时，使用 JavaScript + Web Animations API
- 如果您需要手动协调整个场景，可直接使用 requestAnimationFrame

使用 JavaScript 动画，您可以完全控制元素在每个步骤的样式。这意味着您可以在您认为合适时减慢动画、暂停动画、停止动画、倒退动画和操纵元素。如果您正在构建复杂的对象导向型应用，则此方法特别有用，因为您可以正确封装您的行为。

### 04. CSS 权重翻车

> 这道题我翻车了，非常汗颜。。。

选择器的权重链：

important >> 行内 style >> ID >> class(属性选择器、伪类选择器) >> tag >> \*(通配符) >> 继承

第一个重点：请注意这里的 `>>` ，意在表明不同级别的选择器的权重无法进行数字上的比较，比如无论多少个 class 叠加都无法超过 ID 选择器的权重，底层永远不可能重置上面层次的样式

常见的权重表的误导：

| 选择器    | 权重值 |
| --------- | ------ |
| important | 1000   |
| id        | 100    |
| class     | 10     |
| tag       | 1      |

很容易误解为 11 个 class 就能超越 id，再次重申这是错误的！！！

这张表数值的唯一作用在于，同级别的比较才有叠加计算的意义

```HTML
<div class="a1">
    <div class="a2">颜色</div>
</div>
```

```CSS
/* 继承 */
body{
    color: black;
}
/* 此时是黑色 */

*{
    color: green;
}
/* 重置以上，颜色为绿色 */

/* tag */
div{
    color: blue;
}
/* 重置以上，颜色为蓝色 */

/* 伪类 */
:first-child{
    color: red;
}
/* 重置以上，颜色为红色 */
```

```CSS
/* 后代 */
.a1 .a2{
    color: green;
}
/* 子 */
.a1>.a2{
    color: white;
}
/* 自身叠加 */
.a2.a2{
    color: red;
}
/* 伪类 */
.a2:first-child{
    color: blue;
}
/* 属性 */
.a1 [class="a2"]{
    color: black;
}
```

以上 5 中选择器的权重是一样的，谁在后面谁生效
