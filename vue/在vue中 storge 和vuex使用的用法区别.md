#### 在vue中 storge 和vuex使用的用法区别

1.联动性：storge对于属性的改变不能触发其他页面的改动

- storage： 存取login之后就不会改变的信息，比如userId， isAdmin(是否是管理员)
- vuex： 存取login之后可能在某个组件会改变的信息， 比如isInMyPort，isInPort

比如：
    我在A页面改了userInfo  不经过刷新。b对他的调用并不知道最新的改动

实际运用：
    在 渔港项目中 权限管理，每个页面显示当前港口，切换至别的港口，开放首页权限；但是关闭其他所有界面。这就是一个组件操控另外一个好远的组件，这里必须使用==vuex==， 但是刷新当前界面，要保留当前港口信息。这一块要用storage，故需要storage和vuex结合使用；


- location.vue
    1.在每次刷新的时候从storage取出信息
    2.切换港口的时候提交mutation并且更新storage
- cache/UserInfo.vue
    存取用户所有信息

code

```
storage:
{
    //用户信息接口返回的信息
    createTime: "2019-05-07 17:45:51"
    createUserId: 1
    email: "1@1.com"
    userId: 1
    userType: 3
    username: "admin"
    mobile: "11111111111"
    orgId: "0"
    orgName: "深圳海域"
    password: "aac0b32b4448fc6c2d330725b1081c712318a5c9f4934bafba3a08abb101fb0e"
    realName: "超级管理员"
    roleIdList: null
    salt: "FZNXygdMZV0x5OQG27eF"
    status: 1

    // 系统里面根据需要‘计算’出的信息
    isAdmin: true
    isInMyPort: true
    isInPort: true
    currentOrg: {title: "蛇口渔港", id: 1001, parentId: 100, orgType: 2, mainOrg: 0, orgName: "蛇口渔港", waterArea: "29万㎡",…}
    orgList: [,…]
}

vuex:
const state = {
    //是否在自己的港口
    isInMyPort: true,
    //当前用户 是在港口 还是在深圳海域
    isInPort: true
}





```
