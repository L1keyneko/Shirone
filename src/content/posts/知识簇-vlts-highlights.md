---
title: volantis - 更改行间代码行数及字体
published: 2022-04-01
description: volantis5 使用 highlightjs 时显示行号与修改代码字体
category: 知识簇
tags: [Hexo, volantis, CSS]
permalink: knowledge-cluster/hexo/volantis-highlightjs
---

::: info 版本注意 
适用于 Volantis5/6 版本
:::

## 0 前言

Hexo 主题 volantis 集成了两种行间代码框高亮模板：highlightjs 与 prismjs。可以在 .yml 配置文件中方便地使用它们。但在使用的时候会出现一些小问题，比如代码字体与正文字体相同和不支持显示行号等，可以用接下来提到的方法进行优化。

不过因为我并不熟悉 css 和 JavaScript，本方法仍存在一些没有解决的问题，见最后一个章节，请慎用。

> 现在是 AI 时代了，我将如潮水般修复——等等，老文档还是就这样归档沉底吧。

> [!NOTE]
> 本方法参考 [volantis主题修改代码高亮样式](https://goopher.tk/posts/3.html) ，是基于该方法对当前版本的 volantis 所做的重写。
> 
> 即便参考文档已经无法访问了，这里仍留作存档。





## 1 修改步骤

### 1.1 添加行号显示代码

于位置 `/themes/volantis/layout/_plugins/highlight/highlightjs/script.ejs` 文件，对其作以下修改：

```js
// 代码高亮部分的css样式
<% if (theme.plugins.highlightjs.css) { %>
  <script>volantis.css("<%- theme.plugins.highlightjs.css %>");</script>
<% } %>
// 代码高亮部分的js，在这里加入引入的代码行号的js文件
<% if (theme.plugins.highlightjs.js) { %>
  <%- js(theme.plugins.highlightjs.js) %>
  <script src="https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.8.0/dist/highlightjs-line-numbers.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
  <script>hljs.initLineNumbersOnLoad({ singleLine: true });</script>
  <% } %>
  <script>volantis.requestAnimationFrame(hljs.highlightAll)</script>
  <script>
  volantis.pjax.push(()=>{
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block, { singleLine: true });
      });
  },"highlightjs")
  </script>
// 拷贝代码按键的部分
<% if(theme.plugins.highlightjs.copy_code){ %>
<script>
  function pjax_highlightjs_copyCode(){
    if (!(document.querySelector(".highlight .code pre") ||
      document.querySelector(".article pre code"))) {
      return;
    }
    VolantisApp.copyCode(".highlight .code pre, .article pre code")
  }
  volantis.requestAnimationFrame(pjax_highlightjs_copyCode)
  volantis.pjax.push(pjax_highlightjs_copyCode)
</script>
<% } %>
```

`.ejs` 本质上还是 JavaScript 模板，而原本的引用方法会在我的编辑器当中疯狂警告，因此沿用了参考教程的格式，补充了 css 和复制按钮部分。

### 1.2 创建样式文件

路径 `/themes/volantis/source/css/` 下创建一个自己的文件夹，如果之前看过官方文档中添加更多 noteblock 标签相关内容的话，这里面应该存在一个 `_自定义名称` 的文件夹，这里姑且命名为 `_other` 文件夹。

这个文件用于存放自己自定义的 styl 样式，方便整理。当然，要记得在后面的步骤中引入这个文件夹内的样式。

在其中建立名为 `codeblock.styl` 的样式文件。

```css
/* for block of numbers */
.hljs-ln-numbers {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
 
  text-align: center;           /* 行号的对齐方式 */
  color: #f6f6f6;               /* 行号颜色 */
  border-right: 1px solid #CCC; /* 竖线的粗细、样式和颜色 */
  vertical-align: top;
  padding-right: 5px;
  font-family:  Menlo, Monaco;  /* 行号的字体，不设置即为正文字体 */
  background:                   /* 行号的背景颜色，为保持一致，请使用highlightjs的css的背景颜色 */
}
 
.hljs-ln-code {
  padding-left: 10px !important;
  font-family:  Menlo, Monaco;  /* 代码的字体，不设置即为code字体 */
  background:                   /* 同上一个background */
}
```

引入两个部分的样式，分别是行号部分和代码正文部分，可以对其进行样式和字体的修改。

#### 调整暗黑模式下颜色不匹配问题

使用 highlightjs 之后，volantis 的暗黑模式就不会再影响到代码框的背景颜色了。

而由于我也不知道什么原因的问题，暗黑模式之下的 highlightjs 会影响存在代码的代码行的背景色，造成背景色差异。而亮模式下却不存在颜色差异（可能是因为默认的 background 参数，不过 volantis 使用 highlightjs 之后的代码框在两个模式下都应该是同一个颜色的）。

::: grid{columns="2" fit="contain"}
![](https://site.lyrikp.art/article/knowledge-cluster/vlts/vlts-code-css-light.webp "浅色模式下无异常")
![](https://site.lyrikp.art/article/knowledge-cluster/vlts/vlts-code-css-dark.webp "暗黑模式下代码行背景有所改变")
:::

因此，这里用了手动设置背景色 `background` 的方法规避掉背景色不同的问题。

这需要在选定好 css 模板之后，按照模板的颜色设置其背景颜色使其统一，是一种逃课的方法。

> 诶嘿。

### 1.3 引入样式文件

在 `/themes/volantis/source/css/style.styl` 文件中补充引入有刚才写入 `codeblock.styl` 的文件夹 `_other`，引入形式如下：

```css
@import '_other/'
```

到这里为止，额外增加行号和更改代码框字体的情况就完全完成了。重新进行网页渲染就可以看到更改的结果。

如果之前还没有使用过 highlightjs 来使代码高亮，那还需要做下后面的事情。

## 2 使用highlightjs

首先要禁用 hexo 自带的代码高亮设置，在默认的 `_config.yml` 文件中：

```yaml
highlight:
    enable: false
```

之后在主题的配置文件 `_config.volantis.yml` 文件中启用 highlightjs，并引入选择好的 CSS 样式：

```yaml
  # highlight.js
  highlightjs:
    enable: true
    js: https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js # 这一行调用高亮文件样式，可以换成可访问的 cdn
    css: https://cdn.jsdelivr.net/npm/highlight.js/styles/vs2015.css # 在这一行填写自己选择的样式链接
    # more: https://www.jsdelivr.com/package/npm/highlight.js?path=styles
```

## 3 目前存在问题（特性）

1. 该方法无法解决 folding 插件导致的 highlightjs 插件渲染代码不分行问题。
2. 行号相对窗口并非固定位置，当一行代码过长时，移动窗口的滚动条，行号会随代码一同移动。
3. 该方法只修改行间代码框字体，没有修改行内代码的字体。