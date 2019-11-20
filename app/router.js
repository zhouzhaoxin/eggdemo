// 不要把路由放到多个地方，避免排查困难
// 路由支持正则和restful

module.exports = app => {
  const { router, controller, middlewares } = app;
  router.get('/', controller.home.index);

  // drink game restful routers
  router.resources('/game/drink', controller.game.drink);
};