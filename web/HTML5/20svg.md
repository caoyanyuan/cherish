#### svg

1. 标签 <svg><line></line></svg>
2. 样式  写在style css3样式不起作用
3. 属性  -- 用js操作 setAttribute
4. 事件

svg和HTML是兄弟关系

##### 图形

<line x1 y1 x2 y2></line>
<rect x y width height rx ry>
<circle cx cy r>
<ellipse cx cy rx ry>


创建svg标签 

document.createElementNS('')  等同于   document.createElement

> NS 代表着命名空间

##### 特性

1. 矢量
2. 会保存下来 -- 有事件和属性
3. 性能不如canvas  -- 一般

属性 --》决定图形形状
样式 --》视觉效果

> 在svg中，属性的样式优先级很低,小于通配符*


##### path

M moveto  x,y
L lineto  x,y
A arc   rx ry x-axis-rotation(旋转角) large-arc-flag（大弧标志） sweep-flag（镜像） x y


