const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/baseapis',
    createProxyMiddleware({
      target: 'http://test-groupbuy-api.chenxuan100.cn',
      // 是否启用websocket
      ws: false,
      //是否允许跨域
      changeOrigin: true,
      // 重写接口
      pathRewrite: {
        '^/baseapis': '/'
      }
    })
  );
};
