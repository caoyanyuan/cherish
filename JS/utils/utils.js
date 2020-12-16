// 仿照聊天消息时间展示 判断一个日期 是否是 今天/昨天
 export function getDateStr(time) {
    let now = new Date(),
        //今天零点
        today_o = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`,
        today_o_stamp = new Date(today_o).getTime(),
        yester_o_stamp = today_o_stamp - 24 * 60 * 60 * 1000,
    
        adjustTime = new Date(time),
        adjustTime_stamp = adjustTime.getTime()
    
    //如果现在的时间范围在昨天零点和今天零点之间  就是昨天
    if(adjustTime_stamp < today_o_stamp && adjustTime > yester_o_stamp) {
        return "昨天"
    }else if (adjustTime_stamp >= today_o_stamp) {
        return "今天"
    }else{
        return null
    }
}
// 格式化时间为上午 2:00 或者下午2:00
export function getMoringStr(date) {
    let str = getDateStr(date)

    if(str) {
        let sendTime = new Date(date),

        var hours = sendTime.getHours();
        var minutes = sendTime.getMinutes();
        var timeValue = "" +((hours >= 12) ? "下午" : "上午" )

        timeValue += ((hours >12) ? hours -12 :hours)
        timeValue += ":" + minutes

        return str+" "+timeValue
     }else{
        return date
     }
}