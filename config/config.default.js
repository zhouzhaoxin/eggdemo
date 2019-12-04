module.exports = {
  RDS_KEY: {
    user_mac: 'user_mac_'
  },

  // 配置应用启动监听的端口和ip地址
  cluster: {
    listen: {
      path: '',
      port: 7008,
      hostname: '0.0.0.0',
    }
  },
  // cookie 安全字符串，目前没有使用到
  keys: '_1523266936854_6353',

  // restful api异常处理中间件
  // 参考：https://eggjs.org/zh-cn/tutorials/restful.html
  middleware: ['errorHandler'],
  errorHandler: {match: '/api'},

  // 渲染模板，在plugin.js中配置
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  },

  // sentry dsn
  sentry: {
    dsn: 'http://b7ac4f9f6dbd488a9e9fb73f9c754eca@wowsentry.ktvsky.com/20',
  },

  // redis，其插件配置在plugin.js中
  // 参考 https://github.com/eggjs/egg-redis
  redis: {
    clients: {
      kbar: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: '0',
      },
    },
    agent: true
  },

  // egg-socket-io
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

    // socket.io所使用的redis配置，注意和上边的redis相区分
    // 参考 https://github.com/socketio/socket.io-redis
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  }
}
;


