# JavaScript（Node.js）+ Selenium 淘宝抢单

为了买买买（剁手）我也是拼了，看了一点selenium的资料，随便写的。

程序写的比较烂，勉强够我自己用的，望各路大牛指教。



## 使用说明：

**注意：**只把要买的东西提前加购物车，程序运行过程中会全选中购物车中的商品，全部结算，直到提交订单这一步结束。

所以**不买的东西别放在购物车啊啊啊！！！**

程序运行结束后请手动输入密码付款。



## 使用步骤：

1. 把当前项目克隆到本地。

2. 初始化项目，安装需要的包 `npm init`

   或者也可以直接使用 npm 安装 JavaScript 的 Selenium 库。

   ```shell
   npm install selenium-webdriver
   ```

3. 本项目需使用chrome浏览器。

   根据你自己的chrome浏览器版本下载对应的 [Chrome WebDriver](https://chromedriver.storage.googleapis.com/index.html)，替换当前项目中的 chromedriver.exe

4. 打开 taobao.js文件，修改文件，填写你自己的淘宝登录用户名和密码：

   ```js
   // 淘宝登录用户名和密码
   const userName = '淘宝登录用户名';
   const pwd = '淘宝登录密码';
   ```

5. 运行程序：

   如果你要买的东西 9:00 才能购买，那么 8:58 就让程序跑起来吧。

   ```shell
   node taobao.js
   ```



## 参考资料：

[JavaScript（Node.js）+ Selenium自动化测试](http://www.selenium.org.cn/1694.html)

[Selenium 浏览器自动化项目](https://www.selenium.dev/documentation/zh-cn/) > [入门指南](https://www.selenium.dev/documentation/zh-cn/getting_started/) 

[官方文档 selenium + js](https://www.selenium.dev/selenium/docs/api/javascript/index.html)

[selenium + python自动化测试环境搭建](https://www.cnblogs.com/fnng/archive/2013/05/29/3106515.html)

[Selenium JavaScript教程](http://www.testclass.net/selenium_javascript/)

[selenium 操作浏览器](https://www.cnblogs.com/TankXiao/p/5260557.html)



## 后续想法：

放到服务器上，添加一个定时程序，每天到点儿自动抢。



## 声明：

本项目不可用于商业目的，仅限学习交流，如需转载请注明出处。

最后祝福大家在买买买的道路上抢出水平，抢出风格，抢出成绩！