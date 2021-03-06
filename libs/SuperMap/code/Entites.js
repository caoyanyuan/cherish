/**
 * @file 二次封装 entity 类
 */

import MapCtl from '@map/Model/Class/MapCtl'
import CesiumCtl from './CesiumCtl'
import TyphoonCtl from '@map/Model/TyphoonCtl'
import Emitter from '../Event/Emitter'
import { EntityClick } from './Class/EntitesClickEvent'
import { Point } from '../Event/Coordinate/CoordinateEvent'
import Vue from 'vue'

const _onClick = Symbol( 'click' )
const entites = Symbol( 'entites' )
const states = Symbol( 'states' )
// const _visible = Symbol( 'visible' )
const _visible = '_visible' // Symbol 不能访问, 不能响应.
const IDS = Symbol( 'ids' )

// let scaleW = ( window.innerWidth / 1920 ) || .5
// let scaleH = ( window.innerHeight / 1080 ) || .5
// let _w = 56 * scaleW
// let _h = 63 * scaleH

export default class Entites {

    static billboardOpt = {
        horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance : new Cesium.NearFarScalar(2000000, 1.0, 6900000, 0.1)
    }

    static labelOpt = {
        fillColor: new Cesium.Color( 1, 1, 1, 1 ),
        show: true,
        // backgroundColor: new Cesium.Color( 7, 32, 69, 0.5 ),
        horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
        verticalOrigin : Cesium.VerticalOrigin.CENTER,
        font: '20px arail',
        disableDepthTestDistance: Number.POSITIVE_INFINITY
    }

    static pointOpt = {
        horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
    }

    static scaleW = ( window.innerWidth / 1920 ) || .5
    static scaleH = ( window.innerHeight / 1080 ) || .5

    /**
     * @constructor
     * @param { Object } 选项
     * @param { String } detail 描述
     * @param { Boolean } unVisible 是否不显示
     * @param { String } ctl  地图控制器 类型 可传null-> CesiumCtl TyphoonCtl -> TyphoonCtl, 主要需要的是 viwer
     * @param { Object } opt 选项
     */
    constructor ( { detail = '', unVisible, ctl, opt } = {} ) {
        Object.assign( this, {
            detail, ctl, opt
        } )

        // entity 集合
        this[ entites ] = []

        // 历史状态
        this[ states ] = []

        this[ IDS ] = []

        // 显示状态
        // this[ _visible ] = false
        Vue.set( this, _visible, false )

        // 事情触发器
        this.$emitter = new Emitter()

        if ( unVisible ) {
            this.hide()
        }
        this[ _onClick ] = this[ _onClick ].bind( this )

        // 处理图片
        if ( opt && opt.billboardOpt && opt.billboardOpt.image ) {
            opt.billboardOpt.image = Vue.filter( 'getSrc' )( opt.billboardOpt.image )
        }

        // 注册点击事件
        this.init( ctl, opt && opt.isDynamicEntities )
    }

    get visible () {
        return this[ _visible ]
    }

    get length () {
        return this[ entites ].length
    }

    push ( ...rest ) {
        this[ entites ].push( ...rest )
    }

    /**
     * 初始化, 不调用默认就是大屏的地图
     * FIXED:
     * @description 由于地图缓存的原因, 来回切换地图的时候, 会有异步的错误
     *      没有很好的解决方法, 使用不同的地图就创建不同的 entity 来使用.
     * @param { [, MapCtl ] } ctl 地图控制器类型
     * isDynamicEntities   是否是动态添加的点。如果是。必须重新注册事件，当需要点击事件的时候，运用在动态监管
     */
    init ( ctl, isDynamicEntities ) {

        if ( ctl == null ) {
            ctl = CesiumCtl
            // this.ctl = CesiumCtl
        }
        if( ctl == 'TyphoonCtl' ) {
            ctl = TyphoonCtl
        }
        // console.log(this.ctl, this.detail, 1, this.ctl === ctl, !isDynamicEntities)

        /** this.ctl === ctl 避免重复注册
         * 当传入ctl时候 运用在台风管理 -->不妥
         * 解决办法 ctl 改为传入地图类型。而不是地图对象 */

        if ( this.ctl === ctl && !isDynamicEntities) { //
            return
        }

        if ( !( ctl instanceof MapCtl ) ) {
            return console.warn( '<<< init error. ctl not MapCtl.', this.detail, ctl )
        } else {
            this.ctl = ctl
        }

        this.ctl.promise.then( () => {
            // this.ctl.remove( this[ _onClick ] )
            //console.log('init:',this.ctl.viewer.entities)
            //console.log(this.ctl, this.detail, 2)
            this.ctl.click( this[ _onClick ] )
        } )
    }

    forEach ( fn ) {
        return this[ entites ].forEach( fn )
    }

    some ( fn ) {
        return this[ entites ].some( fn )
    }

    every ( fn ) {
        return this[ entites ].every( fn )
    }

    /**
     * 视角跳转到 entity 上
     * @param { Cesuim.Entity } entity
     * HeadingPitchRange: 设定高度
     */
    zoomTo ( entity ) {
        this.ctl.viewer.zoomTo( entity, new Cesium.HeadingPitchRange(0.0, -0.5,2000) ).then((isSuccess) => {
            if(isSuccess) {
                this.ctl.afterHeightChanged()
            }else{
                console.log(isSuccess, 'zoomTo失败了')
            }

        })
    }

    /**
     * 添加 entity 点
     * @param { Cesium.Entity } ens Entity 对象
     */
    add ( en, isUnVisible ) {
        this[ entites ].push( en )
        this[ IDS ].push( en.id )
        this[ _visible ] = !isUnVisible

        if ( this[ _visible ] ) {
           this.ctl.promise.then( () => {
                this.ctl.viewer.entities.add( en )
            } )
        }
        return this
    }

    /**
     * entity 点的点击事件
     * @param { Function } fn 事件回调
     */
    click ( fn ) {
        this.$emitter.on( EntityClick.type, fn )
    }

    /**
     * 判断是否拥有 entity 点
     * @param { Cesium.Entity } entity
     * @return { Boolean }
     */
    has ( entity ) {
        return this[ entites ].includes( entity )
    }

    /**
     * 获取 Entity
     * @param { Number } index 索引
     */
    get ( index ) {
        return this[ entites ][ index ]
    }

    /**
     * 删除 entity 点
     * @param { Cesium.Entity } entity
     */
    remove ( entity ) {
        let index = this[ entites ].findIndex( ( item ) => item === entity )
        if ( this.ctl.viewer ) {
            this.ctl.viewer.entities.remove( entity )
        }
        console.log(this.ctl.viewer.entities.length)
        return this[ entites ].splice( index, 1 )
    }

    /**
     * 显示所有 entity 点
     * TODO: 可以使用 entity.show 方法提高性能
     * @param { Boolean } isUnCache 是否记录这次状态变化
     * @param { Function } fn 是否显示的回调
     */
    show ( isUnCache, fn ) {
        let fnFlag, isFn = typeof fn === 'function'

        let promise = this.ctl.promise.then( () => {
            this[ entites ].forEach( ( entity ) => {
                fnFlag = true
                isFn && ( fnFlag = fn( entity ) )
                try {
                    ( fnFlag ) && this.ctl.viewer.entities.add( entity )
                } catch ( error ) {
                    // this.zoomTo( entity )
                }
            } )
        } )
        if ( !isUnCache ) {
            this[ _visible ] = true
        }
        this[ states ].push( true )
        return promise
    }

    /**
     * 隐藏所有 entity 点
     */
    hide ( isUnCache ) {
        let promise = this.ctl.promise.then( () => {
            this[ entites ].forEach( ( entity ) => {
                this.ctl.viewer.entities.remove( entity )
            } )
        } )
        if ( !isUnCache ) {
            this[ _visible ] = false
        }
        this[ states ].push( false )
        return promise
    }

    /**
     * 返回上次操作的显示状态
     */
    pre () {
        this[ states ].pop()
        let state = this[ states ].pop()

        if ( state == null ) {
            return
        }

        if ( state === true /* && this.visible !== true */ ) {
            this.show()
        } else if ( state === false/*  && this.visible !== false */ ) {
            this.hide()
        }
        return this
    }

    /**
     * 显示隐藏
     */
    turn () {
        if ( this.visible ) {
            this.hide()
        } else {
            this.show()
        }
        return this
    }

    /**
     * 清除所有的 entity 点
     * symbol 类型的 数组清空 ==[] 会没法真正清除，改用splice(0,.length)
     */
    destory () {
        if ( this.ctl.viewer ) {
            this[ entites ].forEach( ( entity ) => {
                this.ctl.viewer.entities.contains( entity )
                this.ctl.viewer.entities.remove( entity )
            } )
        }
        //console.log(this.ctl.viewer.entities.values.length, this.detail)
        this[ entites ].splice(0)
        this[ states ].splice(0)
        this[ IDS ].splice(0)

    }

    /**
     * 注册地图的 Entites 点击事件
     * @param { Cesium.Event } event
     */
    [ _onClick ] ( event ) {
        var _entity = this.ctl.viewer.selectedEntity;
        // console.log( '_entity:', _entity, this.has( _entity ) )

        if( this.has( _entity ) ) {

            let c3 = Point.toC3( event.position, this.ctl )
            let point = {};

            // 这里的if排除转换坐标失败的数据  解决报错 cartesian is required.
            //  disableDepthTestDistance 会导致 c3转换不成功
            if(c3) {
                point = Point.c3ToFd( c3 )
            }
            this.$emitter.trigger( new EntityClick( {
                entity: _entity,
                nativeEvent: event,
                lng: point.lng,
                lat: point.lat,
                height: point.height,
            } ) )
        }

    }
}
