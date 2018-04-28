# JarVps

一个强大的云 VPS 管理器，支持自动同步 VPS 信息，可以作为个人跳板机使用。

> 名字由来，JarVps 并不是 `Jar` + `Vps`，而是 `贾维斯(Jarvis)` + `Vps`。就像是一个功能强大的人工助理，帮你管理 Vps 相关的事情。

## 初衷



## Feature

- 支持 阿里云/腾讯云 机器同步
- 一个私人跳板机

## 使用

通过 `npm` 可以很简单的进行安装：

```bash
npm install jarvps -g
```

之后会安装 `jarvps` 命令，接下来我们需要添加账号信息

```bash
jarvps account add aliyun --accessKey xxxx --accessSecret xxx
```

然后通过 `jarvps account ls` 查看是否添加成功

```
service  config
-------  ----------------------------------------------
aliyun   {"accessKey":"xxxxx","accessSecret":"xxxxx"}
```

当账号添加完成之后，需要同步机器信息，运行 `jarvps vps fetch`。同步成功之后，通过 `jarvps vps ls` 查看机器列表。

```
id                      service  hostname               publicIp         cpu  memory  status   index
----------------------  -------  ---------------------  ---------------  ---  ------  -------  -----
xxxxxxxxxxxxxxxxxxxxxx  aliyun   xxxxxxxxxxxxxxx        xxx.xx.xxx.xx    1    2048    Running  0
```

这说明获取成功。

之后可以通过 `jarvps` 直接进入跳板机系统，选择好之后就会自动进行 ssh 连接。

## 帮助文档

```
jarvps -h

Commands:
  jarvps account  manage account
  jarvps          enter jump server                                 [default]
  jarvps vps      manage vps

Options:
  --version   Show version number                                      [boolean]
  --config    config path              [default: "/Users/xgheaven/.jarvps.yaml"]
  -h, --help  Show help                                                [boolean]
```

## 贡献

如果你发现了问题，请及时通过 issue 告诉我
