'use strict';

const Controller = require('egg').Controller;

class DrinkController extends Controller {
  async index() {
    const {unionid, room} = this.ctx.query;
    await this.ctx.render('drink', {unionid: unionid, room: room});
  }
}

module.exports = DrinkController;