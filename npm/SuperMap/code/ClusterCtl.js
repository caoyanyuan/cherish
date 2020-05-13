import GisCluster from "./GisCluster"
import CesiumCtl from './node_modules/@map/Model/CesiumCtl'

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
                this.getTogether(this.shipPointList)

                //3. 绘制聚合点
                this.drawDiot()
            }
          
        }catch(e) {
            console.log('出错了', e)
        }
    }

    setRange() {
        /**
             * >2000 以上的高度按照baseHeight的比例来聚合
             * <=2000 this.clusterType.heightes配置的数值来聚合
             * radius 聚合范围半径
             * computeHeight 做聚合的高度节点 用于节流
             */
        let cameraHeight = this.ctl.cameraHeight
        let { height, r } = this.clusterType.baseHeight

        if (cameraHeight <= 1000) {
            let curHeight = this.clusterType.heightes.find(item => cameraHeight > item.height)
            this.radius = curHeight.r
            this.computeHeight = curHeight.height
        }
        else {
            let times = cameraHeight / height
            this.radius = times * r
            this.computeHeight = times * height
        }

        
    }

    // 开始聚合
    getTogether() {
        //1. 计算出每一个点和其他所有点之间的距离形成数组 allCollect { center: 中心点, diotes: 子点：和中心点距离<=radius的点 }
        this.allCollect = this.getAllCollect()
        //2. 根据子点的长度排序
        this.allCollect.sort((a, b) => b.diotes.length - a.diotes.length)

        //3. 按顺序把聚合点数组allCollect放入collect
        //排在前面的聚合点先要聚合的 依次往下去重
        this.collect = []
        //已经聚合过得id 
        this.collectedIds = []
        this.setColloct(this.allCollect)
    }

    // 以一个点为圆心。找出r半径内的点，返回新的数组
    __setCollect(arr) {

        if(!(arr && arr.length > 0)) {
            console.log(arr, '渔船数组数据错误')
            return
        }
        let oldItem = arr[0],
            oldArr = arr.slice(1, arr.length),
            ret = [],
            diotes = [];

        oldArr.map(item => {
            let distance = Cesium.Cartesian3.distance(oldItem.entity.znvPoint.xyz, item.entity.znvPoint.xyz)

            if(distance < this.radius) {
                diotes.push(item)
            }else{
                ret.push(item)
            }
        })

        this.collect.push({
            center: oldItem,
            diotes
        })

        if(ret.length>0) {
            this.setCollect(ret)
        }
    }

    getAllCollect() {
        let ret = []   
        //shipPointList：所有的渔船对象 里面有xyz坐标信息 
        this.shipPointList.map(cItem => {
            let diotes = this.shipPointList.filter(oItem => {
                if(oItem.id != cItem.id) {
                    // Cesium.Cartesian3.distance 计算两点之间的距离 单位 m
                    return Cesium.Cartesian3.distance(cItem.entity.znvPoint.xyz, oItem.entity.znvPoint.xyz) <= this.radius
                }
            })
           
            ret.push({
                center: cItem,
                diotes
            })
        })
        return ret
    }
    setColloct(arr) {
        let currItem = arr[0],
            restArr = arr.slice(1);

        // 去掉 已经存在于collect的 中心点
        if(!this.isCollected(currItem.center)) {
            let alldiotesId = [currItem.center.id]

            //去掉 已经存在于collect中心点的 子点
            currItem.diotes = currItem.diotes.filter(item => {
                let flag = !this.isCollected(item)

                if(flag) {
                    alldiotesId.push(item.id)
                }
                return flag
            })
            this.collect.push(currItem)
            
            this.collectedIds = this.collectedIds.concat(alldiotesId)
        }

        //递归继续跑，直到数组取完了
        if(restArr.length>0) {
            this.setColloct(restArr)
        }
    }
    isCollected(item) {
        return this.collectedIds.indexOf(item.id) > -1
    }

    // 绘制聚合点
    drawDiot() {
        this.clusterArr = []

        this.clusterType.resolve()
        this.clusterType.destory()

        if(!this.collect || this.collect.length == 0 ) {
            throw new Error('没有collect集合点')
        }

        let cameraHeight = this.ctl.cameraHeight

        this.collect.map(item => {
            let centerEntity = item.center.entity

            item.diotes.map(diot => {
                diot.entity.show = false
            })

            /**
             * >5000 显示cluster点
             * <=5000 数目为1的显示渔船图标
             * */

            if(cameraHeight > this.clusterType.showShipBillboardHeight || item.diotes.length > 0) {
                let cluster = new this.clusterType({
                    position: centerEntity.znvPoint.xyz,
                    number: item.diotes.length+1,
                    height: this.curHei,
                    radius: this.radius
                })
                this.clusterArr.push(cluster)
                
                centerEntity.show = false
            }else{
                centerEntity.show = true
            }

            //console.log(this.clusterArr, cameraHeight)
        })
    }

    //验证ctl对象
    checkCtl() {
        if(!(this.ctl&&this.ctl.viewer && this.ctl.viewer.camera)){
            console.log(this.ctl, 'ctl出现问题')
            throw new Error()
        }
    }

    hideCluster() {
        this.clusterType.hide()

        this.ctl.remove(this.afterHeightChange)
    }

    showCluster() {
        this.clusterType.show()
    }

    destory() {
        this.ctl.remove(this.afterHeightChange)
        this.clusterType.resolve()
        this.clusterType.destory()
    }
}
