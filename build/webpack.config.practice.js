const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const {VueLoaderPlugin} = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

let config

const defaultPlugins = [
  new ProgressBarPlugin({
    // ■、✦、▇
    complete: '▇',
    format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed 秒)',
    width: 20,
    clear: false,
  }),
  new HTMLPlugin(),
  new VueLoaderPlugin(),
]

const devServer = {
  port: 8100,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true,
  stats: 'errors-only',
  /*stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    errors: true,
    warnings: true,
  },*/
  noInfo: true,
  // progress: true // 显示打包进度百分比
}


config = merge(baseConfig, {
  mode: 'development',
  entry: path.join(__dirname, '../practice/index.js'),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader', // 使用 vue-style-loader 才能实现修改 css 热更新
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
  devtool: '#cheap-module-eval-source-map', // webpack4 已有默认配置项
  devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ])
})

module.exports = config
