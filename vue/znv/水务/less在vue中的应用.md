**问题**：在vue中引入一些公共的文件，比如全局变量、函数；
一般比较常见的做法是，在每一个页面都初始引入公共文件

```
@import url("~@less/variable.less");
```

这种做法要写很多句引入，一直在重复，重复的代码就没有意义，其实有办法一次引入，受用终生；

一次引入的做法来了~~~

 **vue-cli 2版本的写法**

在build/utils 里配置
```
//定义lessloader的加载
 function lessResourceLoader() {
    var loaders = [
      cssLoader,
      'less-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/common/less/mixins.less'),
            path.resolve(__dirname, '../src/common/less/variable.less')
          ],
          javascriptEnabled: true,
        }
      }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
//引用
function generateLoaders (loader, loaderOptions) {
   ....方法里的代码块
  return {
    ...方法里的代码块
    less: lessResourceLoader('less')
  }
}
```

 **vue-cli 3版本**
在vue.config.js 里面配置
```
module.exports = {
	css: {
	    loaderOptions: {
	      less: {
	        import: resolve("src/common/stylus/mixin.less")
	      },
	    }
	  },
}


```


链接： https://blog.csdn.net/Forever201295/article/details/105227125
