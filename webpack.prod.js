const path    = require('path');
const webpack = require('webpack');
const merge   = require('webpack-merge');
const common  = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/prod.env')
    }),
  ],
  output: {
    filename: 'bundle.prod.js',
    path: path.resolve(__dirname, 'dist')
  }
});
