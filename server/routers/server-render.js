/* 这个方法可以看做是控制器，别人处理好的东西最终由它输出到页面中 */
const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['ContentType'] = 'text/html'

  const context = {url: ctx.path}

  try {
    /**
     * appString 是拿到了需要展示的静态内容
     * 还有很重要的一点是 Vue 帮我们在 context 中加入了很多有用的信息（静态资源的路径）
     **/
    const appString = await renderer.renderToString(context) // 将 context 上下文传给 server-entry.js
    const { title } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
