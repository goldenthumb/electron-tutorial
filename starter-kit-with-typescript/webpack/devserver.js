const { resolve } = require('path');
const devConfig = require('./dev');
const port = process.env.PORT || 3000;

module.exports = {
  ...devConfig,
  devServer: {
    host: 'localhost',
    port,
    inline: true,
    lazy: false,
    hot: true,
    contentBase: resolve(__dirname, '../app'),
    publicPath: '/app/dist',
  }
};