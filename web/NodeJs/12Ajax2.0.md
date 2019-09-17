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
