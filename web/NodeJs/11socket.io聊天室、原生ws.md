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

##### 2.原生ws

1. net包是TCP层，也就是原生的websocket

```
let server = net.createServer(sock =>{
    sock.once('data', data => {
        console.log('hand shake start')
        let str = data.toString(),
            lines = str.split('\r\n')
        console.log(str)
    })
})
```
> 第一次接收的还是HTTP数据
str 打印的内容如下：
```
GET / HTTP/1.1  //废弃不要的
Host: localhost:8080
Connection: Upgrade    //协议升级
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Origin: file://
Sec-WebSocket-Version: 13   //ws版本只有13
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: io=OqGTsEf2goaVrWLKAAAB
Sec-WebSocket-Key: opF49Fl+VcA7BfyfUG00JA==   //ws专门的密钥
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

```

2. 协议升级

    - 舍弃第一行（GET / HTTP/1.1）和最后两行 （空白的）
    - 切开data得到headers
    - 根据nodeJs固定的加密算法 处理 sec-websocket-key 密钥，
    - 将处理过的密钥write给C，告诉C我知道你是ws，所以我们要协议升级了 - 这一步S和C互认身份了

> 完成这一步的响应信息
```
Status Code: 101 Switiching Protocols
Connection: Upgrade
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: XAY8Vv8po8WyP9IDfFpf6Q==
Sec-WebSocket-Version: 13
Upgrade: websocket
```

> 密钥算法
```
let key = headers['sec-websocket-key'];
let mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let hash = crypto.createHash('sha1');
hash.update(key+mask);
let key2 = hash.digest('base64');
sock.write(`HTTP/1.1 101 Switiching Protocols\r\nUpgrade: websocket\r\nConnection:Upgrade\r\nSec-WebSocket-Accept:${key2}\r\n\r\n`)

```

> 未完待续 
