
import PointAbs from '@map/gis/table/PointAbs'

// 根据数字配置的颜色 目前只用了 4的颜色
const COLOR_MAP = {
    1: Cesium.Color.HOTPINK.withAlpha(0.7),
    2: Cesium.Color.PERU.withAlpha(0.7),
    3: Cesium.Color.PALEVIOLETRED.withAlpha(0.7),
    4: Cesium.Color.ROYALBLUE,
    5: Cesium.Color.SADDLEBROWN.withAlpha(0.7),
    6: Cesium.Color.SALMON.withAlpha(0.7),
    7: Cesium.Color.SEAGREEN.withAlpha(0.7),
}
// 高度：距离半径
const HEIGHT_MAP = [
    { height:  500,   r:   0,  },
    { height:  0,   r:   0  ,},
]

// 聚合点图片
const ICONES_MAP = [
    { number: 20, src : '/static/img/large-screen/cluster-01.png',  w: 55},
    { number: 30, src : '/static/img/large-screen/cluster-02.png', w: 65},
    { number: 40, src : '/static/img/large-screen/cluster-03.png', w: 70},
    { number: 1000, src : '/static/img/large-screen/cluster-purple.jpg', w: 80}
]

// 聚合点对象
export default class Cluster extends PointAbs{
    static promise = new Promise( ( resolve, reject ) => Cluster.resolve = resolve )
    static heightes = HEIGHT_MAP
    static entites = null
    static baseHeight = { height: 5000, r: 200 }
    //threshold
    static showShipBillboardHeight = 5000

    /**
     *
     * @param {Object} position 定位点
     * @param {Number} number 聚合点数目
     * @param {Number} height 高度
     *
     */
    constructor({ position, number, height, radius}) {
        super( { positions: position } )

        Object.assign(this, {position, number, height, radius})
        this.createEntity()

    }
    createEntity() {

        this.position.height = this.height

        this.getIconDataUrl().then(({imageItem, iconDataUrl}) => {
            let json = {
                position: this.position,
                billboard: {
                    ...this.constructor.entites.opt.billboardOpt,
                    image: iconDataUrl,
                    width: imageItem.w,
                    height: imageItem.w
                },
            }

            this.entity = new Cesium.Entity(json)
            this.constructor.entites.add( this.entity )
        }).catch(e => {
            console.log('创建聚合点失败',e)
        })

    }

    /** 获取 DataUrl格式的icon */
    async getIconDataUrl() {
        let image = ICONES_MAP.find(item => this.number < item.number)

        let result;

        if(!image.loadedDom) {
            await this.loadIconDom(image)
        }

        result = {
            imageItem: image,
            iconDataUrl: this.combineNewIcon(image)
        }
        return result
    }

    /** 加载ICON: Cesium加载方法：可以获取img的Dom元素格式, 且加载完毕了 */
    async loadIconDom(image) {
        await Cesium.Resource.fetchImage(image.src).then(iconDom => {
            image.loadedDom = iconDom
        })
    }

    /** 将icon和数字合并成新图片 */
    combineNewIcon(image) {
        let canvas=document.createElement('canvas'),
            
            W = image.w;

            canvas.width = W
            canvas.height = W
        let ctx=canvas.getContext('2d');
            ctx.fillStyle="rgb(255,255,255)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
       
            ctx.font=`bold 14px Arial`;

            ctx.drawImage(image.loadedDom, 0, 0, W, W);
            ctx.fillText(this.number, W/2, W/2);

        let result = canvas.toDataURL("image/png");

        return result
    }

    static destory() {
        this.entites.destory()
    }

    get ratio() {
        return HEIGHT_MAP.find(item => item.r <= this.radius).ratio || 1
    }


}
