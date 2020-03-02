var $ = function (str) {
    return document.querySelectorAll(str)[0]
}



var A = {}

// 添加绑定事件方法on

A.on = function(dom, type, fn){

    if(dom.addEventListener){
        dom.addEventListener(type, fn, false);
    }else if(dom.attachEvent){
        dom.attachEvent('on' + type, fn);
    }else{
        dom['on' + type] = fn;
    }
}

/** 调用办法：每次都会去判断浏览器检测方法，浪费性能 */
A.on($('#demo'), 'click', function(){
    console.log('点到我了')
})
A.on($('#demo2'), 'click', function(){
    console.log('点到我2了')
})


A.on = function(dom, type, fn) {
    // 如果支持addEventListener方法
    console.log(document.addEventListener)
    if(document.addEventListener){
        return function(dom, type, fn){
            dom.addEventListener(type, fn, false);
        }
      // 如果支持attachEvent方法(IE)
    }else if(document.attachEvent){
        return function(dom, type, fn){
            dom.attachEvent('on' + type, fn);
        }
      // 定义on方法
    }else{
        return function(dom, type, fn){
            dom['on' + type] = fn;
        }
    }
}



// 添加绑定事件方法on
    // A.on = function(dom, type, fn){
    //     // 如果支持addEventListener方法

    //     if(dom.addEventListener){
    //         // 显示重定义on方法
    //         A.on = function(dom, type, fn){
    //             dom.addEventListener(type, fn, false);
    //         }
    //     // 如果支持attachEvent方法(IE)
    //     }else if(dom.attachEvent){
    //         // 显示重定义on方法
    //         A.on = function(dom, type, fn){
    //             dom.attachEvent('on' + type, fn);
    //         }
    //     // 如果支持DoM0级事件绑定
    //     }else{
    //         // 显示重定义on方法
    //         A.on = function(dom, type, fn){
    //             dom['on' + type] = fn;
    //         }
    //     }
    //     // 执行重定义on方法
    //     A.on(dom, type, fn);
    // };
