---
title: Hexo_1 - 关于建站，应当知道的基础知识若干
published: 2020-08-25
description: Hexo搭建网站的前期准备——从GitHub建立仓库到配置本地搭建环境。
category: 知识簇
tags:
  - Hexo
permalink: knowledge-cluster/Hexo/Hexo-1
series: hexo-init
seriesOrder: 1
---

## 前言

男人的梦想，除了太空之中控制巨大的人形机械对着外星的异形挥舞巨大的冷兵器以外，就是建立一个属于自己的家。

啊，我说的是网站。

这个笔记系列记录了基于 `Hexo` 搭建一个属于自己的 Blog 流程，在经历了知识鸿沟压制摧残的我会尽量将这个流程说得简单易懂，并且加上每一个步骤的原理解释，以免此流程变成了一个用于炫技的装逼文章。

> 似乎……也没什么好炫的。

本文的编译环境为 `MacOS` ，但我会尽量写上更加通俗易懂的步骤原理，这样即便你是 `Windows` 或者 `linux` 系统也依然能够跟着流程想明白自己应该执行的步骤。

> 适当百度或者询问 AI 也会帮助记忆这个搭建流程。

::: info
首先感谢 [Kuuhaku](https://kuuhaku.top) 对本文的测试与 debug，这里面提到的几乎所有易错点都是他发现的。

~~我也没想到居然会有人踩这么多坑~~
:::

**では、ゲームを始めましょう**

## 网站的基本理论

**本地仓库**，**域名**，**云服务器**是必须知道的 3 个概念。

网站和本身也是一种文件的展示和访问，和访达（资源管理器）中的层级目录逻辑是一样的。

**本地仓库**就是我们制作这个网站文件夹的地方，里面会包含页面、样式文件和资源，页面展示给访问的用户，样式文件用来渲染，有时会调用其中的资源进行展示或执行。

**域名**则是访问网站的路径，访问者会根据你的“大域名”找到要访问的那个云服务器，然后通过后面和资源路径一样的 `文件名/文件名/文件名` 来找到这个云服务器中不同的页面。

**云服务器**是给大家看的那台电脑——你不可能将自己的电脑始终运行供给大家浏览，因此需要一台全年无休的云服务器时刻开机随时访问。构建出的网页内容会按照路径存放在云服务器中，访问者通过域名查找到自己要看的页面。

打一个简陋的比方：你要给心上人寄送一个<u>巧克力</u>（网页），要先在<u>家里</u>（本地仓库）亲手做好，然后去<u>快递点</u>（云端仓库）打包存放准备送出，强大的<u>物流系统</u>（云服务器）会负责巧克力的保存和寄送，当快递到达那边的自提点时，心上人凭借发出来的<u>取货码</u>（域名）就能找到你送给她的礼物了。

### 域名

域名和随机生成的取货码还是有一定的区别，它可能更像是门牌号。找到这个门牌号后，就能在这个门里面找到所有归属于这个门牌号主人的资源。

域名和网址有一定的区别，我们从网址 URL 的构成说明，这样比较便于理解其他三个概念。

本界面最开始的链接地址如下：

**<mark style="background: #FFB86CA6;">https</mark>://<mark style="background: #FF5582A6;">lyrikp.art</mark><mark style="background: #FFF3A3A6;">/categories/note/</mark><mark style="background: #ABF7F7A6;">从零开始建站.html</mark>**

- <mark style="background: #FFB86CA6;">https</mark> : 超文本传输协议，是浏览器和云服务器之间数据传输规则指明。目前大多数网站都会使用 HTTPS 加密协议，可以验证网站身份，防止在传输过程中被篡改。HTTP 协议则是明文传输的。
- <mark style="background: #FF5582A6;">lyrikp.art</mark> : 域名本身，绑定在云服务器上，通过在这行名称可以访问到某个云服务器。是一个大的门牌号。
- <mark style="background: #FFF3A3A6;">/categories/note/</mark> : 文件索引地址，资源管理器中相当常见的格式，意义也是一样的。
- <mark style="background: #ABF7F7A6;">从零开始建站.html</mark> : 访问网站页面相当于打开了地址中的 html 文件。一般来说，`.html` 这个后缀名不会被显示出来。

现在网址的构成就已经很明晰了，它实际上就是一个上传到云端服务器的你的：

```bash
D:/日语学习资料/三上悠亚/与小动物在野外嬉戏.mp4
```

> 域名需要购买和每年续费，毕竟这也相当于一个展示身份的商标。

### 本地仓库

Hexo 是一个静态网站架构模板，它没有后台，所有的页面资源最终会被渲染成为一个 `.html` 网页文件以供大家浏览。

因此，Hexo 需要一个本地仓库，里面会包含你自己编写的文章、样式文件和资源，以及 Hexo 本身的代码——这些代码会将上面的资源自动处理成最终需要放到云服务器中的样子，保存到特定的文件夹中，这个步骤叫做构建。

本地仓库中的每个文件夹都有其作用，例如 Hexo 框架的文章存储在 `/source/_post/`，插件存储在 `/node_modules/` 中。这些都是构建所需要的素材，修改这些就能改变网站最终展示的样子。具体文件夹的作用细节会在后面的章节描述。

### 云服务器

本地仓库的构建文件最终需要上传到云服务器上，云服务器会按照设定的规则和权限，通过网址展示给每一个访问了与该云服务器挂载的域名的用户。

很多知名的互联网公司会提供这样的云服务器，像是阿里云、腾讯云、华为云等等。它们的服务更稳定、更安全，配置更复杂，也绝对不是免费的。

> 毕竟相当于租了一台不需要自己维护的电脑。

::: details Github Pages 免费静态网站托管服务 + 域名
`github` 给初学者们提供了免费的快餐，我们可以使用他家的 `GitHub Pages` 服务而不必考虑需要开销与审核的域名及云服务器~~从而节省一大笔时间在搭建网站摸鱼的时候刷刷bilibili~~。

在搭建流程中，这种方式多了一个将本地仓库上传到 GitHub 远端仓库的步骤。`GitHub Pages` 可以自动构建并发布这个仓库的内容，并且给予一个 `https://GitHub用户名.github.io` 的域名以提供访问。

故此， `本地仓库` + `GitHub云端仓库` + `GitHub Pages` 是推荐初次尝试搭建时的免费方法，在确定了自建博客和网页的乐趣之后再购买域名租用服务器也不迟嘛。

> GitHub 在国内存在 DNS 污染，域名为 [xxx.github.io] 的页面可能需要玄学或者魔法访问。

> 免费的馈赠总是存在代价。

:::

::: tip[Hexo的本地构建]
Hexo 框架可以进行本地构建预览，不经过网络、域名、云服务器等就可以随时在浏览器上查看效果，相当于在浏览器上访问本地文件夹。

在正式部署前，推荐先使用本地构建这种更为快速的方法来确认效果。
:::

## 前期环境准备

现在进入 GitHub Pages 建站步骤，先做个热身运动，把建站需要的所有素材都找齐吧。

需要准备&下载的东西：

- [ ] 安装 `Git` - 分布式版本控制系统
- [ ] 新建 GitHub 仓库
- [ ] 安装 `Node.js` - `JavaScript` 运行环境
- [ ] 安装 Hexo 框架


### 安装 Git

Git 是一个分布式版本控制系统，简单来说，它用于记录一个仓库的“历史状态”，让你随时可以回退到上一个版本，并在各个版本之间进行检查修改了哪些文件。

同时，Git 也用来连接远端仓库，方便多人进行协作开发。我们需要它与 GitHub 仓库进行交互，并进行网站迭代更新的管理。

安装方法十分简单，~~去百度~~点[这里](https://git-scm.com/)，从官网上根据系统版本进行安装就好啦。

> 最好不要更改默认设置位置，一来避免在系统调用的时候因为环境配置会出现各种神奇的问题，二来它也不大。

在终端中运行如下代码，显示 Git 版本确认已经正确安装：

```bash
git --version
```

### Github 远端仓库配置

GitHub 仓库并非建站的必要步骤，但是免费的 `GitHub Pages` 托管服务依赖它，因此这里我们需要先新建一个云端仓库。

::: tip[跳过提示]
会使用 GitHub 请跳过本段，直接新建一个名称为 `github用户名.github.io` 的公开仓库即可。
:::

**Github 相关流程：**

注册 → 建立仓库 → 配置 SSH keys → Done！

#### 先注册 Github

[Github官网](https://github.com)~~，不会有人连注册都不会吧不会吧不会吧。~~

::: info
QQ 邮箱有概率注册失败，建议准备一个另外的邮箱备用。
:::

我们跳过 GitHub 前期所有的新手引导，直接进入到建立仓库。

#### 建立网站仓库

进入主页，单击处于右上角的头像，在下拉的菜单栏里面选择 `Repositories` 进入到仓库：

![](https://site.lyrikp.art/article/knowledge-cluster/Hexo/hexo1-github-respositories.webp "仓库入口")

新建一个仓库：

![](https://site.lyrikp.art/article/knowledge-cluster/Hexo/hexo1-github-set-up-new-respository.webp "新建仓库")

对仓库命名，这里的仓库名也是通过 Github Pages 服务产生域名，建议和 GitHub 名称保持一致，命名为 `GitHub用户名（小写）.github.io`：

![](https://site.lyrikp.art/article/knowledge-cluster/Hexo/hexo1-github-set-up-new-respository.webp "仓库命名")

> [!IMPORTANT]
> 个人博客的仓库名称建议命名为 `GitHub用户名.github.io`，这是 GitHub 分配的默认域名。
> 
> 如果使用其他名称，则会得到 `GitHub用户名.github.io/仓库名/` 这个网址，这种形式通常为具体项目的介绍页面或文档。
> 
> GitHub Pages 也支持绑定自己的域名，但是这样就需要额外为域名掏钱了。

#### 配置 `SSH keys`

::: details `SSH keys` 是什么？
简单来说，GitHub 分配给你的服务器主机是公寓楼中的家，你的本地主机想要进入家门，需要一把钥匙来开门。

`SSH` 是这个门锁，而这个钥匙就是 `SSH keys`。

我们需要 Secure Shell(SSH) 协议来允许两台电脑（服务器和本地）进行安全的连接来处理数据交换，它是一个网络协议，用来保证数据的**保密性**和**完整性**。
:::

我们需要配置 `SSH keys` 来保证本机电脑和github服务器的连接。

先获取本地的 SSH 公钥，打开`终端`/`cmd`：

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.mail "你的GitHub注册邮箱"
ssh-keygen -t rsa -C "你的Github注册邮箱"  
```

然后回车几次到配置完成。

::: info
回车中会出现几行英文，大致意思是要输入加密串，这个东西可以不用配置，也不建议初学者配置。
:::

这个操作生成了 `.ssh/id_rsa.pub` 和 `.ssh/id_rsa` 文件，分别是**公钥**和**私钥**，我们需要其中的公钥来配置 GitHub 连接。

简单来说，公钥是锁，私钥是钥匙。在 GitHub 上面配置公钥这把锁，然后本机访问时，会自动使用本地私钥进行权限验证。

`.ssh` 文件通常是**默认被隐藏**的，除了显示隐藏文件的方法，还有以下方法可以打开它：

```bash
cd .ssh/        # 将操作空间移到.ssh/这个文件夹中
open .          # 打开当前的操作空间
code id_rsa.pub # 使用 VScode 打开文件

# code 命令是 VScode 配置过的，如果你使用的是其他编辑器，使用对应的指令即可
# 也可以找到这个文件，把它直接拖进编辑器
```

复制打开文件中的所有内容，获取到本机的公钥，接下来将其配置到 GitHub 上。

在 GitHub 主页点击头像下拉栏进入 `settings` - `SSH and GPG keys` 分页，点击绿色的 <mark style="background: #BBFABBA6;">New SSH key</mark> 按键，新建一个远端 SSH key：

![](https://site.lyrikp.art/article/knowledge-cluster/Hexo/hexo1-github-ssh.webp)

将刚刚复制的公钥粘贴进 `Key` 栏，`title` 是该 `SSH key` 的名称，自己认得就好，其余保持默认，确认后点击 <mark style="background: #BBFABBA6;">Add SSH key</mark> 完成配置。

养成好习惯，在本地顺手运行一下代码检测配置是否生效：

```bash
ssh -T git@GitHub.com
```

认得英文就好啦。

### 安装 `node.js`

`node.js` 是 `JavaScript` 的运行环境，网站需要该环境进行编译。

::: details 如果你是 `Windows` 系统
[Node.js官网](https://nodejs.org/zh-cn/) 下载安装环境，跳过 `nvm` 安装的步骤，简单粗暴，节省头发。

想要学习熟悉一下指令集相关的操作，增加对 `cmd` 的理解的话，也可以根据下面的步骤手动配置。
:::

::: details 如果你是 `MacOS` 系统
使用官网安装包后很可能会出现 <mark style="background: #FF5582A6;">npm权限不足</mark> 的报错，这时候最好通过下述 `nvm` 的方式再次安装一遍。
:::

> [!WARNING]
> `node.js` 这边会涉及到很多很多很多坑，包括也不限于 `npm`、`nvm` 等等关于权限与网络情况的报错，所以请详细阅读步骤。

#### ① 安装`nvm`

::: details Windows 使用安装包
点击[nvm-win-github](https://github.com/coreybutler/nvm-windows/releases)下载安装，安装在默认路径
:::

::: details MacOS 使用命令行安装
使用curl进行安装：

```bash
curl -o- https://raw.githubsercontent.com/nvm-sh/nvm/v0.34.0/install.sh
```

> curl预装在 `MacOS` 当中，若没有，则在[curl官网](https://curl.se/download.html)下载

:::

安装完成后习惯性查看版本确认安装：

```bash
command -v nvm
```

#### ② 用 `nvm` 安装 `node.js`

```bash
nvm install node
```

安装完成后习惯性确认安装：

```bash
node -v # 检查node的版本
```

到了这一步，我们完成了 `node.js` 的安装，并且拥有了 `npm` 这个下载器。

::: warning 该问题多发于windows系统当中
安装路径中存在空格，可能会导致 cmd 不识别路径。

此时在 nvm 文件夹下查找 `setting.txt` 文本文件，查看第一行 `root` 中的路径，将形如 `C:/Program Files` 更改为 `C:/Progra~1`，其余不变。
:::

### 安装 `Hexo`

使用 `npm` 命令来安装 `Hexo`：

```bash
npm install -g hexo-cli
```

安装完成后习惯性确认安装：

```bash
hexo v # 检查Hexo版本
```

::: details `npm` 下载速度慢的解决方法
`npm` 进行安装时一般会调用国外的安装地址，经常会出现超时错误。可以在下载前将 `npm` 的下载地址更改为国内的镜像源，如下为阿里云镜像源的修改方法（终端中直接运行）：

```bash
npm config set registry https://registry.npmmirror.com
```

:::

这些代码的意思很好理解，看英文就懂啦。

## 结束语

至此，使用`Hexo`搭建Blog的所有前期准备已经完成，你现在应该完成了如下操作：

- [x] 明白网站URL的组成
- [x] 在 `github` 有了一个用于建站的仓库，并适配了它和自己计算机的 `SSH keys`
- [x] 配置了 `node.js` 环境
- [x] 安装好了 `Hexo`

Hexo的官方网站在[这里](https://hexo.io/zh-cn/)，如果以上有什么不太明白的，可以直接在官网上找手册看。

~~不过不一定比我写的详细w~~

好啦，接下来就是使用 `Hexo` 初始化自己的本地仓库并和云端链接的步骤了。在这下一步完成之后，我们就能预览发布的第一篇文章啦。

移步到[下一章](../知识簇-Hexo-2-第一篇文章)。
