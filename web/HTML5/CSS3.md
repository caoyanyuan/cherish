- perspective:??px;
- perspecive-origin:x-axis y-axis;
- transform-style:preserve-3d;
- transform:rotateX(?deg) rotateY(?deg) translateZ(??px)

1. perspective

perspective和3D中的家透视息息相关，perspective：600px;设置的就是观察点（类似于眼睛）距离我们的3D元素的距离。
> 当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。
> 所以需要在盒子外层用.containerBox进行包裹并设置该属性。