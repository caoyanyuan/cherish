<template>
    <div>
        <el-form :model="model" :inline="true" class="demo-form-inline ssss" @submit.native.prevent>
            <span v-for="(item, index) in data" :key="index" class="item">
                <template v-if="item.type==='text'">
                    <el-input   :placeholder=item.placeholder
                                @keyup.enter.native="_emitSearch"
                                clearable
                                v-model="model[item.name]" >
                    </el-input>
                </template>
                <template v-if="item.type==='textarea'">
                    <el-input   type="textarea"
                                :placeholder=item.placeholder
                                @keyup.enter.native="_emitSearch"
                                v-model="model[item.name]" >
                    </el-input>
                </template>
                <template v-else-if="item.type==='select'">

                    <el-select  v-model="model[item.name]" clearable filterable
                                :value-key="item.key"
                                @change="selectedData(item.name)"
                                :placeholder="item.placeholder"
                                >
                        <template v-for="(option, optionIndex) in item.options" >
                            <el-option :label="option.label" :value="option.value" :key=optionIndex></el-option>
                        </template>
                    </el-select>
                </template>
                <template v-else-if="item.type==='date'">
                    <el-date-picker v-model="model.startTime"
                                    type="daterange"
                                    placeholder="选择开始日期时间"
                                    align="right"
                                    :value-format="item.format?item.format:'yyyy-MM-dd HH:mm:ss'"
                                    :picker-options="pickerOptions1"
                                    >
                    </el-date-picker>
                </template>
                <template v-else-if="item.type==='date-normal'">
                    <el-date-picker v-model="model.startTime"
                                    type="date"
                                    placeholder="选择开始日期时间"
                                    align="right"
                                    :value-format="item.format?item.format:'yyyy-MM-dd HH:mm:ss'"
                                    :picker-options="pickerOptions1"
                                    >
                    </el-date-picker>
                </template>
                <template v-else-if="item.type==='startAndEndDate'">
                	<el-date-picker
                      v-model="model[item.name]"
                      type="daterange"
                      range-separator="~"
                      :value-format="item.format?item.format:'yyyy-MM-dd HH:mm:ss'"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :picker-options="pickerOptions2">
                  </el-date-picker>
                </template>
                <template v-else-if="item.type==='startAndEndDateTime'">
                	 <el-date-picker
                      v-model="model[item.name]"
                      type="datetimerange"
                      range-separator="~"
                      :value-format="item.format?item.format:'yyyy-MM-dd HH:mm:ss'"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :picker-options="pickerOptions1"
                    ></el-date-picker>
                </template>
            </span>
            <button class="btn_search" size="small" type="primary" v-if="isShowBtn" @click="onSubmit">搜索</button>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import { isString } from "common/js/utils"

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    model: {
      type: Object,
      default: () => {}
    },
    isShowBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toJSON: "",
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
        }]
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      isShow: false,
      currentClass: ""
    };
  },
  methods: {
    onSubmit() {
      this._emitSearch();
    },
    _emitSearch() {
      for (var key in this.model) {
        let value = this.model[key];
        if(value && isString(value)) {
          this.model[key] = value ? value.trim() : value;
        }
      }
      this.$emit("search");
    },
    selectedData(name) {
      this.$emit('handleSelectChange', this.model[name])
    }
  }
};
</script>

<style lang="less" scoped>
@w65: .px2vw(65)[@result];
@w14: .px2vw(14)[@result];
@h38: .px2vh(38)[@result];
@h32: .px2vh(32)[@result];
@h200: .px2vh(200)[@result];

/deep/ .el-form{
    .el-input__inner,.el-textarea__inner{
        background:transparent;
        border-radius:2px;
        border:1px solid rgba(50,170,255,1);
        color:#fff;
        padding-left:@w14;
       .height(32,26);
    }
    

}

/deep/ .el-input {
  width: @h200;
  height: @h30;

  .el-input__suffix{
        .height(32,26);top:-5px;
    }
}

/deep/ .el-select{
    .el-input__suffix{
        right: 0;left:auto;
        width:@w40;
        background:@btnGradient;
    }
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

.item{
  margin-right:1%;display:inline-block;vertical-align:top;
}
.btn_search {
    background: linear-gradient(to bottom, rgba(107,187,253,0.5) 0%, rgba(0,138,252,0.5) 16%, rgba(0,95,176,0.5) 100%);
    border: 0;
    .height(32,26);
    width: 100px;
    color: #ffffff;
    padding: 0;
    font-size: @h18;
    border-radius: 2px;
    &:hover{
      background: linear-gradient(to bottom,rgba(107,187,253,1),rgba(0,138,252,1),rgba(0,95,176,1));
    }
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

</style>
