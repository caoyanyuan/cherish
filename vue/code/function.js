////隐藏所有 tool-item下拉框组件
//child.$options.name 获取组件名称
function handleParentClick() {

    let refs = this.$refs
    for(let key in refs) {
        let ref = refs[key]
        ref.$children.filter(child => child.$options.name == 'tool-item' ).map(item => {
            item.hide()
        })
    }
}
