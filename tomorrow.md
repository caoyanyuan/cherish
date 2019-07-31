before:

1.注册事件 旋转，飞行等
2.绘制多边形	抽象类的概念
3.echarts 表格导出
4.关键词： 事件机制
5.遗留问题： 实现取出一个文件夹里的所有静态文件


0718-0721
1. 修改进出港、地图
2. 换电脑node-sass安装出错  需要安装python解决
    - 渔船信息~重点关注渔船tab页
3. 进出港： 取echarts图片导出pdf，上传多张凭证
4. 进出港-add: 数据字段全改，
5. 消息发布富文本， 小程序签名研究

0722-0728
1.  进出港报告全面测一下
    -   新建时候清空内容 / 详情undefined情况 / 删除二次弹框 / 数据联动

    进出港报告上传附件
    - 重点关注渔船tab页
    - 消息发布选择船员流程
2.  进出港报告
    - 下一步 与标题栏目 联动 ~不做，只做确认的验证
	- 复制时候不复制时间
	- 报告时间： 现在及之前
		进港时间： 不限制
	编辑情况下： 进港报告和与船名  文本显示
	作业区域  子表
	渔具数量编辑不能输入


0729-0804
1.  配置多种打包方式
    npm run build:test  测试服务器
    npm run build:innet 内网服务器

具体配置：
1.  配置package.json
```
    "build:innet": "set NODE_ZNV='innet' && node build/build.js"
```
ps: set NODE_ZNV='innet' 这个参数可以通过process.env.NODE_ZNV拿到

2. 配置 build.js 写个提示
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
3. webpack.prod.conf 配置 env 对象
```
let env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

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
      IP: "'http://192.168.59.182:8090'",
    }


```
