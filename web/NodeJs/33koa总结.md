###  koa  知乎demo 

1. 安装mysql和Navicat for mysql
2. 引入koa和中间件

```
"koa": "^2.5.0",               
处理post files上传
"koa-better-body": "^3.0.4",       
generator转化器     
"koa-convert": "^1.2.0",
ejs模板
"koa-ejs": "^4.1.1",
mysql 因为generator和async的问题不能用了 在koa3里面
"koa-mysql": "^1.0.3",
pug模板
"koa-pug": "^3.0.0-2",
路由
"koa-router": "^7.4.0",
session 注意key的使用
"koa-session": "^5.8.1",
处理静态文件 没有缓存
"koa-static": "^4.0.2",
处理静态文件 有缓存
"koa-static-cache": "^5.1.2",
不是koa的中间件 用来连接mysql
"mysql-pro": "^1.0.1"
```

3. 写服务器
流水线上的工序
next 走入下一层
```
server.use(async (ctx, next)=>{
    ctx.db=db;
  
    await next();
});
```

4. 渲染页面
    单独的 router 文件 渲染页面

```
router.get('', async ctx=>{
  let page=1;
  let page_size=8;

  let questions=await ctx.db.execute(`
    SELECT Q.ID,Q.title,ANSWER.content AS best_answer_content,AUTHOR.name,AUTHOR.headline FROM

    question_table AS Q
    LEFT JOIN answer_table AS ANSWER ON Q.best_answer_ID=ANSWER.ID
    LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID=AUTHOR.ID

    LIMIT ${(page-1)*page_size},${page_size}
  `);

  await ctx.render('list', {
    questions
  });
});
```
