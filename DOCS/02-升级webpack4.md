## 总览

1. webapck4 升级之后，与之相关的 loader 也要进行升级（安装 webpack4 ）
2. mode 配置项，设置此项之后，webpack4 会自动向 window 中注入 process.env.NODE_ENV  
3. 干掉一些插件：webpack.DefinePlugin、webpack.optimize.CommonsChunkPlugin、webpack.NoEmitOnErrorsPlugin  

## 升级开发依赖

`npm update`默认只会升级次版本，而不会升级主版本。  
升级主版本需要先卸载，再安装。  

```js
// 卸载旧的依赖
npm uninstall webpack webpack-dev-server webpack-merge

// 安装最新依赖
npm install webpack webpack-cli webpack-dev-server webpack-merge vue-loader -D
```  

在这个过程中需要见招拆招，注意命令行中的 warning 信息，然后更新相应的 loader.

## 修改配置

### mode 选项

```js
// 通过 npm 设置环境变量 cross-env NODE_ENV=development
mode: process.env.NODE_ENV || 'production'
```
设置 mode 配置项之后，webpack4 会自动注入这个环境变量，故而 webpack.DefinePlugin 插件没有必要存在了。  

### 打包文件拆分

干掉 entry 中的 vender 选项  
```js
optimization: {
  splitChunks: {
    chunks: 'all' // 加入这个选项，webpack4 会自动抽取 node_modules 以及项目源文件中的公用模块
  },
  runtimeChunk: true
}
```