//事件派发机制
import Emitter from './Emitter'

export default class Sensor {
    static type = 'sensor'

    constructor (option) {
        this.option = { ...option }
        this.$emitter = new Emitter()
    }

    //注册事件: 供子类重构 每一种事件具体的注册和删除都不同 attach也一样 
    attach() {
        return this
    }

    //删除事件
    detach() {
        return this
    }

    //监听事件
    on ( type, ...fn ) {
        this.$emitter.on( type, ...fn )
        return this
    }

    //移除
    off () {
        this.$emitter.off( type, ...fn )
        return this
    }
    
    //触发
    trigger ( sensorEvent ) {
        this.$emitter.trigger( sensorEvent )
        
        return this
    }

}
