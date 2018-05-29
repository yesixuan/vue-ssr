# vue 中 eslint 配置

## 相关插件的安装

```
"eslint": "^4.19.1",

"eslint-config-standard": "^11.0.0",

"eslint-plugin-html": "^4.0.3", // 识别 vue 文件中的 js 语法
"eslint-plugin-import": "^2.12.0",
"eslint-plugin-node": "^6.0.1",
"eslint-plugin-promise": "^3.8.0",
"eslint-plugin-standard": "^3.1.0",

"eslint-loader": "^2.0.0", // webpack 插件， 保存代码时，对代码进行检测

"husky": "^0.14.3",
```

## 配置 npm 命令检测代码

`package.json` 的配置

```
"scripts": {
  "lint": "eslint --ext .js --ext .jsx --ext .vue client/",
  "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/" // 自动修复
}
```

## 每次修改都进行检测

`webpack.config.base.js` webpack 的配置  
```js
config.module.rules = [
  {
    test: /\.(vue|js|jsx)$/,
    loader: "eslint-loader",
    exclude: /node_modules/,
    enforce: "pre", // 先于 vue-loader 进行处理
  }
]
```

## 借助 husky 添加 git precommit 钩子

`package.json` 的配置  
```
"scripts": {
  "precommit": "npm run lint-fix",
}
```


