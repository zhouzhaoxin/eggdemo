const Controller = require('egg').Controller;

const rule = {
  'openid': {type: 'int'}
};

class DrinkController extends Controller {
  // 玩游戏
  async index() {
    this.ctx.validate(rule, this.ctx.request.body);
    // const openid = this.ctx.query.openid;
    this.ctx.body = {'openid': 'abc', 'unionid': 'def'};
  }
  // 加入游戏
  async new() {
    this.ctx.body = 'quit';
  }
  // 退出游戏
  async delete() {
    this.ctx.body = 'players';
  }
}

module.exports = DrinkController;