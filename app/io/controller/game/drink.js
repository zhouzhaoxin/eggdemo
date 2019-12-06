const Controller = require('egg').Controller;
const actions = ['https://qncweb.ktvsky.com/20190710/vadd/e16283227d00e86838efa595bba5cb99.png', 'https://qncweb.ktvsky.com/20190710/vadd/48d02d0674933d1d86a9666bb5f0a1dc.png', 'https://qncweb.ktvsky.com/20190710/vadd/6373e303dd02c1eee1721439a267d02d.png', 'https://qncweb.ktvsky.com/20190710/vadd/2a64f539f323603b2e047885d042bdae.png', 'https://qncweb.ktvsky.com/20190710/vadd/25040868c40f484e1eaa7807bf4b8cfe.png', 'https://qncweb.ktvsky.com/20190710/vadd/26a59707fb3c95382378f83d0ed9f079.png', 'https://qncweb.ktvsky.com/20190710/vadd/3e7e8d719d0dfa14b5b4289d4b56a139.png', 'https://qncweb.ktvsky.com/20190710/vadd/0c4a4901379fd1e881402027bc6e9420.png'];

class DrinkController extends Controller {
  async index() {
    const {app, ctx} = this;
    const roomid = ctx.agrs[0];
    const nsp = app.io.of('/drink');
    await app.redis.get('kbar').incr(app.config.RDS_KEY.room_count + roomid);
    const roomCount = await app.redis.get('kbar').get(app.config.RDS_KEY.room_count + roomid);
    const action = actions[Math.floor(Math.random()*actions.length)];
    await nsp.adapter.clients([roomid], async (err, clients) => {
      const l = clients.length;
      let cli = clients[Math.floor(Math.random() * l)];
      try {
        nsp.emit('start', {
          client: cli,
          master: roomCount % l,
          action: action
        });
      } catch (error) {
        app.logger.error(error);
      }
    });
  }
}

module.exports = DrinkController;
