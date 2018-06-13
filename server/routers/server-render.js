/**
 * 在这里将生成的 html 片段、style 标签、script 标签插入到模版中，最后返回给客户端
 */
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
      state: context.renderState(),
      title: title.text()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
