const Controller = require('egg').Controller;

const rule = {
  'openid': {type: 'string'},
  'unionid': {type: 'string'}
};

class DrinkController extends Controller {
  // 检验用户是否绑定房台码
  async index() {
    const query = this.ctx.request.query;
    const unionid = query.unionid;
    this.ctx.validate(rule, query);
    const roomid = await this.ctx.service.drink.getBindRoom(unionid);
    if (!roomid) {
      this.logger.error('房间不存在 ' + unionid);
      // 抛出异常，若不返回status则会使用500作为默认status
      throw {message: '房间不存在'};
    }
    this.ctx.body = {'data': query};
  }
}

module.exports = DrinkController;