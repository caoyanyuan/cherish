- perspective:??px;
- perspecive-origin:x-axis y-axis;
- transform-style:preserve-3d;
- transform:rotateX(?deg) rotateY(?deg) translateZ(??px)

> https://www.jianshu.com/p/a3eeeea44caa

#### 1. perspective

perspective和3D中的家透视息息相关，perspective：600px;设置的就是观察点（类似于眼睛）距离我们的3D元素的距离。

> 当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。
> 所以需要在盒子外层用.containerBox进行包裹并设置该属性。

```
.class{
  perspective: 800px;
}
.class{
  transform: prespective(800px)
}
```
1. 单独定义的perspective只在初次渲染时，投影在屏幕上。
2. 写在transform中的perspective会根据transform动画的变化来进行重新的渲染。所以当使用js或Css3进行动画时，尽量选择后一种定义方式。

#### 2. perspective-origin:x-axis y-axis;

浏览器的坐标默认为左上角是原点（0,0），竖直方向为Y轴，横向为X轴。
而css3d 中的各种变换是和transform-origin相关的，该属性指定了变换的中心出于什么位置。此处不做详解。
x-axis y-axis就是坐标的表示，可能的值为：
X:left center right length %
Y:top center bottom length %
默认 为50% 50%

#### 3. preserve-3d
作用于子元素  子元素可以脱离父级。
每一个需要子级脱离出来的地方都要加上
