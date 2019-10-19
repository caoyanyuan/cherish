#### Entities页面

1.  数组清空 全部全部全部 用splice
symbol 类型的 数组清空 ==[] 会没法真正清除，改用splice(0,0)

```

destory () {
    if ( this.ctl.viewer ) {
        this[ entites ].forEach( ( entity ) => {
            this.ctl.viewer.entities.remove( entity )
        } )
    }
    this[ entites ].splice(0,0)
    this[ states ].splice(0,0)
}

```


#####  渔船聚合撒点

1. 经纬度转换成 笛卡尔坐标（x, y, z）

```
_point.entity.znvPoint.xyz = Cesium.Cartesian3.fromDegrees(item.positions.lng, item.positions.lat, 10)


_point.entity.znvPoint 为自定义属性
```


2. 取第一个点为中心点，根据设置好的r, 找出圆内的点， 循环往复

Cesium.Cartesian3.distance(point1, point2) 求两点的距离

```
_setCollect(r, arr) {
    let oItem = arr[0],
        oArr = arr.slice(1, arr.length),
        ret = [],
        diotes = []

    oArr.map(item => {
        let distance = Cesium.Cartesian3.distance(oItem.entity.znvPoint.xyz, item.entity.znvPoint.xyz)

        //console.log(distance, r)
        if(distance < r) {
            diotes.push(item)
        }else{
            ret.push(item)
        }
    })

    this.collect.push({
        center: oItem,
        diotes
    })

    if(ret.length>0) {
        this._setCollect(r, ret)
    }
},

```

3. 描 聚合点

```
clustering() {
    if(!this.collect || this.collect.length == 0 ) {
        throw new Error('没有collect集合点')
    }

    this.collect.map(item => {
        if(item.diotes.length > 0) {
            item.diotes.map(diot => {
                diot.entity.show = false
            })

            item.center.entity.show = false

            this.clusterArr.push(new Cluster({
                position: item.center.entity.znvPoint.xyz,
                number: item.diotes.length+1,
                height: this.curHei
            }))
        }else{
            // 单独的entity要显示出来
            item.center.entity.show = true
        }

    })
}
```
