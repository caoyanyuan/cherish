### pdfmake

> 通过js生成pdf文件，可以实现导出，打印预览功能

##### 1 使用code

```
let pdfData = {
    content: [
        "进港报告",
        table: {
            body: [
                ['word','word','word','word'],
                [ {text:'word',colSpan:2},'','',{text:'word',rowSpan:3}],
                [{text:'word',colSpan:2,rowSpan:2},'','word',''],
                ['','','word',''],
            ]
        }
    ]
}
//pdf打印
pdfMake.createPdf(dd).print();
//pdf下载
pdfMake.createPdf(dd).download();

```

##### 2 引入自定义字体

vfs_fonts.js就是用于嵌入生成的PDF中的字体，默认是Roboto，中文会乱码，只能显示英文

步骤
1. 在github clone pdfmake代码
```
git clone https://github.com/bpampuch/pdfmake
```
2. 将字体文件放在examples/fonts 目录下，可以通过 C:\Windows\Fonts 拿到电脑安装的字体文件，不过中文字体文件很大（10M）
3. 运行gulp buildFonts以创建新的build/vfs_fonts.js
 此命令会将examples/fonts 都生成到vfs_fonts.js，所有不需要的字体可以删除。

> ps vfs_fonts.js在vue中使用需要把 this.pdfmake 改成 pdfmake

自定义字体 参考 github文档： https://pdfmake.github.io/docs/fonts/custom-fonts-client-side/
demo链接： https://blog.csdn.net/idea_however/article/details/53402496