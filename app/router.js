// 不要把路由放到多个地方，避免排查困难
// 路由支持正则和restful

module.exports = app => {
  const { router, controller, io } = app;
  // common api
  // drink game restful routers
  router.resources('/api/game/drink', controller.game.drink);

  // drink game
  router.get('/drink', controller.game.home.index);
  io.of('/drink').route('drink', io.controller.game.drink.index);
};
