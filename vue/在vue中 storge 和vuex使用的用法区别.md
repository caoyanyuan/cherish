#### 在vue中 storge 和vuex使用的用法区别

1.联动性：storge对于属性的改变不能触发其他页面的改动

比如：
    我在A页面改了userInfo  不经过刷新。b对他的调用并不知道最新的改动

实际运用：
    在 渔港项目中 权限管理，每个页面显示当前港口，切换至别的港口，开放首页权限；但是关闭其他所有界面。这就是一个组件操控另外一个好远的组件，这里必须使用==vuex==， 但是刷新当前界面，要保留当前港口信息。这一块要用storage，故需要storage和vuex结合使用；


code

```

location.vue
1.在每次刷新的时候从storage取出信息
2.切换港口的时候提交mutation并且更新storage
cache/UserInfo.vue
存取用户所有信息


```
