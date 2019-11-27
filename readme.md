## egg 项目示例
[egg官方文档](https://eggjs.org/zh-cn/intro/index.html)
## 示例内容
- 返回html模板
- 使用ajax 轮训配合egg restful 接口实现小游戏
- 使用socket.io实现p2p chat
- 使用socket.io实现小游戏

## 目录结构
```
.
├── app 
│   ├── controller // 存放所有的html渲染和restful接口
│   │   ├── game // 游戏控制目录
│   │   │   ├── drink.js // 此文件编写小游戏restful接口
│   │   │   └── home.js // 此文件渲染小游戏前端模板
│   │   └── home.js // 此文件渲染p2p前端模板
│   ├── extend
│   │   └── helper.js // 提供socket返回信息结构化转换拓展
│   ├── io // socket.io接口目录
│   │   ├── controller 
│   │   │   ├── chat.js // p2p socket接口
│   │   │   └── game
│   │   │       └── drink.js // 小游戏socket接口
│   │   └── middleware // socket 中间件，需要在config.default.js中配置使用
│   │       ├── auth.js // socket 进入房间退出房间中间件
│   │       └── packet.js // 作用于每一个数据包（每一条消息）；在生产环境中，通常用于对消息做预处理，又或者是对加密消息的解密等操作
│   ├── middleware // 接口中间件
│   │   ├── drink.js // 小游戏中间件
│   │   └── error_handler.js // 错误处理中间件
│   ├── router.js // 路由文件
│   └── view
│       ├── drink.html // 小游戏
│       ├── home.html // p2p chat
│       └── loading_heart.html // 加载界面
├── app.js // 初始化调用
├── config // 配置文件
│   ├── config.default.js // 默认配置文件
│   └── plugin.js // 插件
├── package.json /
├── package-lock.json
├── readme.md
├── tests // 为了解js使用的测试文件
│   ├── drink.py
│   └── test.js
.
```
## 运行
[需要提前在本地安装redis](https://redis.io/)
```
$ npm install
$ npm run dev
请求路径：
    浏览器打开标签1: http://127.0.0.1:7001/drink?unionid=a&room=demo
    浏览器打开标签2: http://127.0.0.1:7001/drink?unionid=b&room=demo
    浏览器打开标签2: http://127.0.0.1:7001/drink?unionid=d&room=demo
```

## 使用
#### p2p
请求路径为`/`
请求成功后打开命令行，用下边的命令发送消息
```
socket.emit('exchange', {
  target: 'Dkn3UXSu8_jHvKBmAAHW',
  payload: {
    msg : 'test',
  },
});
```
#### 小游戏 restful
请求路径`/api/game/drink` 未完成，但展示了restful的用法

#### 小游戏 websocket
请求路径`/drink`

## 注意
在对restful请求参数校验时使用的validate的参数需要参考[传送门](https://github.com/node-modules/parameter)

## 部署
```
$ cd baseDir
$ npm install --production
$ tar -zcvf ../release.tgz .
```