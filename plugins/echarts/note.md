### 实现echart图表上传

- 理论： 可以用canvas截图
- 实现： echarts提供了方法DOM.getDataURL(opts),opts有type，pixelRatio， backgroundColor等配置
- 需求： 实现多个图表的截图上传，进出港的进港统计，出港统计，进出港折线图统计

code：
```
DOM.
// 多个echart图片导出,并上传拿到“图片id”，返回到进出港页面做导出图表
async function getPdf() {
    await getUploadUrl({name: 'in', DOM: inChart})
    await getUploadUrl({name: 'out', DOM: outChart})
    await getUploadUrl({name: 'line', DOM: this.lineChart})

    return this.screenshot
}

async function getUploadUrl({name, DOM}) {

    let opts = {
        type:"png",
        pixelRatio: 2, //放大倍数
        backgroundColor: '#0c223d'
    }

    let url = DOM.getDataURL(opts);

    let instance = new BlobImg({dataUrl: url})
    await instance.upload().then(data => {
        /**imgId,url */
        this.screenshot[name] = data[0].imgId
    })
}

```
