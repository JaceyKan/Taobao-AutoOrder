const { Builder, By, Key, until } = require('selenium-webdriver');

// 淘宝登录用户名和密码
const userName = '淘宝登录用户名';
const pwd = '淘宝登录密码';
// 抢单开始时间 hh:mm:ss
let targetTime = '20:00:00';

// 为抢单时间添加当天的日期，并获取时间数值
targetTime = new Date(`${getCurDate()} ${targetTime}`).valueOf();

let driver;
let qiangDanTimes = 1; // 记录抢单次数
const waitTime = 60000; // 等待时间不少于60S
const waitTargetTime = 10 * 60 * 1000; // 等待目标时间不少于10min

// 主程序
(async function main() {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();

  // 运行登录程序
  await login(userName, pwd);

  // 登录成功，开始抢单程序
  await firstAction();
})();

// 第一次抢单
async function firstAction() {
  console.log(`---这是第${qiangDanTimes}次抢单---firstAction`);
  // 进入购物车页面
  await driver.get('https://cart.taobao.com/');
  // 查找全选按钮
  await driver.wait(until.elementLocated(By.id('J_SelectAll1')), waitTime).click();

  // 等到购物车被全选后再进行后续程序
  try {
    await driver.wait(until.elementLocated(By.css('#J_SelectAll1>.cart-checkbox-checked')), waitTime);
  } catch (err) {
    console.log('---购物车中没有能抢购的商品了。不要在意，只当是个游戏^0^---');
    return;
  }

  // 查找结算按钮，点击
  let j_GoBtn = await driver.findElement(By.id('J_Go'));

  // 第一次抢单等待抢单时间，时间到了才点击结算按钮
  await driver.wait(() => {
    return targetTime - Date.now() <= 0.5;
  }, waitTargetTime);

  // console.log(targetTime - Date.now());
  await j_GoBtn.click();

  // 等到页面跳转到确认订单页面后再进行后续程序。但是要判断一下订单有没有在这一步就被拦截了
  await driver.wait(async () => {
    let curUrl = await driver.getCurrentUrl();
    // console.log(curUrl);
    // 如果网页没有跳转到提交订单页面，则认为订单被拦截了，要重新抢单
    if (!curUrl.includes('order/confirm_order.htm') && !curUrl.includes('cart.taobao.com')) {
      // 重新抢单
      qiangDanTimes++;
      await firstAction();
      return true;
    }
    if (curUrl.includes('order/confirm_order.htm')) {
      // 如果页面跳转到了提交订单页面，程序继续
      return true;
    }
  }, waitTime);

  // 查找提交订单按钮准备付钱
  try {
    // 如果是开发阶段，不点击按钮，只是打印出来
    await driver.findElement(By.css('#submitOrderPC_1 .go-btn')).click();
    /* let btn = await driver.findElement(By.css('#submitOrderPC_1 .go-btn'));
    console.log(btn); */
    console.log('----找到提交订单按钮了！！！-----');

    // 防止抢单成功后出现被天猫拦截订单现象
    intercepted();
  } catch (err) {
    // 没有找到提交订单按钮，返回购物车页面
    // 进行下一轮抢单
    qiangDanTimes++;
    action();
  }
}

// 抢单程序
async function action() {
  console.log(`---这是第${qiangDanTimes}次抢单---`);
  // 进入淘宝购物车页面
  await driver.get('https://cart.taobao.com/');
  // 查找全选按钮
  await driver.wait(until.elementLocated(By.id('J_SelectAll1')), waitTime).click();

  // 等到购物车被全选后再进行后续程序
  try {
    await driver.wait(until.elementLocated(By.css('#J_SelectAll1>.cart-checkbox-checked')), waitTime);
  } catch (err) {
    console.log('---购物车中没有能抢购的商品了。不要在意，只当是个游戏^0^---');
    return;
  }

  // 查找结算按钮，点击
  await driver.findElement(By.id('J_Go')).click();

  // 等到页面跳转到确认订单页面后再进行后续程序。但是要判断一下订单有没有在这一步就被拦截了
  await driver.wait(async () => {
    let curUrl = await driver.getCurrentUrl();
    // console.log(curUrl);
    // 如果网页没有跳转到提交订单页面，则认为订单被拦截了，要重新抢单
    if (!curUrl.includes('order/confirm_order.htm') && !curUrl.includes('cart.taobao.com')) {
      // 重新抢单
      qiangDanTimes++;
      await firstAction();
      return true;
    }
    if (curUrl.includes('order/confirm_order.htm')) {
      // 如果页面跳转到了提交订单页面，程序继续
      return true;
    }
  }, waitTime);

  // 查找提交订单按钮准备付钱
  try {
    // 如果是开发阶段不点击按钮，只是打印出来
    await driver.findElement(By.css('#submitOrderPC_1 .go-btn')).click();
    /* let btn = await driver.findElement(By.css('#submitOrderPC_1 .go-btn'));
    console.log(btn); */
    console.log('----找到提交订单按钮了！！！-----');

    // 防止抢单成功后出现被天猫拦截订单现象
    intercepted();
  } catch (err) {
    // 没有找到提交订单按钮，返回购物车页面进行下一轮抢单
    qiangDanTimes++;
    action();
  }
}

// 登录程序
async function login(userName, pwd) {
  // 打开淘宝购物车页面，登录
  await driver.get('https://cart.taobao.com/');
  try {
    // 输入用户名和密码
    await driver.findElement(By.id('fm-login-id')).sendKeys(userName);
    await driver.findElement(By.id('fm-login-password')).sendKeys(pwd);
    await driver.findElement(By.css('.password-login')).click();

    await driver.wait(until.urlContains('cart.taobao.com'), waitTime);
    console.log('---登录成功---');
  } catch (err) {
    console.log('---登录失败---');
  }
}

// 防止抢单成功后出现被天猫拦截订单现象
async function intercepted() {
  try {
    // 从出现错误页面的角度考虑，如果出现了错误页面就重新抢单
    let curUrl; // 记录当前网页的URL
    await driver.wait(async () => {
      curUrl = await driver.getCurrentUrl();

      // 如果当前URL中包含 wait 或者 error 或者不是支付页面，则认为订单被天猫拦截
      let result = curUrl.includes('wait') || curUrl.includes('error') || (!curUrl.includes('alipay.com') && !curUrl.includes('order/confirm_order.htm'));
      return result;
    }, waitTime);

    // 发现订单被天猫程序拦截后，返回购物车页面重新抢单
    qiangDanTimes++;
    action();
  } catch (err) {
    // 超过设置的等待时间都没有出现订单被拦截问题，则认为抢单成功，结束程序
    console.log('----抢单成功啦！！！-----');
    return;
  }
}

// 获取当天的日期，如 2020-12-31
function getCurDate() {
  let date = new Date(Date.now());
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
