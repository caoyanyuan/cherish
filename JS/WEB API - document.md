##### 1. 使用dispatchEvent派发自定义事件
```
    const event = document.createEvent( 'Event' )
    event.detail = sensorEvent
    event.initEvent( sensorEvent.type, true, true )
    this.container.forEach( ( element ) => {
        element.dispatchEvent( event )
    } )
```