module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
          // 发送sentry,开启则所有异常都会发送到sentry中
//           ctx.app.sentry.captureException(err);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
      ? 'Internal Server Error'
      : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      ctx.status = status;
    }
  };
};