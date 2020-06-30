1.  配置多种打包方式
    npm run build:test  测试服务器
    npm run build:innet 内网服务器

具体配置：
1.  配置package.json
```
    "build:innet": "set NODE_ZNV='innet' && node build/build.js"
```
ps: set NODE_ZNV='innet' 这个参数可以通过process.env.NODE_ZNV拿到

2. 配置 build.js 写个log
```
let znv_node = process.env.NODE_ZNV
const isInnet = /innet/.test( znv_node )

if ( /test/.test( znv_node ) ) {
  console.log( `打包到测试服务器 202` )
} else if( isInnet ) {
  console.log( `打包到内网服务器 ` )
} else {
  console.log( `打包到调试服务器 154` )
}

```
3. 在webpack.prod.conf.js中 配置 env 对象 来放置一些关于打包环境不同的配置参数
>注意： NODE_ZNV  区分内网还是外网  NODE_ENV 区分生产还是开发
```
let env = {}

let znv_node = process.env.NODE_ZNV

if ( /test/.test( znv_node ) ) {
  env = require( '../config/prod.test.env' )
} else if ( /innet/.test( znv_node ) ) {
  env = require( '../config/innet.env' )
}

//自定义一些参数给process.env，以供 其他js调用
new webpack.DefinePlugin({
      'process.env': env,
}),

innet.env：
    'use strict'
    module.exports = {
      NODE_ENV: '"production"',
      NODE_ZNV: '"innet"',
      IP: "'内网IP'",
    }


```
