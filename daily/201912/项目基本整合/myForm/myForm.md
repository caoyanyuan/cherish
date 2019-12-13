### 新建编辑类组件

#### 验证规则

1. image 上传类

问题： input上传之后不会自动检测来去掉错误提示
解决： 自己watch这个属性
结果： 字段固定为‘image’
code:

```
lawAdd.vue
{ name: 'image', label: '文件：', type: 'image',  isHidden: true,  require: 1,
    uploadOptions: { fileTypes: 'pdf', enableUploadApi: false },
}

image(val) {
    if(val && val.length > 0) {
        this.validateField('image')
    }
}
```
