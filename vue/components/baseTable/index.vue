<template>
  <div class="table-content" :style="{height:maxHeight,width:'100%'}">
    <scroll-wrap ref="scrollWrap">
      <el-table ref="mulTable"
                :data="datas"
                v-loading="listLoading"
                class="tb"
                :row-class-name="rowClassName"
                :span-method="spanMethod"
                @row-click="handleRowClick"
                @selection-change="selsChange"
                @sort-change="sortChange">
        
          <el-table-column v-if="hasSelection" type="selection" width="55"></el-table-column>
          <template v-for='(header, index) in headers'>
            <template v-if="!header.isHidden">
            <el-table-column v-if="header.type==='image'" :label="header.label" :width="header.width"  :key="header.name">
              <img-box slot-scope="scope"
                      b="#00AEFF"
                      :isNeedDefault='header.isNeedDefault'
                      :url='scope.row[header.name]'
                      :w='header.imageWidth||100'
                      :h='header.imageHeight||60'></img-box>
            </el-table-column>
            <el-table-column v-else-if="header.type==='icon'" :label="header.label" :width="header.width"  :key="header.name">
              <img-icon slot-scope="scope"
                      :type='header.name'
                      :w='header.iconWidth||60'
                      :h='header.iconHeight||60'></img-icon>
            </el-table-column>
            <el-table-column v-else-if="header.type==='detail'" :label="header.label" :width="header.width" :key="header.name" :sortable="header.sortable"  >
              <template slot-scope="scope">
                  <div @click.stop="$emit('checkDetail', scope.row)" class="cp">
                    <img-icon type="detail" :w=15 :h=18 class="ilm" m="0 5 0 0"></img-icon>
                    <txt class="ilm" c="00FCFF" s=16>详情</txt>
                  </div>
                </template>
            </el-table-column>

            <el-table-column v-else-if="header.type==='config'" :label="header.label" :width="header.width" :key="header.name" :sortable="header.sortable"  >
              <template slot-scope="scope">
                  <txt class="ilm" s=16>{{header.config[scope.row[header.name]]}}</txt>
              </template>
            </el-table-column>

            <el-table-column v-else-if="header.type==='time'" :label="header.label" :width="header.width" :key="header.name" :sortable="header.sortable"  >
              <template slot-scope="scope">
                  {{formatTime(scope.row[header.name], header.time)}}
              </template>
            </el-table-column>

            <el-table-column v-else-if="header.type==='slot'" :label="header.label" :width="header.width" :key="header.name" :sortable="header.sortable" >
              <template slot-scope="scope">
                <slot :name="header.name" :row="scope.row" :index="scope.$index"></slot>
              </template>
            </el-table-column>

              <el-table-column v-else :class-name="header.class" :prop="header.name" :label="header.label" :key="header.name" :width="header.width" :sortable="header.sortable"></el-table-column>
            </template>
          </template>
       
      </el-table>
      </scroll-wrap>
     

  </div>
</template>
<script type='text/ecmascript-6'>
import ScrollWrap from 'base/baseUI/scrollWrap'
import moment from 'moment'

export default {
  props: {
    headers: {
      type: Array,
      default: function() {
        return [];
      }
    },
    datas: {
      type: Array,
      default: function() {
        return [];
      }
    },
    listLoading: { // 数据加载
      type: Boolean,
      default: false
    },
    hasSelection: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: Number,
      default: 300
    },
    rowClassName: {
      type: Function,
      default: () => {}
    },
    spanMethod: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      index: 0
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.mulTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.mulTable.clearSelection();
      }
    },
    sortChange(param) {
      let sortOrder = "";
      switch (param.order) {
        case "ascending":
          sortOrder = "ASC";
          break;
        case "descending":
          sortOrder = "DESC";
          break;
        default:
          sortOrder = null;
          break;
      }
      this.$emit("changeSort", sortOrder, param.column);
    },
    selsChange(sels) {
      this.$emit("selectes", sels);
    },
    formatTime(value, mat) {
      let config = {
          day: 'YYYY-MM-DD',
          hour: 'YYYY-MM-DD HH',
          minute: 'YYYY-MM-DD HH:mm',
          second: 'YYYY-MM-DD HH:mm:ss'
      }
      return moment(value).format(config[mat] || config.day)
    },
    handleRowClick(row, event, column) {
      this.$emit('handleRowClick', row, event, column)
    },
  },
  computed: {
    maxHeight() {
      this.$refs.scrollWrap && this.$refs.scrollWrap.refresh()
      return `${parseFloat(this.getCurrentPx(this.tableHeight, 'h'))}px`
    }
  },
  components: {
    ScrollWrap
  }
};
</script>

<style lang="less" scoped>

/deep/ .el-table{
  min-height:.px2vh(200)[@result];
  thead th{
    height:@h30 !important;line-height:@h30 !important;
    font-size:15px;border-bottom-width:2px;
  }
  td{
    &.red{
      color:#FF0000;
    }
  }
  .cell{
    overflow:hidden;.height(26, 22);text-overflow:ellipsis;white-space: nowrap;height:auto !important;
    // -webkit-line-clamp: 1;display: -webkit-box;-webkit-box-orient: vertical;
  }
  .el-loading-mask{
    background:transparent;
  }
}
/deep/ .el-table th,
/deep/.el-table tr {
  //background-color: #0f2a4c;
  background-color: transparent;
}
/deep/.el-table,
/deep/.el-table thead {
  color: #ffffff;
  font-size: 14px;
  line-height: 3.6vh;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td,
/deep/.el-table__row:hover {
  background-color: #2b6b9f;
}
/deep/.el-table {
  background-color: transparent;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-color: @tableBorder;
}
/deep/.el-table::before {
  height: 0;
}
/deep/.el-table--medium td,
/deep/.el-table--medium th {
  padding: .6vh 0;
  height: @h30;
}

/deep/.el-button--text {
  color: #00fcff;
  font-size: 14px;
}
.el-loading-mask{
  background-color: rgba(255,255,255,0.1);
}


</style>
<style scoped>

.details {
  display: inline-block;
  width: 15px;
  height: 18px;
  background: url("/static/img/report/ico_details.png") no-repeat center bottom;
  float: left;
  margin-top: 10px;
  margin-right: 5px;
}

.tb ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
.tb ::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
.tb ::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: rgba(47, 184, 255, 1);
}

</style>
