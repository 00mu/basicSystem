# WEB-API
ECMA为 `JavaScript` 提供了语法和一些原生的对象库，W3C标准提供了丰富的WEB接口供 `JavaScript` 来调用在浏览器中进行各种操作。

## DOM

“文档对象模型”（Document Object Model），将网页转为一个 JavaScript 对象，将结构化的文档（HTML）解析成一系列节点组成一个树状结构（DOM Tree），所有节点和最终的树状结构都有规范的对外接口，从而可以用脚本进行各种操作。

> 节点（node）：DOM的最小组成单位。

> 节点树（DOM Tree）：树是一种数据结构，根节点、父子节点、同级别节点构成， `document` 是顶级节点代表整个文档树。

### Node 接口

#### 属性

节点的7种类型，都继承了 node, 具有相同的属性和方法。

| 节点                     | nodeType | nodeName           | nodeValue       |     |
|--------------------------|----------|--------------------|-----------------|-----|
| 文档（document）           | 9        | #document          | null            |     |
| 元素（element）            | 1        | 大写的标签名         | null            |     |
| 属性（attr）               | 2        | 属性的名称          | 前节点本身的文本值 |     |
| 文本（text）               | 3        | #text              | 前节点本身的文本值 |     |
| 文档片断（DocumentFragment） | 11       | #document-fragment | null            |     |
| 文档类型（DocumentType）    | 10       | 文档的类型          | null            |     |
| 注释（Comment）            | 8        | #comment           | 前节点本身的文本值 |     |

| 其他属性         | 描述                                                                 |
|-----------------|----------------------------------------------------------------------|
| textContent     | 返回当前节点和它的所有后代节点的文本内容，可读写                             |
| baseURI         | 当前网页的绝对路径(window.location)                                     |
| ownerDocument   | 返回当前节点所在的顶层文档对象，即document对象，document.ownerDocument 为null |
| nextSibling     | 紧跟在当前节点后面的第一个同级节点，没有就返回null，该属性还包括文本节点和注释节点 |
| previousSibling | 当前节点前面的、距离最近的一个同级节点                                      |
| parentNode      | 当前节点的父节点，元素节点、文档节点和文档片段节点其一                         |
| parentElement   | 当前节点的父元素节点                                                    |
| firstChild      | 当前节点的第一个子节点                                                  |
| lastChild       | 属性返回当前节点的最后一个子节点                                          |
| childNodes      | 返回一个类似数组的对象（NodeList集合）, 包括当前节点的所有子节点               |
| isConnected     | 判断当前节点是否在文档之中，返回布尔值                                      |

#### 方法

| title       | title 
|-------------|-------
| appendChild() | 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点；如果参数节点是 DOM 已经存在的节点，appendChild()方法会将其从原来的位置，移动到新位置。
hasChildNodes()|返回一个布尔值，表示当前节点是否有子节点
cloneNode()|用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
insertBefore()| parentNode.insertBefore(newNode, referenceNode), 插入到指定位置，第一个参数是所要插入的节点newNode，第二个参数是父节点parentNode内部的一个子节点referenceNode
removeChild() | 从当前节点移除该子节点，如果参数节点不是当前节点的子节点，removeChild方法将报错
replaceChild()|div1.parentNode.replaceChild(newChild, div1), 替换当前节点的某一个子节点
contains()| 是否包含参数节点，1. 参数节点为当前节点2. 参数节点为当前节点的子节点3. 参数节点为当前节点的后代节点
compareDocumentPosition() | 用法与contains方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系
isEqualNode() | 返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同
isSameNode() | 表示两个节点是否为同一个节点，相同必然相等，反之则不
normalize() | 用于清理当前节点内部的所有文本节点
getRootNode() | 与ownerDocument属性的作用相同

### NodeList 接口

NodeList实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到NodeList实例

* `Node.childNodes` 
* `document.querySelectorAll()` 等节点搜索方法

可以使用length属性和forEach方法。NodeList 实例可能是动态集合，也可能是静态集合。所谓动态集合就是一个活的集合，DOM 删除或新增一个相关节点，都会立刻反映在 NodeList 实例。目前，只有Node.childNodes返回的是一个动态集合，其他的 NodeList 都是静态集合

| 属性方法   | 描述                                                                                   |
|-----------|----------------------------------------------------------------------------------------|
| length    | 返回 NodeList 实例包含的节点数量                                                          |
| forEach() | 遍历 NodeList 的所有成员，用法与数组实例的forEach方法完全一致                                  |
| item()    | 方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员                                    |
| keys()    | 这三个方法都返回一个 ES6 的遍历器对象，可以通过for... of循环遍历获取每一个成员的信息；返回键名的遍历器 |
| values()  | 返回键值的遍历器                                                                         |
| entries() | 返回的遍历器同时包含键名和键值的信息                                                         |

### HTMLCollection 接口

是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点。它的返回值是一个类似数组的对象，但是与NodeList接口不同，HTMLCollection没有forEach方法，只能使用for循环遍历。

返回HTMLCollection实例的，主要是一些Document对象的集合属性，比如 `document.links` 、 `document.forms` 、 `document.images` 等，见节点集合属性。

HTMLCollection实例都是动态集合，节点的变化会实时反映在集合中

| 属性方法     | 描述                                                     |
|-------------|----------------------------------------------------------|
| length      | 返回 HTMLCollection 实例包含的成员数量                      |
| item()      | 接受一个整数值作为参数，表示成员的位置，返回该位置上的成员          |
| namedItem() | 方法的参数是一个字符串，表示id属性或name属性的值，返回对应的元素节点 |

### ParentNode  接口

ParentNode 接口表示当前节点是一个父节点，提供一些处理子节点的方法

| 属性方法             | 描述                                                                                     |
|---------------------|------------------------------------------------------------------------------------------|
| children()          | 返回一个HTMLCollection实例，成员是当前节点的所有元素子节点。该属性只读                             |
| firstElementChild() | 返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回null                                  |
| lastElementChild()  | 返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回null                               |
| childElementCount() | 返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回0                     |
| append()            | 为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面；不仅可以添加元素子节点，还可以添加文本子节点 |
| prepend()           | 为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面；不仅可以添加元素子节点，还可以添加文本子节点  |

###  ChildNode 接口

如果一个节点有父节点，那么该节点就拥有了ChildNode接口。

| 属性方法           | 描述                                                  |
|-------------------|-------------------------------------------------------|
| el.remove()       | 从父节点移除当前节点                                     |
| el.defore(a, b)   | 用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点 |
| el.after(a, b)    | 用于在当前节点的后面，插入一个或多个同级节点。两者拥有相同的父节点 |
| el.replaceWith(a) | 用参数节点，替换当前节点                                  |

### ChildNode 接口

ChildNode 接口表示当前节点是一个子节点，提供一些相关方法

### Document 节点

document节点对象代表整个文档，每张网页都有自己的document对象。window.document属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

document对象有不同的办法可以获取。

* 正常的网页，直接使用document或window.document。
* iframe框架里面的网页，使用iframe节点的contentDocument属性。
* Ajax 操作返回的文档，使用XMLHttpRequest对象的responseXML属性。
* 内部节点的ownerDocument属性。

document对象继承了EventTarget接口和Node接口，并且混入（mixin）了ParentNode接口。这意味着，这些接口的方法都可以在document对象上调用。除此之外，document对象还有很多自己的属性和方法。

#### Document 属性 

| 属性                              | 描述                                                                                                                                                                                                                                                                                                                                                             |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 快捷属性                           | 指向文档内部的某个节点的快捷方式                                                                                                                                                                                                                                                                                                                                      |
| document.defaultView              | 返回document对象所属的window对象                                                                                                                                                                                                                                                                                                                                    |
| document.doctype                  | 指向 `<DOCTYPE>` 节点，即文档类型（Document Type Declaration，简写DTD）节点。HTML 的文档类型节点，一般写成 `<!DOCTYPE html>` |
| document.documentElement          | 指向 `<html>` 节点                                                                                                                                                                                                                                                                                                                                                  |
| document.body                     | 指向 `<body>` 节点                                                                                                                                                                                                                                                                                                                                                  |
| document.head                     | 指向 `<head>` 节点                                                                                                                                                                                                                                                                                                                                                  |
| document.scrollingElement         | 返回文档的滚动元素。滚动到顶部 `document.scrollingElement.scrollTop = 0` |
| document.activeElement            | 返回获得当前焦点（focus）的 DOM 元素，通常，这个属性返回的是 `<input>、<textarea>、<select>` 等表单元素，如果当前没有焦点元素，返回 `<body>` 元素或null                                                                                                                                                                                                                                   |
| document.fullscreenElement        | 返回document对象所属的window对象                                                                                                                                                                                                                                                                                                                                    |
| document.defaultView              | 返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回null                                                                                                                                                                                                                                                                                                         |
| 节点集合属性                        | 处了document.styleSheets返回一个HTMLCollection实例 ，表示文档内部特定元素的集合                                                                                                                                                                                                                                                                                          |
| document.links                    | 返回当前文档所有设定了href属性的 `<a>` 及 `<area>` 节点                                                                                                                                                                                                                                                                                                                   |
| document.forms                    | 所有 `<form>` 表单节点                                                                                                                                                                                                                                                                                                                                               |
| document.images                   | 所有 `<img>` 图片节点                                                                                                                                                                                                                                                                                                                                                |
| document.embeds                   | 和document.plugins属性，都返回所有 `<embed>` 节点                                                                                                                                                                                                                                                                                                                      |
| document.scripts                  | 返回所有 `<script>` 节点                                                                                                                                                                                                                                                                                                                                             |
| document.styleSheets              | 返回文档内嵌或引入的样式表集合                                                                                                                                                                                                                                                                                                                                        |
| 静态信息属性                        |                                                                                                                                                                                                                                                                                                                                                                  |
| document.documentURI              | 当前文档的网址，继承自Document接口，可用于所有文档                                                                                                                                                                                                                                                                                                                       |
| document. URL                     | 当前文档的网址，继承自HTMLDocument接口，只能用于 HTML 文档                                                                                                                                                                                                                                                                                                               |
| document.document.domain          | 返回当前文档的域名，不包含协议和端口                                                                                                                                                                                                                                                                                                                                   |
| document.document.location        | 浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过window.location和document.location属性，可以拿到这个对象                                                                                                                                                                                                                                                              |
| document.lastModified             | 返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的                                                                                                                                                                                                                                                                                              |
| document.title                    | 返回当前文档的标题。默认情况下，返回 `<title>` 节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值                                                                                                                                                                                                                                                                             |
| document.characterSet             | 当前文档的编码，比如UTF-8、ISO-8859-1等等                                                                                                                                                                                                                                                                                                                             |
| document.referrer                 | 返回一个字符串，表示当前文档的访问者来自哪里，                                                                                                                                                                                                                                                                                                                            |
| document.compatMode               | 返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）；如果网页代码的第一行设置了明确的DOCTYPE（比如<!doctype html>），document.compatMode的值都为CSS1Compat                                                                                                                                                                                             |
| 文档状态属性                        |                                                                                                                                                                                                                                                                                                                                                                  |
| document.hidden                   | 返回一个布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得document.hidden返回true                                                                                                                                                                                                                                                          |
| document.document.visibilityState | 返回文档的可见状态:1.visible：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。 2.hidden：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。3.prerender：页面处于正在渲染状态，对于用户来说，该页面不可见。4.unloaded：页面从内存里面卸载了                                                                                                                               |
| document.readyState               | 浏览器开始解析 HTML 文档，document.readyState属性等于loading。浏览器遇到 HTML 文档中的 `<script>` 元素，并且没有async或defer属性，就暂停解析，开始执行脚本，这时document.readyState属性还是等于loading。HTML 文档解析完成，document.readyState属性变成interactive。浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，document.readyState属性变成complete。每次都会触发一个readystatechange事件。 |
| document.cookie                   | 用来操作浏览器 Cookie                                                                                                                                                                                                                                                                                                                                              |
| document.implementation           | 该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象。DOMImplementation.createDocument()：创建一个 XML 文档。DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。                                                                                                                              |

#### Document 方法

| 方法                              | 描述                                                                                                                                                                          |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| querySelector 系列                |                                                                                                                                                                               |
| document.querySelector()          | 接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点                                                                                                                                |
| document.querySelectorAll()       | 与querySelector用法类似，区别是返回一个NodeList对象，包含所有匹配给定选择器的节点。两个方法都支持多个及复杂选择器。All的返回结果**不是动态集合**，不会实时反映元素节点的变化。                            |
| getElement 系列                   | getElements 返回结果是数组，是动态的                                                                                                                                              |
| document.getElementsByTagName()   | 返回符合条件的所有元素，可以实时反映 HTML 文档的变化                                                                                                                                  |
| document.getElementsByClassName() | 返回一个类似数组的对象（HTMLCollection实例），包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中                                                                             |
| document.getElementsByName()      | 也是一个集合，拥有name属性的 HTML 元素                                                                                                                                             |
| document.getElementById()         | 匹配指定id属性的元素节点，document.getElementById()比document.querySelector()效率高得多                                                                                             |
| create 系列                       | 生成节点                                                                                                                                                                       |
| document.createTextNode()         | 法用来生成文本节点                                                                                                                                                               |
| document.createAttribute()        | 法用来生成属性节点                                                                                                                                                               |
| document.createComment()          | 法用来生成注释节点                                                                                                                                                               |
| document.createDocumentFragment() | 生成一个空的文档片段对象， 是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现 |
| document.createEvent()            | 生成一个事件对象（Event实例），该对象可以被element.dispatchEvent方法使用，触发指定事件                                                                                                    |
|                                   |                                                                                                                                                                               |
| document.hasFocus()               | 当前文档之中是否有元素被激活或获得焦点                                                                                                                                              |
| document.createAttribute()        | 法用来生成属性节点                                                                                                                                                               |
| document.createAttribute()        | 法用来生成属性节点                                                                                                                                                               |
|                                   |                                                                                                                                                                               |
| document.open()                   | 方法清除当前文档所有内容，使得文档处于可写状态，供document.write方法写入内容                                                                                                             |
| ocument.close()                   | 用来关闭document.open()打开的文档                                                                                                                                                |
| document.write()                  | 方法用于向当前文档写入内容, 会当作 HTML 代码解析，不会转义。推荐使用对innerHTML属性赋值                                                                                                    |
| document.writeln()                | 与write方法完全一致，除了会在输出内容的尾部添加换行符                                                                                                                                 |

### Element 节点

每一个 HTML 元素，在 DOM 树上都会转化成一个Element节点对象（以下简称元素节点）。Element对象继承了Node接口，因此Node的属性和方法在Element对象都存在。此外，不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点，比如 `<a>` 元素的节点对象由HTMLAnchorElement构造函数生成， `<button>` 元素的节点对象由HTMLButtonElement构造函数生成。因此，元素节点不是一种对象，而是一组对象，这些对象除了继承Element的属性和方法，还有各自构造函数的属性和方法。

属性和方法太多了，挑拣一些写一下。

#### 实例属性

| title                                                    | title                                                                                                                                                                                                                         |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 元素特性                                                  |                                                                                                                                                                                                                               |
| id, tagName, accessKey, draggable, lang, tabIndex, title | 获取或者改写元素的id、标签、快捷键啊什么的                                                                                                                                                                                            |
| 元素状态的相关                                             |                                                                                                                                                                                                                               |
| el.hidden                                                | 控制当前元素是否可见，并不能读取css设置不可见                                                                                                                                                                                        |
| el.contentEditable                                       | 素可以设置contentEditable属性，使得元素的内容可以编辑                                                                                                                                                                                |
| el.attributes                                            |                                                                                                                                                                                                                               |
| el.className，el.classList                                |                                                                                                                                                                                                                               |
| el.dataset                                               |                                                                                                                                                                                                                               |
| el.innerHTML                                             | 返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括 `<HTML>` 和 `<body>` 元素，有安全风险，如果是文本最好使用 textContent                                                                |
| el.outerHTML                                             |                                                                                                                                                                                                                               |
| el.clientHeight，el.clientWidth                           | 返回块级元素的CSS宽高（包括padding，减去滚动条），如果css设置了高度则为设置的值否则为实际块的宽高，document.documentElement.clientHeight 浏览器窗口的高度(不包含滚动条，window.innerHeight 包括滚动条)，document.body.clientHeight 页面文档流的实际高度    |
| el.clientLeft，el.clientTop                               | 返回左边框、右边框的css大小                                                                                                                                                                                                       |
| el.scrollHeight，el.scrollWidth                           | 当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括padding，但是不包括border、margin以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（::before或::after）的高度，只可读，整张网页的总高度可以从document.documentElement或document.body上读取 |
| el.scrollLeft，el.scrollTop                               | 当前元素的水平滚动条向右侧滚动的像素数量，整张网页用document.documentElement.scrollLeft                                                                                                                                                |
| el.offsetParent                                          |                                                                                                                                                                                                                               |
| el.offsetHeight，el.offsetWidth                           | 包括border和padding和滚动条                                                                                                                                                                                                     |
| el.offsetLeft，el.offsetTop                               | 相对于父节（position）点的位移                                                                                                                                                                                                     |
| el.style                                                 | 每个元素节点都有style用来读写该元素的行内样式信息                                                                                                                                                                                    |
| el.children，el.childelCount                              |                                                                                                                                                                                                                               |
| el.firstelChild，el.lastelChild                           |                                                                                                                                                                                                                               |
| el.nextelSibling，el.previouselSibling                    |                                                                                                                                                                                                                               |

#### 实例方法

补充几个常见的。
|title|title
|-----|-----
|el.scrollIntoView()|滚动当前元素，进入浏览器的可见区域。参数默认true：顶部对齐, false 底部对齐
|el.getBoundingClientRect()|提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息
|el.getClientRects()|返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形。对于行内元素就是多个矩形了

* el.getBoundingClientRect()，方法的所有属性，都把边框（border属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，width和height包括了元素本身 + padding + border
  + x：元素左上角相对于视口的横坐标
  + y：元素左上角相对于视口的纵坐标
  + height：元素高度
  + width：元素宽度
  + left：元素左上角相对于视口的横坐标，与x属性相等
  + right：元素右边界相对于视口的横坐标（等于x + width）
  + top：元素顶部相对于视口的纵坐标，与y属性相等
  + bottom：元素底部相对于视口的纵坐标（等于y + height）
  + 由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将left属性加上window.scrollX，top属性加上window.scrollY

### 属性的操作

HTML 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。转换规则是，转为 JavaScript 属性名时，一律采用小写。如果属性名包括多个单词，则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如onClick

* Element.attributes 属性
* 元素的标准属性
* Element.getAttribute()
* Element.getAttributeNames()
* Element.setAttribute()
* Element.hasAttribute()
* Element.hasAttributes()
* Element.removeAttribute()
* dataset 属性

### Text 节点

Text 节点的概念
Text 节点的属性
data
wholeText
length
nextElementSibling，previousElementSibling
Text 节点的方法
appendData()，deleteData()，insertData()，replaceData()，subStringData()
remove()
splitText()

### DocumentFragment 文档片段节点

DocumentFragment节点代表一个文档的片段，本身就是一个完整的 DOM 树形结构。它没有父节点，parentNode返回null，但是可以插入任意数量的子节点。它不属于当前文档，操作DocumentFragment节点，要比直接操作 DOM 树快得多。

注意，DocumentFragment节点本身不能被插入当前文档。当它作为appendChild()、insertBefore()、replaceChild()等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦DocumentFragment节点被添加进当前文档，它自身就变成了空节点（textContent属性为空字符串），可以被再次使用。如果想要保存DocumentFragment节点的内容，可以使用cloneNode方法。

``` JS
// 反转指点节点的所有子节点
function reverse(n) {
    var f = document.createDocumentFragment();
    while (n.lastChild) f.appendChild(n.lastChild);
    n.appendChild(f);
}
```

### CSS 操作

如何通过 JavaScript 操作 CSS。

####  HTML 元素的 style 属性

操作 CSS 样式最简单的方法，就是使用网页元素节点的getAttribute()方法、setAttribute()方法和removeAttribute()方法，直接读写或删除网页元素的style属性

``` JS
div.setAttribute(
    'style',
    'background-color:red;' + 'border:1px solid black;'
);
```

#### CSSStyleDeclaration 接口

CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性。style属性是一个 CSSStyleDeclaration 的实例，对象所包含的属性与 CSS 规则一一对应。写法需要遵循一定的规则：

``` JS
el.divStyle.backgroundColor = 'red';
```

* 连词号需要变成骆驼拼写法，如 background-color写成backgroundColor
* CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串css，比如float写成cssFloat
* 该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号

####  CSS 模块的侦测

有时候，需要知道当前浏览器是否支持某个模块。一个比较普遍适用的方法是，判断元素的style对象的某个属性值是否为字符串。

``` JS
document.body.style['maxWidth'] // ""
document.body.style['maximumWidth'] // undefined; 不支持
```

一个兼容不同浏览器前缀的函数

``` JS
function isPropertySupported(property) {
    if (property in document.body.style) return true;
    var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
    var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + prefProperty) in document.body.style) return true;
    }

    return false;
}

isPropertySupported('background-clip')
```

#### CSS.supports('display: table-cell') 是否支持某一规则

#### window.getComputedStyle() 用来返回浏览器计算后得到的最终全部规则。

它接受一个节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的各种CSS规则叠加后的最终样式信息。

``` JS
window.getComputedStyle(documment.body)
window.getComputedStyle(div, ':before') // 还可以接受第二个参数，表示当前元素的伪元素（比如:before、:after、:first-line、:first-letter等） 
```

### Mutation Observer API

Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

Mutation Observer 有以下特点。

它等待所有脚本任务完成后，才会运行（即异步触发方式）。
它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。
它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。

## 事件

### EventTarget 接口
事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的一种实现。

DOM 事件的操作（监听和触发）都定义在 EventTarget 接口，所有节点都部署了这个接口。提供了三个实例方法。

#### EventTarget.addEventListener(type, listener[, useCapture])

* type: 事件名称，大小写敏感
* listener： 监听函数
* useCapture：布尔值，默认为false 在冒泡阶段触发； true 在捕获阶段触发
  + capture：布尔值，表示该事件是否在捕获阶段触发监听函数。
  + once：布尔值，表示监听函数是否只触发一次，然后就自动移除。
  + passive：布尔值，表示监听函数不会调用事件的preventDefault方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。

``` JS
el.addEventListener('click', function() {
    console.log("hello")
}, false);
```

* addEventListener方法可以为针对当前对象的同一个事件，添加多个不同的监听函数。这些函数按照添加顺序触发，即先添加先触发。
* 如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除

#### EventTarget.removeEventListener()

参数，与addEventListener方法完全一致，才能移除。

#### EventTarget.dispatchEvent() 

在当前节点上触发指定事件，从而触发监听函数的执行。自定义事件用起来。

该方法返回一个布尔值，只要有一个监听函数调用了Event.preventDefault()，则返回值为false，否则为true。

dispatchEvent方法的参数是一个Event对象的实例。

根据dispatchEvent方法的返回值，判断事件是否被取消了。

``` JS
var canceled = !cb.dispatchEvent(event);
if (canceled) {
    console.log('事件取消');
} else {
    console.log('事件未取消');
}
```

### 事件模型

浏览器的事件模型，就是通过监听函数（listener）对事件做出反应。这是事件驱动编程模式（event-driven）的主要编程方式。

DOM 0级的监听方式：

``` JS
el.onclick = function() {}
```

DOM 2级的监听方式：

``` JS
el.addEventListener('click', function() {}, false)
```

DOM0，缺点在于同一事件只能定义一个监听函数，多次定义后面覆盖前面的。

DOM2（DOM1没有规定事件相关规范），是推荐的优点如下：

* 同一事件可以添加多个监听函数
* 能够指定在冒泡还是捕获阶段触发（先捕获，再冒泡）
* 除了 DOM 节点，其他对象（比如window、XMLHttpRequest等）也有这个接口，它等于是整个 JavaScript 统一的监听函数接口。

#### this指向

监听函数内部的this指向触发事件的那个元素节点。

#### 事件的传播

* 第一阶段：从window对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
* 第二阶段：在目标节点(点击触发最底层的那个节点)上触发，称为“目标阶段”（target phase）。
* 第三阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

``` JS
// html 结构
html > body > p

const btn = document.getElementsByTagName('P');
btn.addEventListener('click', function(e));
```

1. 捕获阶段 window>html>body>p
2. 目标阶段 p（会触发两次）
2. 冒泡阶段 p>body>html>window

#### 事件的代理

由于事件会冒泡到父节点上，因此可以把子节点的监听函数定义在父节点上，由父节点同一处理子元素的事件。这种方法称之为代理。

好处有2：1. 代码更简洁，2. 不用给新增加的子元素绑定事件

阻止事件传播

* event.stopPropagation  阻止事件传播
* event.stopImmediatePropagation  不再触发后面所有click的监听函数

### Event 对象

事件发生后会产生一个事件对象作为参数传递给监听函数，所有事件对象都是原生 Event 的实例。

``` JS
// 生成一个事件对象
const event = new Event(type, options);
// type 是事件名，是个字符串
// options 事件对象的配置项，是可选项。它有两个属性，配置如下：
{
    bubbles: false, // 表示事件对象是否冒泡，默认false 不冒泡只能在捕获阶段触发
    cancelable: false // 事件是否可以被Event.preventDefault()取消，默认false 不可以 
}
```
#### 实例属性
实例属性|描述|
-----|-----|
Event.bubbles|返回布尔值，判断事件是否可以冒泡
Event.eventPhase|返回一个数字，表示目前处于哪个阶段：<br/>0 -> 事件没有发生<br/>1 -> 捕获阶段<br/>2 -> 目标节点<br/>3 -> 冒泡阶段
Event.cancelable|事件是否可以取消
Event.cancelBubble|属性是一个布尔值，如果设为true，相当于执行Event.stopPropagation()，可以阻止事件的传播
Event.defaultPrevented|返回一个布尔值，表示该事件是否调用过Event.preventDefault方法
Event.cancelable|返回一个布尔值，表示该事件是否调用过
Event.target|事件的原始触发节点（比如click，就是直接点击的哪个最底层的节点）
Event.currentTarget|事件当前正在通过的节点，随着事件捕获或者冒泡传播属性值会变化，事件对象中的 this 指向 事件的currentTarget属性
Event.type| 事件的属性类型
Event.timeStamp|返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的
Event.isTrusted|返回一个布尔值，表示该事件是否由真实的用户行为产生。Event构造函数生成的事件返回false，因为是脚本产生的
Event.detail|返回一个数值表示事件的某种信息，具体和事件类型有关，比如click 1单机 2双击

#### 实例方法
实例方法|描述|
-----|-----|
Event.preventDefault()|  只是阻止当前元素的默认事件，不会阻止传播；<br>该方法生效的前提是，事件对象的cancelable属性为true
Event.stopPropagation()|  阻止当前事件的继续传播，但不会阻止当前节点其他事件监听函数
Event.stopImmediatePropagation()|  阻止当前事件的继续传播，同时阻止当前节点在其之后的事件监听
Event.composedPath()| 返回一个数组，成员是最底层节点和依次经过的所有上层节点，比如['button',...,'body', 'html', 'window']

事件太多了，业务中用到再查，建议参考阮一峰老师的教程 [事件一览表](https://wangdoc.com/javascript/events/index.html)
### 数表事件
### 键盘事件
### 进度事件
### 表单事件
### 触摸事件
### 拖拉事件
### 其他事件
* 资源事件
  * beforeunload 事件
  * unload 事件
  * load 事件，error 事件
* session 历史事件
  * pageshow 事件，pagehide 事件
  * popstate 事件
  * hashchange 事件
* 网页状态事件
  * DOMContentLoaded 事件 ： DOM 一解析完毕就会在document对象上触发 DOMContentLoaded 事件
  * readystatechange 事件
* 窗口事件
  * scroll 事件
  * resize 事件
  * fullscreenchange 事件，fullscreenerror 事件
* 剪贴板事件
* 焦点事件
* CustomEvent 接口 用于自定义事件传递数据

``` JS
var event = new CustomEvent('build', { 'detail': 'hello' });

function eventHandler(e) {
  console.log(e.detail);
}

document.body.addEventListener('build', function (e) {
  console.log(e.detail);
});

document.body.dispatchEvent(event);
```

## BOM
浏览器内置了 JavaScript 引擎，并且提供各种接口，让 JavaScript 脚本可以控制浏览器的各种功能。

### 浏览器环境概述
#### JavaScript 嵌入页面的4中方法
* `<script>`元素直接嵌入代码。
* `<script>`标签加载外部脚本
* 事件属性
* URL 协议
``` JS
<a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
// javascript:协议的常见用途是书签脚本 Bookmarklet
```
#### `<script>` 元素的工作原理
1. 一边下载HTML同时开始解析
2. 解析过程中遇到 `<script>` 元素，就暂停解析，把网页渲染控制权交给 JavaScript 引擎。
3. 如果`<script>`引用了外部脚本就去下载，否则开始执行脚本
4. 执行完毕脚本，JavaScript 引擎将控制权交给渲染引擎，继续解析html

so, 基本资源放置在body是比较好的方法，另外为了尽快执行脚本 使用 DOMContentLoaded 事件回调，因为在DOM渲染已结束就触发
``` JS
<script>
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        console.log(document.body.innerHTML);
      }
    );
  </script>
```

``` JS
<script src="a.js"></script>
<script src="b.js"></script>

// 多个js可能并行加载，尽管可能b先加载完，依然需要等待a加载结束先执行a再执行b
// 另外，同域名请求打开tcp连接数量有限制，而请求不同域名没有限制
```

解决阻塞加载的两个属性：defer & async
``` JS
// defer
<script src="a.js" defer></script>
<script src="b.js" defer></script>
// 浏览器在解析html过程中发现带有defer属性的`<script>`元素，继续向下解析同时下载脚本，
// 完成解析后开始执行加载的脚本，在 DOMContentLoaded 事件触发前加载
// 不影响a，b执行的顺序

<script src="a.js" async></script>
<script src="b.js" async></script>
// 不同的是，谁先下载完，先执行谁
// 相比 defer 第一个文件可能执行的更早， 但是不保证执行顺序
```


加载协议：
``` JS
<script src="example.js"></script>  // 默认http协议下载
<script src="https://example.js"></script> // 指定https下载
<script src="//example.js"></script> // 根据页面本身的协议决定加载协议
```

渲染引擎：
* 不同浏览器使用不用引擎
* Firefox：Gecko 引擎
* Safari：WebKit 引擎
* Chrome：Blink 引擎
* IE: Trident 引擎
* Edge: EdgeHTML 引擎

渲染有4个阶段，
  1. 解析代码： HTML -> DOM，CSS -> CSSOM
  2. 对象合成：将DOM 和 CSSOM 合成一颗渲染树
  3. flow：计算布局，各个节点大小位置等
  4. paint：绘制

重排（reflow）：渲染引擎计算元素位置和大小时会引起重排

重绘（repaint）：将重排的结果或者元素颜色等信息都会引起重新渲染，重排必然重绘

JavaScript 引擎：在 eventLoop 详细解释

### window 对象

1. 概述
2. window 对象的属性
    1. window.name
    1. window.closed，window.opener
    1. window.self，window.window
    1. window.frames，window.length
    1. window.frameElement
    1. window.top，window.parent
    1. window.status
    1. window.devicePixelRatio
    1. 位置大小属性
    1. 组件属性
    1. 全局对象属性
3. window.isSecureContext
    1. window 对象的方法
    1. window.alert()，window.prompt()，window.confirm()
    1. window.open(), window.close()，window.stop()
    1. window.moveTo()，window.moveBy()
    1. window.resizeTo()，window.resizeBy()
    1. window.scrollTo()，window.scroll()，window.scrollBy()
    ``` JS
      window.scrollTo({
        top: 1000,
        behavior: 'smooth' // 丝滑细腻的滚动
      });
      //如果不是要滚动整个文档，而是要滚动某个元素
      Element.scrollTop
      Element.scrollLeft
      Element.scrollIntoView()
    ```
     
    1. window.print()
    1. window.focus()，window.blur()
    1. window.getSelection()
    1. window.getComputedStyle()，window.matchMedia()
    1. window.requestAnimationFrame()
    1. window.requestIdleCallback()
4. 事件
    1. load 事件和 onload 属性
    1. error 事件和 onerror 属性
    1. window 对象的事件监听属性
5. 多窗口操作
    1. 窗口的引用
    1. iframe 元素
    1. window.frames 属性

### Navigator 对象
属性：
* Navigator.userAgent：最长用了 ua
* Navigator.plugins
* Navigator.platform ： 返回用户的操作系统信息
* Navigator.onLine ： 是否联网
* Navigator.language，Navigator.languages
* Navigator.geolocation
* Navigator.cookieEnabled

方法：
* Navigator.javaEnabled()：否能运行 Java Applet 小程序
* Navigator.sendBeacon()：用于向服务器异步发送数据

### Screen 对象
* Screen.height：浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
* Screen.width：浏览器窗口所在的屏幕的宽度（单位像素）。
* Screen.availHeight：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于height减去那些被系统组件的高度。
* Screen.availWidth：浏览器窗口可用的屏幕宽度（单位像素）。
* Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
* Screen.colorDepth：Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
* Screen.orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary。

### Cookie
cookie 是前后端通信http协议的一部分，每次请求都会携带cookie。


###   XMLHttpRequest
用脚本发起的通信，就可以叫Ajax。创建一个Ajax：
1. 创建一个 XMLHttpRequest 实例
2. 发出http请求
3. 接收服务器传回来的数据
4. 更新网页数据

与Ajax出生时不同的是，JSON格式已经替代了XML，除了HTTP请求支持file、ftp等


``` JS
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){  // 一旦实例的状态发生变化，就会调用监听函数
  // 通信成功时，状态值为4
  if (xhr.readyState === 4){ // 4，已接受或失败
    if (xhr.status === 200){ // 状态码
      console.log(xhr.responseText);  // 返回的数据
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.open('GET', '/endpoint', true); // open方法指定建立http连接的细节
xhr.send(null); // 实际发送请求
```

Ajax 只能向同源（协议、域名、端口都相同）网址发出请求，如果发出跨域请求，就会报错

### XMLHttpRequest.withCredentials
跨域请求时，用户信息是否包含在请求中。默认false。
如果跨域需要设置 withCredentials 为true。
为了让这个属性生效，服务器必须显式返回Access-Control-Allow-Credentials这个头信息。

### cookie storage

### location
Location对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过window.location和document.location属性，可以拿到这个对象。

属性|描述|
-----|-----|
| Location.href | 整个 URL
| Location.protocol | 当前 URL 的协议，包括冒号（:）
| Location.host | 主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口
| Location.hostname | 主机名，不包括端口
| Location.port | 端口号
| Location.pathname | URL 的路径部分，从根路径/开始
| Location.search | 查询字符串部分，从问号?开始
| Location.hash | 片段字符串部分，从#开始
| Location.username | 域名前面的用户名
| Location.password | 域名前面的密码
| Location.origin | URL 的协议、主机名和端口

方法|描述|
-----|-----|
document..location.assign(url)|使得浏览器立刻跳转到新的 URL
Location.replace(url)|使得浏览器立刻跳转到新的 URL，替换掉当前页面的history记录
Location.reload(Boolean)|刷新，默认true向服务器请求，false 从本地缓存加载
Location.toString()| 相当于 Location.href 属性

编码解析|描述|
-----|-----|
encodeURI(完整的url)| 将元字符和语义字符之外的字符，都进行转义
encodeURIComponent(URL片段)| 连元字符一起转义了，用来转义参数而不能整个url
decodeURI()| 解码 encodeURI 的转码
decodeURIComponent()| 解码 encodeURIComponent 的转码

> URL 元字符：分号（;），逗号（,），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）

> 语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（'），圆括号（()）

除了以上字符，其他字符出现在 URL 之中都必须转义

### URL
URL接口是一个构造函数，浏览器原生提供，可以用来构造、解析和编码 URL。一般情况下，通过window.URL可以拿到这个构造函数

``` JS
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"

var url2 = new URL('page2.html', 'http://example.com/page1.html');
url2.href
// "http://example.com/page2.html"

var url3 = new URL('..', 'http://example.com/a/b.html')
url3.href
// "http://example.com/"
```







## 存储
sessionStorage
locationStorage


## 多媒体元素接口

