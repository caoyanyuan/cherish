#### 1.node的几大用处：
1.编译类——babel、grunt/gulp
  ES6->ES5
2.打包——browserify
  一堆文件 -> 单个文件
3.开发辅助——browser-sync
  多端同步
4.测试类——
  单元测试：模块、函数
  集成测试：
  压力测试：性能、负载能力、隐藏bug


#### 2.执行
  默认：webpack.config.js
  改了：webpack --config xxxx


#### 3.ES6模块化和node模块化对比
  export default xxx;         //作为模块本身被输出     import xxx from '...';
  export let a=12,b=5;        //输出模块的东西         import {a,b} from '...';


#### 4. webpack基本配置
module.exports={
    entry: '文件名',
    output: {
        path: '结果目录',
        filename: '结果文件名'
    }
};


#### 5.
1.webpack本身
  打包

2.DevServer
  开发服务器

3.Loader——翻译
  babel-loader


#### 6. babel

1.babel-loader      给webpack用的
2.babel-core        babel核心库
3.babel-preset-env  环境预设
