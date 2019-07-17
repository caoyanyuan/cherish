#### git clone

1. 发生错误

```
RPC failed; curl 56 OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054
```
- 原因： 刚新换电脑，电脑已经存在他人的ssh，但是git配置的账号密码已经改成自己的吗，这样ssh和用户不一致
- 解决办法:配置自己的ssh替换原来用户的
- 步骤：
1. 检查是否已经有SSH Key：

```
cd ~/.ssh
```



2. 生成SSH

```
   Keyssh-keygen -t rsa -C "youremail"
```
第一次生成的话，直接一路回车，不需要输入密码。不是第一次生成的话，会提示 overwrite (y/n)? 问你是否覆盖旧的 SSH Key ，直接填 y ，然后一直回车就行了，最后得到了两个文件：id_rsa和id_rsa.pub。

记事本打开/C/Users/Administrator/.ssh/下id_rsa.pub文件，复制该段信息；登录github账户，点击头像进入Settings -> SSH and GPG keys -> New SSH key，将复制的信息粘贴到该处。

3.  测试是否成功

```
ssh -T git@github.com
```
提示“Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.”说明添加成功。

本机操作：
```
The authenticity of host 'github.com (13.250.177.223)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,13.250.177.223' (RSA) to the list of known hosts.
Hi caoyanyuan! You've successfully authenticated, but GitHub does not provide shell access.
```
