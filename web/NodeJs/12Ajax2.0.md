#####  十二、Ajax2.0: FormData与cors

###### 1. 与1.0的区别
- FormData对象：控制提交数据、文件上传
- cors跨域: ajax1.0不会发送origin

> ajax 1.1要做跨域，前台设置自定义请求头

FormData
.set
.append
.delete
.get

###### 2. cors

后台不存在跨域， 跨域是浏览器的限制

cors设置：
S: Access-Control-Allow-Origin: 域名||*
    验证headers['origin'] 认不认识
C: 不需要做任何事情

###### 3. 拖拽上传
事件：
    ondragenter:
    ondragleave：
    ondragover:  悬停
    ondrop:   松手

##### 4. 初次使用express

```
let server = express()
server.listen(8080)

server.use(body.urlencoded({extended:false})) //解析 x-www-form-urlencoded

//中间件
let multerObj = multer({dest: '../upload'})
server.use(multerObj.any())

//处理请求
server.post('/api', (req, res) => {
    res.send('ok');

    console.log(req.body)
    console.log(req.files)
} )

server.use(express.static('../www'))  //解析静态文件

```

process对象：


##### 5. 上传进度

1. process对象：
- upload处理函数要放在send前面
- 服务器要能处理OPTIONS请求

> options 是用来配置服务器的
通用服务器---都会处理
NodeJS服务器--低版本的use会处理，高版本的post也可以处理

```
oAjax.upload.onprogress = (ev) => {
    ev.loaded  完成
    ev.total    总共

    ev.loaded/ev.total   0~1
}
```

> 加了upload可能会出现 多了一次OPTIONS请求

- oAjax.onprogress          响应信息的进度 （下载）
- oAjax.upload.onprogress   请求信息的进度  （上传）

> 浏览器加载页面也有progress对象


2. 事件绑定用addEventListener('progress', fn) 和 onprogress的区别

事件是由DOM来定义的，，事件版本有DOM1,2,3,HTML5对应的是DOM3
官方要求： 所有DOM3的事件都需要绑定（addEventListener）
也就是说： 所有HTML5的事件事件都得绑定
