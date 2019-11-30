module.exports = {
  cluster: {
    listen: {
      path: '',
      port: 7008,
      hostname: '0.0.0.0',
    }
  },
  keys: '_1523266936854_6353',
  middleware: ['errorHandler'],
  errorHandler: {match: '/api'},

  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  },

  sentry: {
    dsn: 'http://b7ac4f9f6dbd488a9e9fb73f9c754eca@wowsentry.ktvsky.com/20',
  },
  redis: {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: '0',
    },
    agent: true
  },
  io: {
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
  }
}
;


