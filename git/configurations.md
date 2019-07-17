1. 查看git配置信息:

```
git config --list
```


2. 全局配置用户名:

```
git config --global user.name "nameVal"
```


3. 全局配置邮箱

```
git config --global user.email "eamil@qq.com"
```


4. 清除登录缓存

```
git config --local --unset credential.helper
git config --global --unset credential.helper
git config --system --unset credential.helper
```
