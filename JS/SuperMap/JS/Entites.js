// Symbol属性 不能被访问
const _onClick = Symbol( 'click' )
const entites = Symbol( 'entites' )
const states = Symbol( 'states' )
const IDS = Symbol( 'ids' )

export default class Entites {
    /** ctl: 地图基础类： 提供了点击地图的方法， 在cesium里面点击地图上，会派发地图点击事件，如果点在entity上，就会把entity参数传过来  */
    constructor ( ctl ) {
        this.ctl = ctl

        // 存储所有通过Entites创建的 实体
        this[ entites ] = []

        // 事情触发器：对事件进行管理 可以手动派发监听事件 类似jquery里面的 $.Callback
        this.$emitter = new Emitter()

        //初始化点击
        this[ _onClick ] = this[ _onClick ].bind( this )
        this.ctl.promise.then( () => {
            this.ctl.click( this[ _onClick ] )
        } )
    }

    /**
     * 注册地图的 Entites 点击事件
     * @param { Cesium.Event } event
     */
    [ _onClick ] ( event ) {
        var _entity = this.ctl.viewer.selectedEntity;

        if( this.has( _entity ) ) {
            //坐标转换 => {lng,lat} 
            let c3 = Point.toC3( event.position, this.ctl ),
                point = Point.c3ToFd( c3 ),
                entityInfo = {
                    entity: _entity,
                    nativeEvent: event,
                    lng: point.lng,
                    lat: point.lat,
                    height: point.height,
                }
            this.$emitter.trigger('entity:click',  entityInfo )
        }
    }

    /**
     * entity 实体点的点击事件 
     * @param { Function } fn 事件回调
     */
    click ( fn ) {
        this.$emitter.on('entity:click', fn )
    }
   
    /**
     * 添加 entity 点
     * @param { Cesium.Entity } en Entity 对象
     */
    add ( en ) {
        this[ entites ].push( en )

        this.ctl.viewer.entities.add( en )
        return this
    }
    
    /**
     * 判断是否拥有 entity 点
     * @param { Cesium.Entity } entity
     * @return { Boolean }
     */
    has ( entity ) {
        return this[ entites ].includes( entity )
    }
}
