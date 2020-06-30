export default class Pick extends Sensor {
    static type = 'Pick'

    constructor ( ) {
        super()

        //初始化小蓝点
        this._initEntity()
        //指定click和hover的this对象为本身
        this.onClick = this.onClick.bind( this )
        this.hover = this.hover.bind( this )
    }

    _initEntity() {
        //小蓝点实体配置信息
        this.entityOpts = {
            point: {
                pixelSize: 10,
                color: Cesium.Color.CORNFLOWERBLUE,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(200.0, 1000000.0)
            }
        }
        //存储小蓝点
        this.entities = new Entites( {
            type: 'pick',
            detail: '坐标拾取'
        } )
    }

    //注册坐标取点
    attach() {
        this.ctl.click( this.onClick )
        this.ctl.hover( this.hover )
        return this
    }

    //注销坐标取点
    detach() {
        this.remove()
        this.ctl.remove( this.onClick )
        this.ctl.remove( this.hover )
        return this
    }

    /**
     * 依赖于地图点击事件
     * @param { Event } event 地图点击事件对象
     */
    onClick ( event ) {
        // 删除之前添加的点
        this.remove()
        // 获取坐标
        let c3 = Point.toC3( event.position, this.ctl );

        if(c3) {
            let point = Point.c3ToFd( c3, this.ctl )
            
            this.addEntity(point)
            // 点击后需要 触发调用 回调函数
            let pickEvent = new PickEvent( {
                point,
                c3,
                ctl: this.ctl
            } )
            this.trigger( pickEvent )
        }
    }

    //依赖地图的鼠标划过事件  event {startPosition: a, endPosition: a}
    hover(event) {
        this.removeEntity()

        let c3 = Point.toC3( event.endPosition, this.ctl );
        if(c3) {
            let point = Point.c3ToFd( c3, this.ctl )
            this.addEntity(point)
        }
    }

    // 在点击位置添加 entity 点
    addEntity(point) {
        let entity = new Cesium.Entity( {
            ...this.entityOpts,
            znvPoint: this,
            position : Cesium.Cartesian3.fromDegrees( point.lng, point.lat, 100 ),
        } )
        this.entities.add( entity )
    }

    //移除之前操作添加的 entity 点
    removeEntity () {
        this.entities.destory()
        return this
    }
}
