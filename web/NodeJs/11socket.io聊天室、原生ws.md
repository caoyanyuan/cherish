#### 十一、socket.io聊天室、原生Websocket

##### 1. 简易聊天室

1. 客户端

cdn： https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js
```
let sock = io.connect('ws://localhost:8080/')

sock.on('connect', function() {
    console.log('已连接')
})
sock.on('disconnect', function() {
    console.log('已断开')
})

//发送
sock.emit('msg', oTxt.value)
//接收
sock.on('msg', str => {})
```

2. 服务端

```
let httpServer = http.createServer()
httpServer.listen(8080)

let wsServer = io.listen(httpServer)

wsServer.on('connection', sock => {
    sock.on('disconnect', () => {})

    sock.on('msg', str => { })
    sock.emit('msg', str => { })
})
```
