---
title: 腾讯云COS对象存储图床的跨域问题
published: 2022-05-27
description: CDN分发后COS对象存储出现跨域问题的解决方法。
category: 知识簇
tags: [腾讯云]
permalink: knowledge-cluster/tencent-cloud/CORS-Error-Fixed
---

## 一键解析DNS的坑

腾讯云的【内容分发网络CDN】-【域名管理】功能中存在一个“一键DNS解析”的操作，用来快速将网站的域名实现CDN分发以加快访问速度，但实际操作上会出现很多坑，操作之后往往会出现域名无法访问、跨域等等问题。

“一键DNS解析”的操作逻辑是：
1. 若存在对该域名源站的 CNAME 解析，则暂停该解析，增加一个新的 CNAME 解析以增加 CDN 分发功能；
2. 若不存在，直接增加解析。

先搭好站点，后来再考虑访问速度的同学在这一步时一定是存在一个原本的解析的（没有解析无法将公网 ip 和域名联系在一起），因此会触发第一个逻辑，即暂停解析后再新增一个解析。

然而，这个“一键DNS解析”的操作不知道是因为脚本问题还是后台管理的疏漏，两个步骤执行得异常缓慢，需要至少 5min 才能完成暂停解析的操作，而第二步增加解析的操作在我的 4 次尝试中从来没有完成过。

因此，使用该操作的同学最好是手动在 DNSPod 中暂停和添加 @ 的 CNAME 解析，具体的节点地址在“一键DNS解析”的地方复制就可以了。

::: info
如果断在第二步前，会导致域名无法访问；全完成后，就可能出现跨域问题。
:::

虽然在一系列操作后，我搞好了 CDN，但在查看网站后发现，所有使用 COS 对象存储作为图床的图片全部无法加载，我只能一直看着迷迭香被戳来戳去~~，好像也不错~~。

使用 F12 查看网站的控制台，可以看到出现了跨域 CORS 问题报错：

![](https://site.lyrikp.art/article/knowledge-cluster/tencent-cloud/COS-CORS-error.webp "CORS跨域问题报错")

接下来就讲讲怎么解决这个问题吧。

## 什么是跨域问题？

跨域问题的出现并非是因为后端拦截或者防火墙什么的，而是浏览器本身的防护策略。

域实际上就是域名命名的东西，不过比直觉上要狭窄一些——同源的域需要协议(https/http)、主机(baidu.com/google.com)和端口号(lyrikp:8000.art/lyrikp:80.art)都相同。

浏览器的同源策略会阻止域中的 JavaScript 脚本和另一个域进行交互（请求是 ajax 类型）。实际上，图片和 CSS 的请求本身应该是可以正常交互，然而因为对 COS 对象存储和网站本身部署的服务器这两个服务器的调用，也顺带出现了 ajax 请求，因而产生了跨域问题，被浏览器阻止而无法访问图片。

| 请求界面URL                   | 被请求界面URL                      | 是否同源 | 备注                 |
| :------------------------ | :---------------------------- | :--: | :----------------- |
| https://example.com/miao/ | https://example.com/miaomiao/ |  同域  | 协议、主机、端口号均相同       |
| http://example.com        | https://example.com           | 不同域  | 协议不同（http/https）   |
| https://baidu.com         | https://google.com            | 不同域  | 主机不同（baidu/google） |
| https://a.example.com     | https://b.example.com         | 不同域  | 子域名不同（a/b）         |



## CORS 跨域问题解决

解决跨域问题的方法有很多，前端和后端都有手段去规避或者注明某个信息被授权跨域访问。

CORS 解决方案是比较根本的方法，它不需要前端做任何事情，只是通过在后端服务器中添加一个响应头，来注明该信息可以被授权访问。

在腾讯云 COS 对象存储中就更方便了，只需要设置存储桶权限和 CDN 分发网络的 HTTP 标头即可解决大多数问题。

### COS 中存储桶权限设置

【对象存储】-【存储桶列表】-【选中存储桶】-【安全管理】-【跨域访问CORS设置】。

![](https://site.lyrikp.art/article/knowledge-cluster/tencent-cloud/COS-CORS-rules-1.webp "跨域访问 CORS 设置")

点击添加规则。

![](https://site.lyrikp.art/article/knowledge-cluster/tencent-cloud/COS-CORS-rules-2.webp "具体规则设置页面")

- `来源Origin` - 添加请求跨域访问的域名，即自己的域名。
- `操作Methods` - 建议勾选除去 `DELETE` 的全部，以确保合理的请求都可以被允许。
- `超时MAX-Age` - 可以随便设置，影响不大。
- 其他设置保持默认即可。

设置完成后点击保存。

### CDN 分发网络设置

> [!TIP]
> 未使用 CDN 加速可以忽略这个步骤，如果上述设置后仍无法访问，再尝试这个步骤。

【内容分发网络CDN】-【域名管理】-【具体域名】-【高级配置】-【HTTP响应头配置】。

![](https://site.lyrikp.art/article/knowledge-cluster/tencent-cloud/COS-CORS-HTTP-head-setting-1.webp "打开 HTTP 响应头配置")

打开配置状态后点击【新增规则】：

![](https://site.lyrikp.art/article/knowledge-cluster/tencent-cloud/COS-CORS-HTTP-head-setting-2.webp "HTTP 响应头具体规则")

- `头部操作` 选择“设置”；
- `头部规则` 选择“Access-Control-Allow-Origin”；
- `头部取值` 输入自己的域名，和允许调用的域名。
	- 使用 `*` 会允许所有取值，注意防止盗链。

跨域问题解决，图片可以正常访问了。



![](https://site.lyrikp.art/layout/loading1.GIF)

:spoiler[骗你的，这张 GIF 并没有被拦截]
