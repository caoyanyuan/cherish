# 搜索框

```js
important "base/columTab"
```



## 属性

|  属性   |        意义        |     类型      |             备注             |
| :-----: | :----------------: | :-----------: | :--------------------------: |
|  data   |     搜索栏数据     | Array<object> | [ { name: '重点关注渔港' } ] |
| v-model | 双向绑定搜索栏对象 |    Number     |                              |
| isShowBtn | 是否显示按钮  |    Boolean     |       默认为true               |

### data
//{ name: "select",type: "select",placeholder: "渔船编号/船长名", options: [{value: '111111', label:'你说你要延后阿姐诶哦这么多年'}]}

| 属性     |      意义            |  类型  | 备注 | 取值
| :---:   | :------------:       | :----: | :--: |
| name    |  v-model对应的key值   | String |      |
| type    | 搜索框类型            | String |      | text/date/select
| placeholder | 搜索框placeholder | String |      | 
| options | 下拉框的options       |   Array | 固定传对象数组[{label, value}]    | 

### 方法
search： 点击搜索按钮派发的搜索方法
handleSelectChange： 下拉框发生改动后派发的方法

### 示例
```
<search class="mt20" :data="search" :model="ser_model" @search="handleSearch(1)" @handleSelectChange="handleSelectChange"></search>

ser_model: {
                name: "", 
                select: ""    //可以设置默认值为options的value ： defaultValue
            },

this.search =  [
                { name: "name",type: "text",placeholder: "渔船编号/船长名"},
                { name: "select",type: "select",placeholder: "渔船编号/船长名", options: [{value: 'defaultValue', label:'我是默认选项'}]}
            ]
```

