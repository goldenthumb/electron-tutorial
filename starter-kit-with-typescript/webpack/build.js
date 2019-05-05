const devConfig = require('./dev');

const config = {
  ...devConfig,
  devtool: false,
  mode: 'production'
};

module.exports = config;