const Controller = require('egg').Controller;

const rule = {
  'openid': {type: 'string'},
  'unionid': {type: 'string'}
};

class DrinkController extends Controller {
  // 玩游戏
  async index() {
    this.ctx.validate(rule, this.ctx.request.body);
    this.ctx.body = {'openid': 'abc', 'unionid': 'def'};
  }
}

module.exports = DrinkController;