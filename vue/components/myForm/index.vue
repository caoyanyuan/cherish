<template>
    <el-form :model="model" status-icon ref="elForm" @submit.native.prevent
            :rules="rules"
            :label-width="_labelWidth">
        <el-form-item :label="item.label" v-for="(item, index) in formItems" :key=index  :prop="item.name" :style="_itemSpace">
            <template v-if="item.type==='select'">
                    <el-select  v-model="model[item.name]" :clearable="!item.isColseClearable" filterable
                                @change="changeSelect"
                                :placeholder="item.placeholder"
                                :style=getStyle(item.width)>
                        <template v-for="(option, optionIndex) in item.options" >
                            <el-option :label="option.label" :value="option.value" :key=optionIndex></el-option>
                        </template>
                    </el-select>
            </template>

            <template v-else-if="item.type==='date' || item.type==='daterange'">
                <el-date-picker :type=item.type placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                v-model="model[item.name]"
                                :style=getStyle(item.width)
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                range-separator="至"
                                :picker-options="pickerDateAfter"
                                ></el-date-picker>
            </template>

            <template v-else-if="item.type==='startDate'">
                <el-date-picker type='date' placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                v-model="model[item.name]"
                                :style=getStyle(item.width)
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                range-separator="至"
                                :picker-options="pickerDateBefore"
                                ></el-date-picker>
            </template>

            <template v-else-if="item.type==='endDate'">
                <el-date-picker type='date' placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                v-model="model[item.name]"
                                :style=getStyle(item.width)
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                range-separator="至"
                                :picker-options="pickerDateAfter"
                                ></el-date-picker>
            </template>


            <template v-else-if="item.type==='slot'">
                <slot :name="item.slotName||item.name" :item="item" :scope="item"></slot>
            </template>

            <template v-else-if="item.type==='image'">
                <img-upload v-model="model[item.name]" 
                            :multiple="item.imageParam&&item.imageParam.multiplse"
                            :ratio="item.imageParam&&item.imageParam.ratio"
                            :precise="item.imageParam&&item.imageParam.precise"></img-upload>
            </template>

            <template v-else-if="item.type==='radios'">
                <el-radio-group v-model="model[item.name]">
                    <el-radio  v-for="(item, index) in item.options"
                                :key='index' :label="item.label">{{item.txt}}</el-radio>
                </el-radio-group>
            </template>

            <template v-else-if="item.type==='range'">
                <div class="range-box">
                    <el-input v-model="model[item.min]" :style="rangeInputWidth"></el-input>
                    <span></span>
                    <el-input v-model="model[item.max]" :style="rangeInputWidth"></el-input>
                </div>
            </template>

            <template v-else-if="item.type==='word'">
                <txt c="#fff">{{item.word}}</txt>
            </template>

            <template v-else-if="item.type=='textarea'">
                <el-input type="textarea"
                            :autosize="{ minRows: 2, maxRows: 6}"
                            v-model="model[item.name]"
                            :disabled=item.disabled
                            :style=getStyle(item.width)
                            :placeholder="item.placeholder"
                            autocomplete="true" ></el-input>
                <con c='67c23a' class="por" m="0 15 0 0" v-if="textareaIsOk[item.name]"><i class="el-icon-circle-check"></i></con>
                <con c='f56c6c' class="por" m="0 15 0 0" v-if="textareaIsOk[item.name]==false"><i class="el-icon-circle-close"></i></con>

            </template>

            <template v-else>
                <el-input :type="item.type"
                            :autosize="{ minRows: 2, maxRows: 6}"
                            v-model="model[item.name]"
                            :disabled=item.disabled
                            :style=getStyle(item.width)
                            :placeholder="item.placeholder"
                            autocomplete="true" ></el-input>
            </template>

        </el-form-item>
        <div class="confirm-btns">
            <template v-if="formBtns.length>0">
                <button v-for="(btn, index) in formBtns" :key=index :class="btn.class" @click="onSubmit(btn)">{{btn.text}}</button>
            </template>
            <button v-else class="bluebtn" @click="onSubmit">确定</button>
        </div>
    </el-form>
</template>

<script>
import ImgUpload from 'base/baseUI/ImgUpload'

export default {
    props: {
        model: {
            required: true,
            type: Object,
        },
        formItems: {
            required: true,
            type: Array,
        },
        rules: {
            type: Object,
            default: () => {}
        },
        labelWidth: {
            type: Number,
            default: 85
        },
        formBtns: {
            type: Array,
            default: () => []
        },
        itemSpace: {        //form-item之间的间隙
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            images: [],
            pickerDateBefore: {
                disabledDate: time => {
                    let endDate = this.model.endDate;
                    if (endDate) {
                        return time.getTime() >= new Date(endDate).getTime();
                    }
                    return false;
                }
            },
            pickerDateAfter: {
                disabledDate: time => {
                    let startDate = this.model.startDate || this.model.startTime;
                    if (startDate) {
                        return time.getTime() <= new Date(startDate).getTime();
                    }
                    return false;
                }
            },
            textareaIsOk: {}
        }
    },
    methods: {
        changeSelect(item){
            this.$emit('changeSelect', item)
        },
        getStyle(width){
            let style = ""
            if(!width) {
                style = "width:100%"
            }else{
                style = parseInt(this.getCurrentPx(width))+'px'
            }
            return style
        },
        onSubmit(btn) {
            this.$refs.elForm.validate(flag => {
                if( flag ) {
                    this.$emit('handleSubmit', btn || '')
                }
            })
        },
        validateField(str) {
            this.$refs.elForm.validateField(str)
        },
        resetFields() {
            // if(this.model.image) {
            //     this.model
            // }
            this.$refs.elForm.resetFields()
            for(let key in this.model){
                this.model[key] = ""
            }
        },
        clearValidate() {
            this.$refs.elForm.clearValidate()
        }
    },
    computed: {
        _labelWidth() {
            let width = Math.max(parseInt(this.getCurrentPx(this.labelWidth)), 70)
            return width+'px'
        },
        rangeInputWidth() {
            return {width: parseInt(this.getCurrentPx(74))+'px'}
        },
        _itemSpace() {
            return {marginBottom:parseInt(this.getCurrentPx(this.itemSpace))+'px'}
        },
        textareaKeys() {
            //item.require == 1 说明为必选项
            let textareas = this.formItems.filter(item => item.type === 'textarea' && item.require == 1)

            let arr = []
            if(textareas.length > 0) {
                textareas.map(item => {
                    for(let key in this.model) {
                        if(key == item.name) {
                            arr.push({
                                key: key,
                                value: this.model[key]
                            })
                        }
                    }
                })
            }
            return arr
        },
        image() {
            return this.model && this.model.image
        }
    },
    watch: {
        textareaKeys: {
            immediate: true,
            deep: true,
            handler(keys){
                this.$nextTick(() => {
                    keys.map(item => {
                        this.$refs.elForm.validateField(item.key, (errorMessage) => {
                            this.$set(this.textareaIsOk, item.key, !errorMessage)
                        })
                    })
                })


            }
        },
        image(val) {
            if(val && val.length > 0) {
                this.validateField('image')
            }
        }
    },
    components: {
        ImgUpload
    }
}
</script>

<style lang="less" scoped>
@w65: .px2vw(65)[@result];
@w14: .px2vw(14)[@result];
@h38: .px2vh(38)[@result];
@w64: .px2vw(64)[@result];

/deep/ .el-form{
    padding-right:@w40;
    .el-form-item__content{
       .minHei(32, 26);
       .lineHei(32, 26);
    }
    .el-form-item__label{
        color: #fff;.height(32, 26);font-size:16px;
    }
    .el-input__inner,.el-textarea__inner{
        background:transparent;
        border-radius:2px;
        border:1px solid rgba(50,170,255,1);
        color:#fff;
        padding-left:@w14;padding-right:@w40;
        .height(32, 26)
    }
    .el-input{
        &.is-disabled .el-input__inner{
            color:#ccc;
        }
    }

    .el-textarea__inner{
        height: @w64;
    }
    .el-form-item{
        margin-bottom: 14px !important;
        &.is-required{
            position:relative;
            &:after{
                right:-20px;content:"*";
                color:#fff;font-size:@w30;position:absolute;top:@h10;
            }
            .el-form-item__label:before{
                display:none;
            }
        }
    }
    .el-input__suffix{
        //right: @w50;
        .el-input__icon{
            .height(32, 26)
        }
    }

    // .el-icon-circle-check{
    //     top:0;right:0;color:#67c23a;position: absolute;
    // }


}

/deep/ .el-date-editor{
    .el-input__prefix{
        right: 0;left:auto;
        width:@w40;
        background:@btnGradient;
    }
    .el-input__suffix{
        right: @w50;
    }
    .el-input__icon{
        .height(32, 26)
    }
    &.el-range-editor--medium {
        .el-range-input{
            background: transparent;color:#fff;
        }
        .el-range-separator{
            .height(32, 26);color:#fff;
        }
    }
}
/deep/ .el-select{
    .el-input__suffix{
        right: 0;left:auto;
        width:@w40;
        background:@btnGradient;
    }
}
/deep/ .el-radio-group{
    .el-radio{
        color:#fff;
        .el-radio__input{
            .el-radio__inner{
                background:rgba(0,45,107,1);
                border-color:rgba(66,195,255,1);
            }

            &.is-checked {
                .el-radio__inner:after{
                    width:10px;height:10px;background:#00EAFF;
                }
                &+.el-radio__label{
                    color:#fff;
                }
            }
        }
    }
}

.confirm-btns{
    text-align:center;padding-left:@w40;
    button{
        height:@h38;background:@btnGradient;color:#fff;line-height:@h38;text-align:center;
        border:0px none;margin-left:auto;display:block;margin-right:auto;
        &.full{
            width:100%;
        }
        &.inline{
            display: inline-block;
            margin-right:20px;
        }
    }
}

.range-box{
    span{
        width:11px;height:2px;background:#42C3FF;vertical-align:middle;display:inline-block;margin:0 10px;
    }
}



</style>
