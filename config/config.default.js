module.exports = appInfo => {
  const config = exports = {};

  config.cluster = {
    listen: {
      path: '',
      port: 7008,
      hostname: '0.0.0.0',
    }
  };

  config.keys = appInfo.name + '_1523266936854_6353';

  config.middleware = ['errorHandler'];

  config.errorHandler = {match: '/api'};

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.io = {
    init: {
      wsEngine: 'ws',
    },
    namespace: {
      // 默认匹配路由
      '/': {
        // 仅在用户连接时调用
        connectionMiddleware: [],
        // 作用于每一个数据包，一般用来解密
        packetMiddleware: [],
      },
      '/drink': {
        connectionMiddleware: ['drink'],
        packetMiddleware: [],
      },
    },

    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  };

  return config;
};
