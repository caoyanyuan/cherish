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

0805-0811
1. 对于值是否传递的判断  不要用
```
  if(value)
```
排除不掉 传来 false 和 0 的时候
```
  if(!isNullOrUndefined(oValue))
```

2. 全局 局部刷新 巧用
```
<wrapper class="wrapper">
    <!-- 三级级页面 -->
    <keep-alive v-if="toggleRouterVisible">
        <router-view></router-view>
    </keep-alive>
</wrapper>

refreshRouter() {
  this.toggleRouterVisible = false
  setTimeout(() => {
      this.toggleRouterVisible = true
  })
},

```
