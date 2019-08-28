### DOM

##### 常用属性

```
clinetWidth, clientHeight
offsetWidth, offsetHeight
classList: 类名列表
childNodes： 子节点
firstChild
innerHTML
offsetLeft, offsetTop
style： {
    width/height/top/left...
}
```
1. offsetWidth和offsetWidth

```
IE6.0、FF1.06+：
clientWidth = width + padding
clientHeight = height + padding
offsetWidth = width + padding + border
offsetHeight = height + padding + border
IE5.0/5.5：
clientWidth = width - border
clientHeight = height - border
offsetWidth = width
offsetHeight = height
```
(需要提一下：CSS中的margin属性，与clientWidth、offsetWidth、clientHeight、offsetHeight均无关)
