// Auto.js 脚本：发送消息后直接强制停止抖音，然后回到主屏幕并锁屏的简化实现

auto.waitFor();

try {
  device.setMusicVolume(0);
} catch (e) {}

var d = new Date();
notice("开始执行抖音续火花", "当前时间:" + d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());

let startTime = new Date().getTime();

// 主逻辑入口
sleep(5000);
device.wakeUpIfNeeded();

// 配置
var friendNames = ["把此处换成目标好友名"];
var password = [1,2,3,4,5,6];

// 解锁与打开应用
function unlockScreen() {
  sleep(1000);
  try {
    swipe(device.width/2, device.height-100, device.width/2, device.height/2, 500);
  } catch (e) {}
  sleep(1000);

  try {
    for (let i = 0; i < password.length; i++) {
      desc(password[i].toString()).findOne().click();
      sleep(200);
    }
  } catch (e) {}

  sleep(1000);
  openApp();
}

function openApp() {
  app.launchApp("抖音");
  sleep(5000);
  findUser();
}

function findUser() {
  click("消息");
  sleep(5000);

  for (let i = 0; i < friendNames.length; i++) {
    // 根据设备实际情况换成自己的坐标
    let x = 700;
    let y = 987;
    click(x, y);
    sleep(3000);
    sendMessage();
  }

  sleep(3000);
  // 简化后的处理：发送完成后直接执行简化版后续动作
  afterSendActionsSimple();
}

function sendMessage() {
  var content = "此处换成你想要发送的文本";
  var from = "";
  setText(content + from);
  sleep(1000);

  var button = desc('发送').findOne();
  if (button) {
    click(button.bounds().centerX(), button.bounds().centerY());
  } else {
    click(device.width - 100, device.height - 200);
  }
  sleep(1000);
  back();
}

// 简化版的“发送后操作”：直接强制停止抖音，然后锁屏
function afterSendActionsSimple() {
  // 1) 直接强制停止抖音（需要权限）
  try {
    var packageName = "com.ss.android.ugc.aweme";
    // 方案A：am force-stop
    shell("am force-stop " + packageName, true);
    sleep(500);
  } catch (e) {
    // 方案A 失败时尝试方案B
  }

  // 方案B：尽量结束后台进程（若可用）
  try {
    app.killBackgroundProcesses("com.ss.android.ugc.aweme");
  } catch (e) {
    // 忽略
  }

  // 2) 回到桌面并锁屏
  home();
  sleep(500);
  try {
    device.lockScreen();
  } catch (e) {
    // 某些设备不支持直接锁屏，忽略
  }
  sleep(500);

  let runTime = new Date().getTime() - startTime;
  notice("抖音续火花完成！", "总耗时: " + runTime + "毫秒");
}

// 简单的通知函数（可根据需要替换为log或toast）
function notice(title, content) {
  toastLog(title + "\n" + content);
}

// 启动流程

unlockScreen();
