'use strict';

const Controller = require('egg').Controller;

class DrinkController extends Controller {
  async index() {
    await this.ctx.render('drink');
  }
}

module.exports = DrinkController;