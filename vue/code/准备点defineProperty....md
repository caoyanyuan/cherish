# 准备点

1. Object.defineProperty(obj, propertyName, {})

    1.writeable: 默认为false 只读
    2.get：
    3.set：监视属性值的变化
    4.configurable: 是否可以重新定义

2. Object.keys() 得到对象可枚举属性组成的数组

    
3. Object.hasOwnProperty('属性名称'): 属性是存在于自身。而不是在原型链上 

4. createDocumentFragment：

情景：
```
<ul id="fragment_test">
    <li>test1</li>
    <li>test2</li>
    <li>test3</li>
</ul>
```
节点操作： 将li里面所有的文本都改为 test
document进行的文本操作就会操作3次。

document： 对应显示的页面，包含着n个elment，一旦更新document内部的某个元素更新,多次操作dom

createDocumentFragment:内存中保存n个element的容器对象(不与外界关联)，如果更新fragment中的某个element，界面不会更新,批量操作dom

```
const ul = document.getElementById('fragment_test')
//1.创建fragment
const fragment = document.createDocumentFragment()

//2.取出ul中所有的节点保存到fragment
let child
while(child = ul.firstChild){
    fragment.appendChild(child)
}

//3.更新fragment中所有li的问题不能
Array.prototype.slice.call(fragment.childNodes).forEach(node => {
    if(node.nodeType === 1) {  //这里的childNodes中有换行节点，nodeType为1的时候就是元素节点        node.textContent = 'test'
    }
})

//将fragment插入li
ul.appendChild(fragment)
```



