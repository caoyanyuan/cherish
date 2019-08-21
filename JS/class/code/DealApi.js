/**
 *  图表查询接口: 通过传不同的类型str拿到不同
 *
 *
 */

import { chartDeal } from '@/api/api'

export const dealNo = {
    'prevention-events': 'BH3094319285',   //防台事件页面
    'prevention': 'BH8385493020',          //防台详情页面
    'personCertificate': 'BH9029345930',         //船员证书页面
    'shipEvents': 'BH4859693028',           //进出港事件
    'safeAlarm': 'BH8372048295',            //安全告警说明
    "shipInfo": 'BH6637268286',             //渔船信息
    //渔船黑名单统计说明
    'blacklist':'BH7567232732',
    //渔船证书
    'shipCertificate': 'BH8897382738',
    //定位设备统计说明
    'device': 'BH7643342354',
}

export default {
    getDevice() {
        return this._getData(dealNo.device)
    },
    getShipInfo(params) {
        return this._getData(dealNo.shipInfo, params)
    },
    getShipCertificate() {
        return this._getData(dealNo.shipCertificate)
    },
    getBlackList() {
        return this._getData(dealNo.blacklist)
    },
    getShipInfo() {
        return this._getData(dealNo.shipInfo)
    },
    _getData(dealNo, params) {
        return new Promise((resolve, reject) => {
            chartDeal({dealNo, ...params}).then(data => {
                resolve(data)
            })
        })
    },
}
