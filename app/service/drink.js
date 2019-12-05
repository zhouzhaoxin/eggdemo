const Service = require('egg').Service;

class DrinkService extends Service {
  async getBindRoom(unionid) {
    const key = this.config.RDS_KEY.user_mac + unionid;
    return await this.app.redis.get('kbar').get(key);
  }
}

module.exports = DrinkService;