module.exports = () => {
  return async (ctx, next) => {
    // 获取用户详情，先从kbar的redis中获取，获取不到，则从comm的redis中获取，还是获取不到，则给默认值
    const getUser = async (unionid, openid) => {
      let user = {};
      const defaultImgUrl = 'https://qncweb.ktvsky.com/20190710/vadd/8316ee1cfc9fbd3453fc134053f53d63.png';
      user['openid'] = openid;
      user['unionid'] = unionid;
      user['nickname'] = '匿名';
      user['headimgurl'] = defaultImgUrl;
      user = JSON.stringify(user);
      let userKeyBar = app.config.RDS_KEY.wx_user + app.config.WX_CONF.APP_CONF.appid + '_' + openid;
      let userKeyCom = app.config.RDS_KEY.wx_user + app.config.WX_CONF.LSKG_CONF.appid + '_' + openid;
      let userInfo = await app.redis.get('kbar').get(userKeyBar);
      if (!userInfo) {
        userInfo = await app.redis.get('comm').get(userKeyCom);
        userInfo = userInfo || user;
      }
      userInfo = eval("(" + userInfo + ")");
      if (userInfo.headimgurl === '') {
        userInfo.headimgurl = defaultImgUrl;
      }
      return userInfo;
    };

    const {app, socket, logger, helper} = ctx;
    const nsp = app.io.of('/drink');

    // 用户信息
    const query = socket.handshake.query;
    const {unionid, openid} = query;
    socket.id = unionid + '#' + openid;
    const key = app.config.RDS_KEY.user_mac + unionid;
    const room = await app.redis.get('kbar').get(key);
    const rooms = [room];

    // 用户加入
    socket.join(room);

    // currentUser 发送给所有用户
    let currentUser = {};

    // 在线列表(clients为socket.id的属性值)
    nsp.adapter.clients(rooms, async (err, clients) => {

      // clientList发送给新加入的用户
      let clientList = [];
      // 房间内客户端的数量，可用于选主
      let clientCount = clients.length;
      await app.redis.get('kbar').set(app.config.RDS_KEY.room_count + room, clientCount, 60 * 60 * 3);
      for (let i = 0; i < clientCount; i++) {
        let l = clients[i].split('#');
        let innerUnionid = l[0], innerOpenid = l[1];
        let user = await getUser(innerUnionid, innerOpenid);
        if ((user.openid) === openid) {
          currentUser = user;
        }
        clientList.push(user);
      }

      // 将所有用户信息发送给新加入的用户
      nsp.emit(socket.id, clientList);

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        currentUser,
        action: 'join',
        room: room
      });
    });

    await next();

    // 用户离开
    logger.info('#leave', room);

    // 在线列表
    nsp.adapter.clients(rooms, async (err, clients) => {
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        currentUser,
        action: 'leave',
      });
    });

  };
};
