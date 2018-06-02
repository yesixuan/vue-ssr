const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const {VueLoaderPlugin} = require('vue-loader')
const isDev = process.env.NODE_ENV === 'development'
const VueClientPlugin = require('vue-server-renderer/client-plugin')

let config

const defaultPlugins = [
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueLoaderPlugin(),
  // 这个插件将会生成 vue-ssr-client-manifest.json 文件供服务器端渲染使用
  new VueClientPlugin()
]

const devServer = {
  port: 8100,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true,
  historyApiFallback: {
    // 不加这个配置项在 history 路由的情况下，直接刷新会去服务器请求页面（下面的路径跟 output 配置项的 publicPath 相关）
    index: '/public/index.html'
  }
}


if (isDev) {
  config = merge(baseConfig, {
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
                sourceMap: true,
                // 这两项用于开启 cssmodules
                /*module: true,
                localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'*/
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devtool: '#cheap-module-eval-source-map', // webpack4 已有默认配置项
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      // new ExtractPlugin('styles.[contentHash:8].css'),
      new ExtractPlugin('styles.[chunkhash:8].css'),
      /*new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })*/
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      })
    ])
  })
}

module.exports = config
