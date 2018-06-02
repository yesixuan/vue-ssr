/* 这个方法可以看做是控制器，别人处理好的东西最终由它输出到页面中 */
const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['ContentType'] = 'text/html'

  const context = {url: ctx.path}

  try {
    const appString = await renderer.renderToString(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
