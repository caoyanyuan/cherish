$on:在实例上监听派发出来的事件
$emit: 在实例上派发事件
$root: 访问根组件
$parent: 访问父组件

ex: A是root组件的子组件，B是root中router-view中任一路由子组件， 实现点击A操控B

A与B的共同点：拥有同样的根组件
```
A: this.$root.$emit( 'search', this.shipSearchMsg )
B: this.$root.$on( 'search', ( msg ) => {})
```

