#### 超图中的坐标系


1. 获取视野屏幕上下边界

方式一、 鼠标拾取（camera.pickEllipsoid） 屏幕左上角和右下角的两个点，转换成 对应的 经纬度坐标

```
/** */
function getCenterPosition(ctl = CesiumCtl) {
    let viewer = ctl.viewer

    let left_top = this.getPosition(0, 0, viewer)
    let bottom_right = this.getPosition(viewer.canvas.clientWidth, viewer.canvas.clientHeight, viewer)

    var bounds = {
        tl: left_top,
        br: bottom_right
    }
    return bounds

}

// 获取屏幕点的任意坐标x,y即可转成对应的经纬度
function getPosition(x, y, viewer) {
    var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(x,y));
    var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
    var lng = curPosition.longitude * 180 / Math.PI;
    var lat = curPosition.latitude * 180 / Math.PI;
    return {
        lng: lng,
        lat: lat,
    };
}

```

方式二:  camera.computeViewRectangle直接可以拿到视野的东西南北的四个方向值，在三维的时候，获取的点和方式一一样可以达到效果
但是在二维中计算会返回undefined

```
function getViewBorder(ctl = CesiumCtl) {
    var rectangle = ctl.viewer.camera.computeViewRectangle();

    var west =rectangle.west / Math.PI * 180;
    var north = rectangle.north / Math.PI * 180;
    var east = rectangle.east / Math.PI * 180;
    var south = rectangle.south / Math.PI * 180;

    var bounds = {
        southwest: {
            lng: west,
            lat: south
        },
        northeast: {
            lng: east,
            lat: north
        }
    }
    //console.log(bounds)
    return bounds;

}
```
