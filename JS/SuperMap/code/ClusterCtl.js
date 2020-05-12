import Cluster from "./GisCluster"
import CesiumCtl from '@map/Model/CesiumCtl'

// 控制聚合点的对象 实现聚合功能
export default class ClusterCtl {
    /**
     * @param {MapCtl} ctl 地图对象
     * @param {Array} shipPointList 渔船点数组
     * @param {Cluster} clusterType 聚合对象类型 TyphoonCluster/GisCluster
     *
     */
    constructor({ ctl = CesiumCtl, shipPointList = [], clusterType = GisCluster}) {
        Object.assign(this, {ctl, shipPointList, clusterType})

        if(this.shipPointList.length > 0) {
            this.viewer = this.ctl
            this.afterHeightChange = this.afterHeightChange.bind(this)
        }
    }

    init() {
        this.handleHeightChange()

        //第一次聚合
        this.afterHeightChange()
        this.showCluster()
    }

    //监听camera高度变化事件  进行聚合
    handleHeightChange() {
        this.curHei = null

        this.ctl.onHeightChange(this.afterHeightChange)
    }

    // 高度变化事件
    afterHeightChange() {
        try{
            //验证是否合法
            this.checkCtl()

            //1.设置聚合范围：半径，高度
            this.setRange()

            //防抖应用：存储上一次高度，如果计算出的高度 和上一次不同 才去聚合
            if( this.lastHeight != this.computeHeight) {
                this.lastHeight = this.computeHeight
                //2. 开始聚合
                this.getTogether()

                //3. 绘制聚合点
                this.drawDiot()
            }
            //console.log(this.radius, this.computeHeight, cameraHeight, times)
        }catch(e) {
            console.log('出错了', e)
        }
    }

    /**
     * >1000  以上的高度按照5000:200的比例来聚合
     * <=2000 不进行聚合显示
     * radius 聚合范围半径
     * computeHeight 做聚合的高度节点 用于节流
     */
    setRange() {
        let cameraHeight = this.ctl.cameraHeight

        if (cameraHeight <= 1000) {
            this.radius = 0
            this.computeHeight = 1000
        }else {
            let times = cameraHeight / 5000
            this.radius = times * 200
            this.computeHeight = times * 5000
        }
    }

   

    // 绘制聚合点
    

    setShipSize(centerEntity) {
        centerEntity._billboard._height._value = this.constructor.SHIP_HEIGHT * this.ratio
        centerEntity._billboard._width._value = this.constructor.SHIP_WIDTH * this.ratio
    }



    //验证ctl对象
    checkCtl() {
        if(!(this.ctl&&this.ctl.viewer && this.ctl.viewer.camera)){
            console.log(this.ctl, 'ctl出现问题')
            throw new Error()
        }
    }

    hideCluster() {
        Cluster.hide()

        this.ctl.remove(this.afterHeightChange)
    }

    showCluster() {
        Cluster.show()
    }

    destory() {
        this.ctl.remove(this.afterHeightChange)
        Cluster.resolve()
        Cluster.destory()
    }
}
