const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const {VueLoaderPlugin} = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

const defaultPlugins = [
  new ProgressBarPlugin({
    complete: '▇',
    format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed 秒)',
    width: 20,
    clear: false,
  }),
  new VueLoaderPlugin(),
]

config = merge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    // 服务端打包出来的东西，不需要在名字里面加 hash
    filename: 'server.entry.js',
    path: path.join(__dirname, '../server-build'),
  },
  // 浏览器端如果需要引入其他模块，需要走 http 协议，所以要将项目依赖打包到一起。
  // 但是服务端可以直接 require，故而不用打成一个 JS 文件
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      // 如果不抽离 css，style-loader 会将 css 插入到 DOM 中，服务器端是不能进行 DOM 操作的
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: defaultPlugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new ExtractPlugin('styles.[chunkhash:8].css'),
    new VueServerPlugin()
  ])
})

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config
