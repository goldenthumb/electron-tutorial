const { resolve } = require('path');
const port = process.env.PORT || 3000;

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [resolve(__dirname, '../app/src/index.tsx')],
  output: {
    path: resolve(__dirname, '../app/dist'),
    // publicPath: `http://localhost:${port}/app/dist/`,
    filename: 'app.min.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'ts-loader'
        }]
      }
    ]
  },
};