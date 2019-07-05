### pdfmake

> 通过js生成pdf文件，可以实现导出，打印预览功能

1. 使用code

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
