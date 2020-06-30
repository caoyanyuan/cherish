#### 一、 达到全局引用 变量 和 方法

```
// vue.config.js
var path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: path.resolve(__dirname, './src/styles/global.styl')
      },
    }
  }
}

```
