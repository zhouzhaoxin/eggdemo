const Controller = require('egg').Controller;

class DrinkController extends Controller {
  async index() {
    const {app} = this;
    const nsp = app.io.of('/drink');
    await nsp.adapter.clients(['demo'], async (err, clients) => {
      let cli = clients[Math.floor(Math.random() * clients.length)];
      try {
        nsp.emit('start', cli);
      } catch (error) {
        app.logger.error(error);
      }
    });

  }
}

module.exports = DrinkController;