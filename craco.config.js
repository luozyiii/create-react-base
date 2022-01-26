const path = require('path');
const CracoLessPlugin = require('craco-less');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    },
    plugins: [
      // 查看打包的进度
      new SimpleProgressWebpackPlugin(),
      new BundleAnalyzerPlugin()
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
