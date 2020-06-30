在小程序页面实现手写签名，，在零食商城的我的页面实现了
F:\project\xiaochengxu\front\pages\my

html
```
<canvas class='firstCanvas'
        canvas-id="firstCanvas"
        bindtouchmove='move'
        bindtouchstart='start'
        bindtouchend='end'
        bindtouchcancel='cancel'
        bindlongtap='tap'
        disable-scroll='true'
        binderror='error'>
</canvas>
```

js
```
// 画布的触摸移动开始手势响应
    start: function (event) {
        // console.log("触摸开始" + event.changedTouches[0].x)
        // console.log("触摸开始" + event.changedTouches[0].y)
        //获取触摸开始的 x,y
        let point = { x: event.changedTouches[0].x, y: event.changedTouches[0].y }
        touchs.push(point)
    },

    // 画布的触摸移动手势响应
    move: function(e) {
        let point = {x: e.touches[0].x, y: e.touches[0].y}
        touchs.push(point)
        if(touchs.length >= 2) {
            this.draw(touchs)
        }
    },

    // 画布的触摸移动结束手势响应
    end: function(e){
        console.log("触摸结束"+e)
        //清空轨迹数组
        for (let i = 0 ;i < touchs.length;i++ ){
            touchs.pop()
        }

    },

    // 画布的触摸取消响应
    cancel: function(e) {
        console.log("触摸取消"+e)
    },

    // 画布的长按手势响应
    tap: function(e) {
        console.log("长按手势"+e)
    },
    error: function(e){
        console.log("画布触摸错误"+e)
    },

    //绘制
    draw: function (touchs) {
        let point1 = touchs[0]
        let point2 = touchs[1]
        touchs.shift()
        content.moveTo(point1.x, point1.y)
        content.lineTo(point2.x, point2.y)
        content.stroke()
        content.draw(true)
    },
```