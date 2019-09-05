### 渔港 渔船监管

1.  视角中心坐标放在第一个点
```
this.ctl.scene.camera.setView({
    //将经度、纬度、高度的坐标转换为笛卡尔坐标
    destination: new Cesium.Cartesian3.fromDegrees(
        this[ points ][0], this[ points ][1], 1000),
    orientation: {
        heading : 0.0,
        pitch : -Cesium.Math.PI_OVER_TWO,
        roll : 0.0
    }
});
```

2.  点击地图其他地方， 关闭所有labels,点击到entity 显示当前label

```
this.ctl.click((e) => {
    let selectedEntity = this.ctl.viewer.selectedEntity
    this.labels.hide(e)

    if(selectedEntity) {
        let { index } = selectedEntity.bubblePoint
        if(index >= 0 ) {
            this.labels.showIndex(index)
        }

    }
})

```

3. 根据视角高度变化，设置走廊高度，并且重绘轨迹

```
this.handler = new Cesium.ScreenSpaceEventHandler( this.ctl.viewer.scene.canvas )

this.handler.setInputAction( () => {
    let cartographic = Cesium.Cartographic.fromCartesian( this.ctl.viewer.scene.camera.position );

    if(cartographic.height < 400 && this.corridorWidth != 1) {
        this.corridorWidth = 1
        let isNeedReRender = this[ _state ] == STOP

        if(!isNeedReRender) {
            this.stop()
            this.play()
        }
    }else if(cartographic.height > 400 && this.corridorWidth != 5){
        this.corridorWidth = 5
        let isNeedReRender = this[ _state ] == STOP

        if(!isNeedReRender) {
            this.stop()
            this.play()
        }
    }
}, Cesium.ScreenSpaceEventType.WHEEL );

```
