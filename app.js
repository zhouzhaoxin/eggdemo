// 执行初始化操作
// 注意：框架会有启动的超时检测， 在初始化生命周期函数中不建议做太耗时的操作
const Raven = require('raven');
const assert = require('assert');

class AppBootHook {
  constructor(app) {
    this.app = app;
    this.drinkPlayerPrefix = 'dpp';
    this.drinkPlayerRoomPrefix = 'dprp';
    this.room = 'demo';
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
    // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    // const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    // this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
    // this.app.queue = new Queue(this.app.config.queue);
    // await this.app.queue.init();

    // 例如：加载自定义的目录
    // this.app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
    //   fieldClass: 'tasksClasses',
    // });
    const config = this.app.config.sentry;
    assert(config.dsn, '[egg-sentry][config] dsn is required');
    Raven.config(config.dsn).install();
    this.app.sentry = Raven;
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
    // this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);

    // drink游戏初始化：此处初始化假设系统有一个房间，并且系统存儲了六个用户的信息
    const demoRoomRedisKey = 'room:demo';
    const room = await this.app.redis.get(demoRoomRedisKey);
    if (!room) {
      await this.app.redis.set(demoRoomRedisKey, 'demo');
    }
    const playerARedisKey = `${this.drinkPlayerPrefix}_a`;
    const playerARoomRedisKey = `${this.drinkPlayerRoomPrefix}_a`;
    const playerAAvatar = 'https://qncweb.ktvsky.com/20191122/leimeng/8678099f91d2c69a56fa9b49ee5f9674.jpeg';
    const playerA = await this.app.redis.get(playerARedisKey);
    const roomA = await this.app.redis.get(playerARoomRedisKey);
    if (!playerA) {
      await this.app.redis.set(playerARedisKey, playerAAvatar);
    }
    if (!roomA) {
      await this.app.redis.set(playerARoomRedisKey, this.room)
    }
    const playerBRedisKey = `${this.drinkPlayerPrefix}_b`;
    const playerBRoomRedisKey = `${this.drinkPlayerRoomPrefix}_b`;
    const playerBAvatar = 'https://qncweb.ktvsky.com/20191122/leimeng/50141834945a8b0cba4166149583a6e4.jpeg';
    const playerB = await this.app.redis.get(playerBRedisKey);
    const roomB = await this.app.redis.get(playerBRoomRedisKey);
    if (!playerB) {
      await this.app.redis.set(playerBRedisKey, playerBAvatar);
    }
    if (!roomB) {
      await this.app.redis.set(playerBRoomRedisKey, this.room)
    }
    const playerCRedisKey = `${this.drinkPlayerPrefix}_c`;
    const playerCAvatar = 'https://qncweb.ktvsky.com/20191122/leimeng/c37615c4ff83ba4dc910265d41d96379.jpeg';
    const playerC = await this.app.redis.get(playerCRedisKey);
    if (!playerC) {
      await this.app.redis.set(playerCRedisKey, playerCAvatar);
    }
    const playerDRedisKey = `${this.drinkPlayerPrefix}_d`;
    const playerDAvatar = 'https://qncweb.ktvsky.com/20191122/leimeng/9829d79422a5284ad2460f2d18c291b5.jpeg';
    const playerD = await this.app.redis.get(playerDRedisKey);
    if (!playerD) {
      await this.app.redis.set(playerDRedisKey, playerDAvatar);
    }
    const playerERedisKey = `${this.drinkPlayerPrefix}_e`;
    const playerEAvatar = 'https://qncweb.ktvsky.com/20191122/leimeng/156ae5386f0691ce97beaf7e4563d2a7.jpeg';
    const playerE = await this.app.redis.get(playerERedisKey);
    if (!playerE) {
      await this.app.redis.set(playerERedisKey, playerEAvatar);
    }
    const playerFRedisKey = `${this.drinkPlayerPrefix}_f`;
    const playerFAvatar = 'https://qncweb.ktvsky.com/20191122/leimeng/c3b9da1dacdb8b3f427eaf8e2130962a.jpeg';
    const playerF = await this.app.redis.get(playerFRedisKey);
    if (!playerF) {
      await this.app.redis.set(playerFRedisKey, playerFAvatar);
    }
    const playerGRedisKey = `${this.drinkPlayerPrefix}_g`;
    const playerGAvatar = 'https://qncweb.ktvsky.com/20191122/leimeng/191fb9b91ec2f470be63f3f09ce5a3c4.jpeg';
    const playerG = await this.app.redis.get(playerGRedisKey);
    if (!playerG) {
      await this.app.redis.set(playerGRedisKey, playerGAvatar);
    }
  }

  async didReady() {
    // 应用已经启动完毕

    // const ctx = await this.app.createAnonymousContext();
    // await ctx.service.Biz.request();
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    this.app.server.on('timeout', socket => {
      // handle socket timeout
    });
  }

  async beforeClose() {
    // 应用即将关闭
  }
}

module.exports = AppBootHook;