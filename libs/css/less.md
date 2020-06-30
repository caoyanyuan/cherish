#### 渔港项目中使用less写的一些比较实用的方法

1. 对于像素单位的封装，省去每一步的计算

```
@baseHeight,@baseWidth分别为设计稿的宽高1080*1920

.px2vh (@px) {
    @result: @px/@baseHeight *100vh ;
}
.px2vw (@px) {
    @result: @px/@baseWidth *100vw ;
}
```

2. 网页自适应方案

需求: 在大屏的时候要求使用百分比, 宽高自适应, 高度使用 vh, 由于字体最小限制为14，12，所以在比较的屏幕下，vh缩放的高度太小。这时候需要设置最小高度
实现：定义一个方法在使用到的时候全部使用该方法来设定尺寸

```
// @px: 设计稿 1920的px值， @min： 最小值
.height(@px, @min) {
    @media only screen and (max-width: 1366px) {
        @value:if((@px<=32), @min*1px, .px2vh(@px)[@result]);
        height: @value;
        line-height:@value;
    }
    @media (min-width: 1367px) and (max-width: 1600px) {
        @value: .px2vw(@px)[@result];
        height: @value;
        line-height:@value;
    }
    @media (min-width: 1601px){
        @value: .px2vw(@px)[@result];
        height: @value;
        line-height:@value;
    }
}
```
