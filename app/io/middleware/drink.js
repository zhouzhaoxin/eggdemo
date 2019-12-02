const PREFIX = 'room';
const drinkPlayerPrefix = 'dpp';
const drinkPlayerRoomPrefix = 'dprp';

module.exports = () => {
  return async (ctx, next) => {
    const {app, socket, logger, helper} = ctx;
    const nsp = app.io.of('/drink');

    // 用户信息
    const query = socket.handshake.query;
    const {unionid} = query;
    const room = await app.redis.get(`${drinkPlayerRoomPrefix}_${unionid}`);
    if (!room) {
      logger.error("没有房间");
      return
    }
    socket.id = unionid;
    const rooms = [room];

    const hasAvatar = await app.redis.get(`${drinkPlayerPrefix}_${unionid}`);
    if (!hasAvatar) {
      logger.error("没有头像");
      return;
    }

    // 用户加入
    socket.join(room);

    // 在线列表
    nsp.adapter.clients(rooms, async (err, clients) => {
      let clientList = [];
      for (let i = 0; i < clients.length; i++) {
        let clientsData = {};
        let client = clients[i];
        clientsData['avatar'] = await app.redis.get(`${drinkPlayerPrefix}_${client}`);
        clientsData['client'] = clients[i];
        clientList.push(clientsData)
      }
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clientList,
        action: 'join',
        unionid: unionid,
        avatar: hasAvatar,
      });
    });

    await next();

    // 用户离开
    logger.info('#leave', room);

    // 在线列表
    nsp.adapter.clients(rooms, async (err, clients) => {
      let clientList = [];
      for (let i = 0; i < clients.length; i++) {
        let clientsData = {};
        let client = clients[i];
        clientsData['avatar'] = await app.redis.get(`${drinkPlayerPrefix}_${client}`);
        clientsData['client'] = clients[i];
        clientList.push(clientsData)
      }
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clientList,
        action: 'leave',
        unionid: unionid,
        avatar: hasAvatar,
      });
    });
  };
};