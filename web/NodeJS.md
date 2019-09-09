#### 一. nodejs做服务器与其他语言有什么不同

优点：
    1. nodejs的对象、语法和javascript一模一样，利于前端人员开发
    2. 性能好  比php快
缺点
    1. java有丰富的库支持
用处
    1.小型后台系统、中间层
    2.工具
        测试，构建（grunt， gulp， webpack）


#### 二. 重定向和转发

重定向： 给浏览器下命令，让浏览器去请求另一个地址====地址变了
转发：  在服务器内部，把请求转交给另一个模块处理，对客户端是不可见的====地址不变

qs： node中间层的好处: 性能好，安全（多一层防护），方便

#### 三. 各大模块

1. http
2. 断言-assert  断定必须xxx
3. 二进制-Buffer  File system
> png格式图片不能使用toString方法进行写入(res.write),
> res.write(str) str只能传入字符串或者buffer，传入其他会报错。比如res.write(404)报错
4. c++ addons   c语言模块，写核心
5. crypto  签名（加密）算法  md5/sha1
6. 多进程   Child Process/Cluster/Process
7. Os    操作系统
8. Path  处理路径相关
```
Path.parse() 解析      '\Github\cherish\wx\signByCanvas\my.wxml'
dirname     -->   \Github\cherish\wx\signByCanvas
basename    -->   my
extname     -->  .wxml
```
10. Events  事件队列  数据到达事件、文件下载事件
```
const event = require('event').EventEmitter
let ev = new event()
//监听，接收
ev.on('msg', (a, b, c) => {
    console.log('我被执行了')
    console.log(a, b, c)
})
//派发，发送
ev.emit('msg', 1,2,3)
```

11. QueryString 解析？&里面的参数
    URL: 解析全地址
12. 网络:
    - TCP 稳定
    - UDP 快    datastream
13. DNS： 解析域名成IP
    Domain
    全球有统一的dns域名解析服务器，是一个庞大的数据库，比如百度

14. 流操作：  连续数据---（视频流，网络流，文件流，图片流）
15. SSL/TLS:  加密

#### 四、答疑

1. 非阻塞IO： 前一个IO没完事，后一个IO继续跑   java，node
2. 双层md5： md5(md5(str)+'特定str')
3. 进程和线程：
    程序比作工厂，进程就是车间，线程是工人
    进程拥有独立的执行空间，存储，同一个进程内的所有线程共享一套空间，代码


多进程：成本高（慢）安全（进程间隔离好）通信麻烦  代码简单      php node
多线程：成本低（快）线程（可能会一起死掉）通信简单  代码复杂    java c

4. 一个大数据包为啥切成一堆小包
    1. 少占用网速，方便其他用网
    2. 容错性高，错了一个小包没关系


post 最大可以1g  post接收数据一堆包

#### 八 NodeJS文件解析、流操作、gz压缩

表单的三种post
- text/plain    用得很少，纯文字
- multipart/form-data   专门用来上传文件内容
- application   默认  url编码方式


##### Buffer操作
1. 对buffer数据进行的操作:
- 查找  indexOf()
- 截取  slice(start, end)  不包含end
- 


```
Buffer.prototype.split = Buffer.prototype.split || function(b) {
    let arr = [],
        cur = 0,
        n = 0;
    while((n=this.indexOf(b, cur))!=-1){
        arr.push(this.slice(cur, n))
        cur = b + b.length
    }
    
    arr.push(this.slice(cur));
    return arr
}
```




fs.readFile先把所有的数据存入内存，然后回调
1. 极其占用内存
2. 资源利用不充分
