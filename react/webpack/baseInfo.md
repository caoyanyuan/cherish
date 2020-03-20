

#### 手动webpack
1. npm init -y
2. 新建src和dis文件夹
3. 在src下创建index.html
4. 使用cnpm安装webpack
    运行cnpm i webpack webpack-cli -D 
    webpack.config.js: webpack的配置文件
5. 注意：webpack 4.x提供了约定大于配置的概念。目的是为了减化配置
    -    默认约定了：
    -   打包的入口是 src -> index.js
    -   打包的输出是 dist -> main.js
    -   新增了mode选项：development/production （必须配置） 
6. 将内容写入内存中 配置 html-webpack-plugin


#### JSX语法
> 定义：就是符合XML规范的js语法（xml语法比html更严谨规范）
1. 启用jsx语法
- 安装babel插件

```
cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
cnpm i babel-preset-env babel-preset-stage-0 -D
```

- 安装能够识别转换jsx语法的包

```
cnpm i babel-preset-react -D
```