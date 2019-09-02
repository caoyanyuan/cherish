# 搜索框
## 引入
    无需引入，已是全局组件
```
import "base/baseTable"
```



## 属性

|  属性   |        意义        |     类型      | 默认值 | 备注
| :-----: | :----------------: | :-----------: | :--------------------------: |:--------------------------:
|  headers  |     表头      |    Array<object> |     |
|  datas    | 接口返回数据  |    Array<object>|
| listLoading | 数据加载状态  |    Boolean  |   false | false-已加载
| hasSelection | 是否有行复选框  |    Boolean  | false | false-没有
| tableHeight | 表格高度  |    Number   |  300 | 1920下的px值
| rowClassName | 列的样式名  |    String |     | |

### headers


| 属性            |      意义               |  类型  | 备注 | 取值
| :---:           | :------------:         | :----: | :--:  | :--:
| label           | 表头名字                |  String    |      |
| name            | 表头配置对应datas的key   |  String    |      |
| type            | 行数据类型               |  String    |  注解见下 | slot/image/detail/icon/time
| imageWidth      | 设置的图片宽             |   Number   | type为'image' | 默认为100
| imageHeight     | 设置的图片高             |   Number   | type为'image' | 默认为60
| isNeedDefault   | 是否需要默认图片         |   Boolean  | type为'image'  |
| isHidden        | 是否隐藏该值             |   Boolean |  配全所有的data值，以备其他需求(详情配置)  | 默认false
| iconWidth       | 设置的图标宽             |   Number  |  type为'icon' | 默认为60
| iconHeight      | 设置的图标高             |   Number  |  type为'icon' | 默认为60
| time            | time的格式设置           |   String  |  type为'icon' | day/hour/minute/second 默认为day

#### type
    slot:  操作等
    image： 图片
    icon：img-icon组件 name值就是对应的type传值
    detail： 查看详情一列
    time： 时间


### 方法
1. checkDetail： type为detail时，查看详情 传值row 当前行的数据
2. handleRowClick： 行点击触发  row, event, column (elementUI提供参数)
