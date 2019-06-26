import { getStrLen } from 'common/js/utils'
import { isEmail, isMobile } from '../validate'

/**
 * 
传入对象为item
let formItems = [
                { name: "type", label: "培训类型", type: "select", options: []},
                { name: "trainingName", label: "名称", type: "text" , require: 1, max: 50},
                { name: "joinDeadline", label: "预报名截止时间", type: "date", require: 1},
                { name: "timeRange", label: "培训时间", type: "daterange" , endState: '',require: 1},
                { name: "trainingPosition", label: "地点", type: "text", require: 1, max: 100},
                { name: "content", label: "内容", type: "textarea",require: 1, max: 1000},
                { name: "lowerNumber", label: "开课人数下限", type: "number",require: 1, max: 10},
                { name: "remark", label: "备注", type: "textarea", require: 2,max: 1000}
            ]

let rule = {}
formItems.filter(item => item.require).map(item => {
    let obj = new FormRule(item)
    rule[item.name] = obj.rule
})
return rule
 *  */

class FormRule {
    /**
     * 
     * @param {String} name key值
     * @param {Number} require 是否必须 1为true 2为false 
     * @param {String} label key对应的值
     * @param {String} type 触发类型  只有下拉select时候是change。其他均为blur
     * @param {String} max  最长字符数
     * @param {String} validate  验证类型 phone/email
     */
    constructor({name,  require = 1, label = "", type = 'blur', max, validate}) {
        Object.assign(this, {name, require, label, type, max, validate})
        
        this.rule = {
            required: this.require == 1 ? true : false,
            trigger: this.type == 'select' ? 'change' : 'blur',
        }
        this.setValidator()
    }

    getMsgText() {
        let text = ""
        switch(this.type) {
            case 'select':
                text = "选择";
                break;
            case 'image':
                text = "上传";
                break;
            default:
                text = "输入";
                break;
        }
        return text
    }

    setValidator() {
        
        this.rule.validator = ( rule, value, callback ) => {
            if(value === '' || !value) {
                if ( this.rule.required) {
                    let msgText = this.getMsgText()
                    callback(new Error(`请${msgText}${this.label}`))
                } else {
                    callback()
                }
            }else{

                if (this.max &&  getStrLen(value) > this.max ) {
                    callback(new Error(`最多可输入${this.max}个字符`))
                }
                if( this.validate){
                    this.checkValidate(value, callback)
                }

                callback()
            }
        }
    }

    checkValidate(value, callback) {
        switch (this.validate) {
            case 'phone':
                if(!isMobile(value)) {
                    callback(new Error('手机号格式错误'))
                }
                break;
            case 'email':
                if (!isEmail(value)) {
                    callback(new Error('邮箱格式错误'))
                } 
                break;
            default:
                break;
        }
    }


    
}

export default FormRule