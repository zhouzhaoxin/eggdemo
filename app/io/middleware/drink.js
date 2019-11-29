'use strict';

const PREFIX = 'room';
const drinkPlayerPrefix = 'dpp';

module.exports = () => {
  return async (ctx, next) => {
    const {app, socket, logger, helper} = ctx;
    const nsp = app.io.of('/drink');

    // 用户信息
    const query = socket.handshake.query;
    const {room, unionid} = query;
    socket.id = unionid;
    const rooms = [room];
    const tick = (unionid, msg) => {
      logger.debug('#tick', unionid, msg);

      // 踢出用户前发送消息
      socket.emit(unionid, helper.parseMsg('deny', msg));

      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
      nsp.adapter.remoteDisconnect(unionid, true, err => {
        logger.error(err);
      });
    };

    // 备注：此处 app.redis 与插件无关，可用其他存储代替
    const hasRoom = await app.redis.get(`${PREFIX}:${room}`);
    const hasAvatar = await app.redis.get(`${drinkPlayerPrefix}_${unionid}`);
    if (!(hasRoom && hasAvatar)) {
      logger.error("no room or avatar", unionid);
      tick(unionid, {
        type: 'deleted',
        message: 'deleted, room has been deleted.',
      });
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
    logger.debug('#leave', room);

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