/**
 * 在这里将生成的 html 片段、style 标签、script 标签插入到模版中，最后返回给客户端
 */
const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['ContentType'] = 'text/html'

  // 这里要将用户是否登录的信息传给 context，以便服务端调用接口之前做判断
  const context = {url: ctx.path, user: ctx.session.user}

  try {
    /**
     * appString 是拿到了需要展示的静态内容
     * 还有很重要的一点是 Vue 帮我们在 context 中加入了很多有用的信息（静态资源的路径）
     **/
    const appString = await renderer.renderToString(context) // 将 context 上下文传给 server-entry.js
    // 第一次 renderString 的时候会调用 api，如果没权限会修改 router 对象（重定向）,
    // 这里再判断 router 里的路径与当前请求的路径是否一致，如果不一致就服务器端重定向，再次触发 renderString
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }
    const {title} = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initalState: context.renderState(),
      title: title.text()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
