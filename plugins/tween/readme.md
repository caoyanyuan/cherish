npm

```
npm install @tweenjs/tween.js
```
补间（来自中间）是一个概念，允许您以平滑的方式更改对象属性的值。您只需告诉它要更改哪些属性，当补间完成运行时应该具有哪些最终值，以及这需要多长时间，并且补间引擎将负责从开始到结束点查找中间值。例如，假设您有一个position对象，x并且y坐标为：

```
var position = {x ： 100，y ： 0 }

//为position创建补间
var tween =  new TWEEN.Tween（position）;

//然后告诉我们想要在1000毫秒
补间动画x属性的补间动画。
to（{x： 200 }， 1000）;
```




[github文档](https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md)