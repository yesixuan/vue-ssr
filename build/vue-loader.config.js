module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev, // 分离 vue 组件中的 CSS 文件
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true, // 将 class 类名的 “-” 连接改成驼峰命名
    },
    // hotReload: false, // 根据环境变量开启 js 热重载
  }
}