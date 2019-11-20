// 每个中间件都需要放到/middleware目录下并使用module.exports 暴露中间件方法, 每个中间件文件只暴露一个方法
module.exports = () => {
  return async (ctx, next) => {
    const {openid, unionid} = ctx.query;
    if (!(openid && unionid)) {
      ctx.body ={"error": "error"};
      return;
    }
    ctx.openid = openid;
    ctx.unionid = unionid;
    await next();
  };
};