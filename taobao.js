const { Builder, By, Key, until } = require('selenium-webdriver');

// 淘宝登录用户名和密码
const userName = '淘宝登录用户名';
const pwd = '淘宝登录密码';

let driver;
let isLogin = false; // 登录状态
let qiangDanTimes = 1; // 记录抢单次数

// 抢单
async function action() {
  console.log(`---这是第${qiangDanTimes}次抢单---`);
  // 找全选按钮
  let isFindSelectAllBtn = false; // 控制是否找到全选按钮并可以点击
  let num = 0; // 记录查找全选按钮重复了多少次
  while (!isFindSelectAllBtn) {
    try {
      await driver.findElement(By.id('J_SelectAll1')).click();
      isFindSelectAllBtn = true;
      // console.log('找到全选按钮');
    } catch (err) {
      // console.log('找全选按钮失败', num++);

      // 如果查找全选按钮失败，可能是没有跳转回购车页面。
      // 找到购物车按钮，跳转到购物车页面
      try {
        await driver.findElement(By.css('.mini-cart')).click();
        // await driver.navigate().to('https://cart.taobao.com/');
      } catch (err) {}
    }
  }

  // 点击全选后，查找结算按钮
  let isJieSuanBtn = false;
  num = 0;
  while (isFindSelectAllBtn && !isJieSuanBtn) {
    try {
      await driver.findElement(By.id('J_Go')).click();
      isJieSuanBtn = true;
      // console.log('找到结算按钮');
    } catch (err) {
      // console.log('查找结算按钮失败', ++num);
    }
  }

  // 查找提交订单按钮准备付钱
  let isSubmitBtn = false;
  num = 0;
  while (isJieSuanBtn && !isSubmitBtn && num <= 5) {
    try {
      await driver.findElement(By.css('#submitOrderPC_1 .go-btn')).click();
      isSubmitBtn = true;
      console.log('找到提交订单按钮，抢单成功准备付钱啦！！！');
      return;
    } catch (err) {
      console.log('查找提交订单按钮失败', ++num);
      // 失败原因可能是页面没有跳转，再点击一下结算按钮使页面发生跳转
      try {
        await driver.findElement(By.id('J_Go')).click();
      } catch (err) {}
    }
  }

  // 如果没有找到提交订单按钮则返回到购物车页面
  // console.log('返回购物车页面', isSubmitBtn, num);
  if (!isSubmitBtn && num >= 5) {
    console.log('----抢单end----' + qiangDanTimes);

    driver.navigate().to('https://cart.taobao.com/');
    num = 0;

    qiangDanTimes++;
    action(); // 重新开启下一轮
  }
}

// 主程序
(async function main() {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
  await driver.get('https://cart.taobao.com/');

  // 打开淘宝购物车页面，登录
  let num = 0;
  while (!isLogin) {
    try {
      // 输入用户名和密码
      await driver.findElement(By.id('fm-login-id')).sendKeys(userName);
      await driver.findElement(By.id('fm-login-password')).sendKeys(pwd);
      await driver.findElement(By.css('.password-login')).click();
      isLogin = true; // ---登录成功---
      console.log('---登录成功---');
    } catch (err) {
      console.log('登录失败', ++num);
    }
  }

  // 登录成功，开始抢单
  if (isLogin) {
    action();
  }

  // driver.quit();
})();
