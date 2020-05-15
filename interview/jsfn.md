1. 变量提升: 
    由于js的内存机制，function的级别最高，而用箭头函数定义函数的时候，需要var(let const定义的时候更不必说)关键词，而var所定义的变量不能得到变量提升，故箭头函数一定要定义于调用之前！

```
console.log(foo())  123
function foo() {
    return 123
}
console.log(mfoo)   345
var mfoo = function() {
    return 345
}
console.log(nfoo)   undefined
var nfoo = () => {
    return 345
}
```