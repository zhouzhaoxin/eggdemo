module.exports = appInfo => {
  const config = exports = {};

  config.cluster = {
    listen: {
      path: '',
      port: 8090,
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
      port: 6380,
      host: 'redis',
      password: '',
      db: 0,
    },
  };

  config.io = {
    init: {
      wsEngine: 'ws',
    },
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/drink': {
        connectionMiddleware: ['drink'],
        packetMiddleware: [],
      },
    },
    redis: {
      host: 'redis',
      port: 6380,
    },
  };

  return config;
};
