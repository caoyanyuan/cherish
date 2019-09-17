##### 十三、 upload和FileReader

##### 1. 上传进度

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
也就是说： 所有HTML5的事件事件都得绑定、

##### 2. FileReader

使用 File 或 Blob 对象指定要读取的文件或数据，可以用来做本地预览

- readAsArrayBuffer    ArrayBuffer
- readAsDataURL        base64格式
- readAsText           文本

> base64: 可以把二进制数据表现成字符串

只要能出现地址的地方，都能用base64
base64可以应用在一个小图标 -- 优化网络性能
缺点：
    1. 维护麻烦
    2. base64编码会把文件体积变大

```
var reader = new FileReader();
//将文件读取为arrayBuffer
//reader.readAsArrayBuffer(file);
//reader.onload = function(){
//  console.log(reader.result);
//}


/*reader.readAsBinaryString(file);
reader.onload = function(){
    console.log(reader.result);
}
*/
//用于图片显示不需要传入后台，reader.result的结果是base64编码数据，直接放入img的src中即可
reader.readAsDataURL(file);
reader.onload = function(){
    console.log(reader.result);
}

```
