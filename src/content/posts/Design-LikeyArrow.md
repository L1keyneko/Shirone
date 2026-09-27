---
title: 「LikeyArrow」替换光标样式
published: 2022-04-24
description: 一款简约、透明、泛用的隐式可爱替换鼠标ฅ^. .^ฅ
image: https://site.lyrikp.art/article/design/LikeyArrow/Previewall.png
category: Design
tags: [UI]
permalink: Design/LikeyArrow
draft: true
---

![LikeyArrow](https://site.lyrikp.art/article/design/LikeyArrow/LikeyArrow.png)

一款「简约」「透明」「泛用」的隐式可爱替换鼠标ฅ^. .^ฅ 

Some English here but I forgot how to spell 'fanyongxing'

实际应用: <a href="https://lyrikp.art/">style-like</a> |<a href="https://kuuhaku.top/"> style-kuma</a>

## 更新日志

::: collapse accordion
- :+ 2022-04-24 V1.0 版本正式上线！

  大概是第一个基本可用版本

- 2022-04-23 Style Fix

  全部升格为 `.cur` 标准 windows 光标格式

- 2022-01-24 Style Add&Fix

  绘制了 `style-like` 和 `style-kuma` 的部分 `.cur` 格式

  修复了热点位置，强制样式格式大小 

- 2022-01-11 Style Fix

  去除 `style-like-link` 的背景光，其在Chrome以外的浏览器上透明度表现不好

- 2021-07-23 Format

  增加预览图

- 2021-07-14 Style Add

  新增样式 `style-like`

  新增样式 `style-kuma`

- 2021-07-13 Inital

  项目初始化
:::

## 咕咕计划

- [x] 基本网站可用样式 `.png`
- [x] Windows鼠标标准样式 `.cur`
- [ ] 标准化与压缩
- [ ] 更多风格……
- [ ] 动态加载样式
- [ ] Windows安装脚本 `.inf`

## 样式简介

LikeyArrow

A Simple/Limpid Cursor for Website

![LikeyArrowPreview](https://site.lyrikp.art/article/design/LikeyArrow/Previewall.png)

本来只是给自己的网站设计一个简单的光标，没想到投入了比想象中更为冗长的时间，索性开源给大家使用好了。

~~没准还能混个GitHub Star~~

到目前为止它只是差强人意，整体的体系也远称不上完整，且作为个人终端使用的光标样式仍有所欠缺。但因为自己的网站已经上线，而且给予该项目很大支持的 Kuuhaku 老师也在自己的网站上兴高采烈~~被我威胁~~地使用了我为他定制的名为 `LikeyArrow-style-kuma` 的光标，我还是决定在这里做个记录，以督促自己有一天能将她完善。

您能宽容地喜欢她就是再好不过的事情了w

## 快速使用

- [x] cdn 链接引用
- [x] `.cur` 格式下载后调用
- [ ] 
可以通过链接调用图片的形式修改网站鼠标样式：通过 cdn 生成的连接引入图片，添加进各种网站配置文件当中。

当前版本已经添加 `.cur` 标准 windows 光标格式，建议使用该格式以避免触发热点、大小、透明度等各种因浏览器版本不同而产生的问题。

已经舍弃了 `.png` 格式，如果一定要使用图片格式的话，请从每个样式的 /Preview/ 文件夹中下载需要使用的样式，再手动修改大小自行引入。

> **注:** `.png` 格式在不同浏览器、同浏览器的不同系统中会出现不透明度不识别错误，也会有点击点漂移的现象存在，请慎用。

> 测试通过 [`Hexo`](https://hexo.io/) 驱动 [`yun`](https://github.com/YunYouJun/hexo-theme-yun) 主题配置
> 
> 测试通过 [`Hexo`](https://hexo.io/) 驱动 [`Volantis`](https://github.com/volantis-x/hexo-theme-volantis) 主题配置

### cur 格式引用【推荐】

> jsdelivr 大寄特寄
> 因为一些大人的原因，原本用于分发静态资源的 jsdelivr 的 CDN 备案被吊销了，直接影响了国内对其的访问。
> 
> 因此使用该部分的引用方法要确保自己可以访问该网站，直接复制链接查看是否能下载就可以了。
> 
> 我添加了网盘形式的资源下载，可以将文件保存在本地后加入到网站中，或者设定到电脑内。

> **全部样式下载**
> 
> https://drive.noire.cc/s/j006SX 
> 
> 密码：:spoiler[LikeyArrow]

```yaml
# 默认示例
default: https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow@1.0/LikeyArrow-style-like/Default.cur

# https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow/风格/光标种类.cur
```

`.cur` 格式使用了标准 windows 光标样式大小，因此不再提供多种大小。

直接在浏览器输入链接可以下载 `.cur` 文件，手动添加进 windows 系统之后就可以用鼠标管理来自定义大小了。

### png 格式引用【已舍弃】

```yaml
# 默认示例
default: https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow@1.0/LikeyArrow/Size-normal/Default.png

# https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow/LikeyArrow/光标大小/光标种类.png
```

**大小参数**
- [x] `Size-light`
- [x] `Size-normal`
- [x] `Size-bold`


**种类参数**
- [x] 默认: `Default.png`
- [x] 点击链接: `Link.png`
- [x] 输入光标: `IBeam.png 
- [x] 手写: `Handwriting.png`
- [x] 移动: `Resize.png`
- [x] 上下拉伸: `Resize1.png`
- [x] 左右拉伸: `Resize2.png`
- [x] 左下右上: `Resize3.png`
- [x] 左上右下: `Resize4.png`
- [x] 不可用: `Unavailable.png`
- [x] 放大: `Zoomin.png`
- [x] 缩小: `Zoomout.png`

## 风格样式

### 默认Default

![](https://site.lyrikp.art/article/design/LikeyArrow/default_preview.jpg)

[点击预览](https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow@1.0/LikeyArrow-default/Preview/)

**default-style下载**

https://drive.noire.cc/s/1aa0iE 密码：:spoiler[styledefault]

基础的风格样式，LikeyArrow 的版型设计基底。

「简洁」「泛用」「半透明」是设计 LikeyArrow 时我一直想遵循的原则，在默认的风格中这三点会更加突出。

淡蓝色的传送链接、深红色的警告禁用，以及一个在光标旁默默探出头的猫咪剪影。在保持印象中的“光标”样式的同时，想做出一些像是「好奇」与「探索」的意味，因此放大和缩小变成了猫咪放大镜的样子。

了解世界，然后仍热爱世界。

至于为什么设计基底是猫咪......小猫咪并不想回答这个问题⌯'ㅅ'⌯

```html
https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow@1.0/LikeyArrow-style-like/光标种类.cur
```

**光标种类参数**
- [x] 默认: `Default.cur`
- [x] 点击链接: `Link.cur`
- [x] 不可用: `Unavailable.cur`
- [x] 输入光标: `IBeam.cur`
- [x] 放大: `Zoomin.cur`
- [x] 缩小: `Zoomout.cur`
- [x] 移动: `Resize.cur`
- [x] 上下拉伸: `Resize1.png`
- [x] 左右拉伸: `Resize2.png`
- [x] 左下右上: `Resize3.png`
- [x] 左上右下: `Resize4.png`
- [x] 手写: `Handwriting.cur`

<font color=#524D4D>▆▆▆▆</font> - Matterhorn - **<font color=#524D4D>马特洪峰</font>**

<font color=#F35353>▆▆▆▆</font> - Hot Coral - **<font color=#F35353>红珊瑚</font>**

<font color=#86CEF2>▆▆▆▆</font> - Grapefruit - **<font color=#86CEF2>泳池砖</font>**

[样式及使用](https://github.com/Lyrikp/cursor-LikeyArrow@1.0/tree/master/LikeyArrow-default)

### like

![](https://site.lyrikp.art/article/design/LikeyArrow/like_preview.jpg)

[点击预览](https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow@1.0/LikeyArrow-style-like/Preview/)

**like 样式直接下载**
https://drive.noire.cc/s/7dd6Tg 密码：:spoiler[stylelike]

本网站使用的 cursor，纯粹是自己喜欢的风格和颜色。

没想好起什么名字......总不能就叫梨可吧？我只是一只小猫咪，小猫咪是不会变成鼠标的。

该版本特别随便，因为是自用的，会根据自己的心情改变风格和样式，使用的话请做好心理准备。

或者如果会使用版本控制的话，抓紧时间保存中意的版本就好w

```html
https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow@1,0/LikeyArrow-style-like/光标种类.cur
```

**光标种类参数**
- [x]  默认: `Default.cur`
- [x] 点击链接: `Link.cur`
- [x] 不可用: `Unavailable.cur`
- [x] 输入光标: `IBeam.cur`
- [x] 放大: `Zoomin.cur`
- [x] 缩小: `Zoomout.cur`
- [x] 移动: `Resize.cur`
- [x] 上下拉伸: `Resize1.png`
- [x] 左右拉伸: `Resize2.png`
- [x] 左下右上: `Resize3.png`
- [x] 左上右下: `Resize4.png`
- [x] 手写: `Handwriting.cur`
- [x] 移动2: `Grab.cur`

<font color=#FE8181>▆▆▆▆</font> - Forbidden Fruit - **<font color=#FE8181>禁果</font>**

<font color=#FC5556>▆▆▆▆</font> - Grapefruit - **<font color=#FC5556>西柚</font>**


### 熊熊kuma

![](https://site.lyrikp.art/article/design/LikeyArrow/kuma_preview.jpg)

<center>Style-Kuma!</center>
<center>为Kuuhaku“倾情”设计(再改爷就是狗)<font size=1>(汪)</font></center>

简介已经被kuma吃掉了，KUMAKUMA┗|｀O′|┛ KUMA~~！

> 阴影不透明度设置成60，祝你门门都及格 —— Like  

> 那我tm谢谢你 —— Kuuhaku

<center>
  <span>示例：</span>
  <a href="https://kuuhaku.top/">熊之记事本</a> [style-kuma]
</center>

**kuma-style下载**
https://drive.noire.cc/s/NZZrtX 密码：:spoiler[stylekuma]

一款熊熊风格的光标！探头探脑的小动物是谁呢？是熊熊！凶猛又可爱的熊熊！

记住，熊熊的发音是一个三声一个二声，跟我念——熊↘↗熊↗！

喜欢凶猛动物的不妨一试，装饰部分换成了可爱的熊，就算是禁止进入也会有一只熊伸出熊掌来提醒你......不要舔，上面没有蜂蜜的。

```html
https://cdn.jsdelivr.net/gh/Lyrikp/cursor-LikeyArrow@1.0/LikeyArrow-style-kuma/光标种类.cur
```

**光标种类参数**
- [x] 默认: `Default.cur`
- [x] 点击链接: `Link.cur`
- [x] 不可用: `Unavailable.cur`
- [x] 输入光标: `IBeam.cur`
- [x] 移动: `Resize.cur`
- [x] 上下拉伸: `Resize1.png`
- [x] 左右拉伸: `Resize2.png`
- [x] 左下右上: `Resize3.png`
- [x] 左上右下: `Resize4.png`

<font color=#2C2C2C>▆▆▆▆</font> - Marshland - **<font color=#2C2C2C size=4>沼泽地</font>**  

<font color=#819ff7>▆▆▆▆</font> - Periwinkle Blue - **<font color=#819ff7 size=4>蔓长春花</font>**

<font color=#d9e2fc>▆▆▆▆</font> - Cloudless - **<font color=#d9e2fc size=4>晴朗</font>**  

[样式及使用](https://github.com/Lyrikp/cursor-LikeyArrow@1.0/tree/master/LikeyArrow-style-kuma)

## 设计相关

原型使用 [Adobe Photoshop](https://www.adobe.com/products/photoshop.html?promoid=RBS7NL7F&mv=other) 绘制

> 制作了预览图和用于压缩的基本素材

压缩工具: [Microangelo Toolset](http://www.microangelo.us/)

> 转换成为标准光标格式并进行压缩

- Size: 
  - light: 25×25 px
  - normal: 30×30 px
  - bold: 45×45 px
  - 功能键 +5px/10px
- 透明度规范: 90/80/74/50 %
- 线条规范: 9/7/4 px
- color: **<font color=#2C2C2C>#2c2c2c</font>**  **<font color=#ffffff>#ffffff </font>**  **<font color=#fc5555>#fc5555</font>**  **<font color=#f8a4a4>#f8a4a4</font>**
