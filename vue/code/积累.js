//1. 隐藏所有 tool-item下拉框组件
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


//2. 全局 局部刷新 巧用
/*
<wrapper class="wrapper">
    <!-- 三级级页面 -->
    <keep-alive v-if="toggleRouterVisible">
        <router-view></router-view>
    </keep-alive>
</wrapper>
*/

function refreshRouter() {
    this.toggleRouterVisible = false
    setTimeout(() => {
        this.toggleRouterVisible = true
    })
}
