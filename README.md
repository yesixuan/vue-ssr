# 杂谈

## 开发环境下，webpack 打包终端界面美化

### 配置 devserver 去除其他信息

当项目进入到稳定开发阶段，我们一般是不会关注 webpack 打包的具体信息，大多数情况下，我们只想知道：有没有报错以及有没有打包完。  

```js
// webpack.config.dev.js
const devServer = {
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
  noInfo: true
}
```

### 借助 progress-bar-webpack-plugin 展示打包进度条

```js
// webpack.config.dev.js
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// ...
new ProgressBarPlugin({
  // ■、✦、▇
  complete: '▇',
  format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed 秒)',
  width: 20,
  clear: false,
})
```
