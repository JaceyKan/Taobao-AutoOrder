# [JavaScript（Node.js）+ Selenium 淘宝抢单](https://github.com/JaceyKan/TaobaoAutoOrder)

为了买买买我也是拼了，看了一点selenium的资料，随便写的。

程序写的比较烂，但是够我自己用了，望各路大牛指教。



## 使用说明：

**注意：**只把要买的东西提前加购物车，程序运行过程中会全选中购物车中的商品，全部结算，直到提交订单这一步结束。

所以**不买的东西别放在购物车啊啊啊！！！**

程序运行结束后，如果抢单成功请手动输入密码付款。



## 使用步骤：

1. 把当前项目克隆到本地。

2. 初始化项目，安装需要的包 `npm install`

   或者也可以直接使用 npm 安装 JavaScript 的 Selenium 库。

   ```shell
   npm install selenium-webdriver
   ```

3. 本项目需使用chrome浏览器。

   根据你自己的chrome浏览器版本下载对应的 [Chrome WebDriver](https://chromedriver.storage.googleapis.com/index.html)，替换当前项目中的 chromedriver.exe

4. 打开 taobao.js文件，修改文件，填写你自己的淘宝登录用户名和密码，以及开始抢单的时间：

   ```js
   // 淘宝登录用户名和密码
   const userName = '淘宝登录用户名';
   const pwd = '淘宝登录密码';
   // 抢单开始时间 hh:mm:ss
   let targetTime = '20:00:00';
   ```

5. 运行程序：
   ```shell
   node taobao-v2.js
   ```
   **注意：**如果设置抢单时间为 20:00 ，那么应在 19:50之后再运行程序。如果要更改等待时间，可修改：
   ```js
   const waitTargetTime = 10 * 60 * 1000; // 等待目标时间不少于10min
   ```



## 参考资料：

[Selenium 浏览器自动化项目](https://www.selenium.dev/documentation/zh-cn/)

[官方文档 selenium + js](https://www.selenium.dev/selenium/docs/api/javascript/index.html)



## 后续想法：

从具体商品页开始，通过立即购买抢单。（另外一条思路）



## 声明：

本项目不可用于商业目的，仅限学习交流，如需转载请注明出处。

最后祝福大家在买买买的道路上抢出水平，抢出风格，抢出成绩！

