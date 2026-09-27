---
title: 迁移Hexo本地工程到新设备后的若干问题检查
published: 2024-03-17
description: 物理搬家之后也别忘了虚拟搬家。
category: 知识簇
tags:
  - Hexo
permalink: knowledge-cluster/Hexo/migrate-and-redeploy
---

## 前言

已经部署到云服务器上发布的网站，简单地从一台电脑将文件夹复制到另一台电脑上是无法直接 `hexo g -d` 再次部署的，会遇到各种各样的错误，比如最常见的缺少权限。

因此，在更换新设备，对本地数据进行迁移的时候，要重新对网站进行一次部署设置——毕竟门锁换了，还是要重新配一把钥匙的。

> ……钥匙换了，要重新配一个门锁。

## 1 迁移文件夹和必要依赖

总之复制文件夹是第一步，这里需要解决复制过后产生的各种各样的问题。

> [!TIP]
> 从 MacOS 转到其他操作系统时，需要注意是否有多余的 `.DS_Store` 文件。这是 Mac 的 spotlight 聚焦搜索使用的索引文件，对其他 OS 没有任何用处。

工程迁移后，先重新安装 `hexo`、`npm`、`Node.js`、`Git` 等，配置好本地的环境。

环境准备在[这里](https://lyrikp.art/knowledge-cluster/Hexo/Hexo-1/#%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)~

这次的重新安装环境，顺带也能升级一波。

### 执行 hexo 脚本无权限

依赖环境配置完成后，先尝试运行 `hexo s`，可能会出现如下报错：

```bash
hexo : 无法加载文件             \npm\hexo.ps1, 因为在此系统上禁止运行脚本...
```

这是 Win11 的 PowerShell 执行策略默认设置的问题，hexo 脚本 `hexo.ps1` 被禁止执行了。执行如下命令检查策略定义：

```bash
Get-ExecutionPolicy -List
```

输出的执行策略定义可能并非为 `Restricted` ，而是 `Undefined`，对于 windows 来说，`Undefined` 默认等同于 `Restricted`。

此时需要查找【设置】-【开发者选项】-【PowerShell】，将该设置下的“允许本地 PowerShell 脚本在未签名的情况下运行”打开。

![](https://site.lyrikp.art/article/knowledge-cluster/Hexo/hexo-migrate-solve-hexo-script-access-denied.webp "允许本地PowerShell脚本在未签名时运行")

再次输入命令检查策略定义，`CurrentUser` 一行被修改为 `RemoteSigned`，确认设置成功。

之后 hexo 脚本就可以正常运行了。

## 2 重新连接云服务器

云服务器也存在门锁（SSH 加密登录协议），需要有钥匙（SSH Keys）才能进入。与物理钥匙有些不同的是，SSH 是在门锁中加入认证，让锁去适配钥匙。每台设备都有自己独特的钥匙，添加进云服务器中的 SSH 认证中就可以开门进入了。

即个人设备产生公钥和私钥，将公钥（门锁）交给云服务器，用私钥（钥匙）进行登录。

> 这是刷脸解锁吧。

### 本地准备 SSH

更换设备当然要重新 SSH，这个步骤在第一次部署的时候想必也都经历过。

> 也都忘了，毕竟刷脸解锁是自动的，换脸之后大伙也总是想不起来去更新认证……嘶，什么职业需要频繁换脸啊？

本地终端上输入：

```bash
ssh-keygen -t rsa -C "邮箱地址"
```

在提示的路径下找到 `id_rsa.pub` 公钥文件，复制其中的内容备用。

> [!TIP]
> 生成一对 SSH 密钥，用于认证登录。
> 
> `-t rsa` 指定密钥类型为 RSA，`-C “邮箱地址”` 给密钥添加标签以方便识别密钥信息，邮箱地址不参与加密。

### 云服务器设置

#### 云服务器 Git 配置

在云服务器中登录，弹出指令执行的窗口，输入指令获取 root 权限：

```bash
sudo su root
```

将其中的 Git 升个级吧：

```bash
yum install git
```

重新检查下 Git 账户权限：

```bash
adduser git            # 迁移不需创建 git 账户，第一次部署的时候已经有了
chmod 740 /etc/sudoers # 修改改文件的编辑权限
vim /etc/sudoers       # 使用 vim 进行编辑
```

::: tip[chmod 后的权限数字]
1 - 执行权限；2 - 写权限；4 - 读权限。7 = 1 + 2 + 4，为最高权限。

三位权限码为 Linux 的权限操作粒度：顺序为 owner、group，other。740 即 owner 可读可写可执行、group 可读、other 无操作权限。
:::

在 vim 中，键盘输入 `i` 进入 INSERT 编辑模式，使用方向键移动光标，确认如下行存在：

```vim
root    ALL=(ALL)    ALL
git     ALL=(ALL)    ALL
```

键盘点击 <kbd>esc</kbd> 进入指令模式，输入 `:wq` 保存退出。

建议编辑结束后将权限改回 400，防止之后可能的误修改。

#### 云服务器 SSH 配置

切换为 Git 用户后进行 SSH 的配置：

```bash
su git                      # 切换为 Git 用户
mkdir ~/.ssh                # 迁移工程应该存在该文件夹
vim ~/.ssh/authorized_keys  # 编辑公钥存储
```

在打开的文件中复制本地的 `id_rsa.pub` 公钥，保存退出。

::: details Vim 的使用方法不会还要在这里帮你复习吧？
![168](https://site.lyrikp.art/meme/zako.webp)
:::

重新对 SSH 赋予权限，`authorized_keys` 赋予 600，`.ssh` 文件夹赋予 700。

之后在本地测试下 Git 是否正常连接：

```bash
ssh -v git@服务器公网ip
```

出现欢迎的信息就说明配置成功，本地机器可以正常连接上云服务器啦。

## 后语

配置到这里，迁移的工作就已经基本完成了——什么，你问我为什么不是完全完成？快去工程文件夹里面执行 `hexo g -d` 看看到底能不能正常运行啊!

因为我的整体迁移工作比较顺利，不正常运行的话~~我也没办法~~请告知我，我好看一看解决方法加点容错上去，希望能帮到更多的人。

按照这个文档去部署新的云服务器会缺少 Git Hook、宝塔面板、安装 Nginx、配置本地推送地址这些步骤，所以它只是一个迁移的参考，照着部署时不太行的……请检查其他的文档吧~

因为我饿了，觅食去了。

by.饥肠辘辘的L1keyneko_ฅ^._.^ฅ