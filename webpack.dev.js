const path    = require('path');
const webpack = require('webpack');
const merge   = require('webpack-merge');
const common  = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
  ],
  output: {
    filename: 'bundle.dev.js',
    path: path.resolve(__dirname, 'dist')
  }
});
