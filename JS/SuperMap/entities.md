#### Entities页面

1.  数组清空全部全部全部用splice
symbol 类型的 数组清空 ==[] 会没法真正清除，改用splice(0,0)

```

destory () {
    if ( this.ctl.viewer ) {
        this[ entites ].forEach( ( entity ) => {
            this.ctl.viewer.entities.remove( entity )
        } )
    }
    this[ entites ].splice(0,0)
    this[ states ].splice(0,0)
}

```
