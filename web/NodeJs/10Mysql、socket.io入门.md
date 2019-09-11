### 十、Mysql、socket.io入门

#### a.连接池
1. let db = mysql.createPool({localhost,user,password...}, 10)

- 10: 最多开启10个连接，数据库最多维护这10个连接
- createPool 代替了 createConnection

#### b.用户注册和登录
1. 数据库结构（数据字典）
2. 接口模式（接口文档）

#### Q & A

1. 数据库删除了数据，对应的id不会回收利用，以免在用户端造成错误，比如删除了的订单，点进去变成了别的订单
2. 物理和逻辑删除
    真删： 按需求而定。不需要找回的数据
    假删： del_status/新的一套数据库，专门用来存放删除后的数据
