const Router = require('koa-router')
const send = require('koa-send')
const path = require('path')

const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  // 本来第三个参数可以省略， 但是加上的话会更容易理解
  await send(ctx, ctx.path, {root: path.join(__dirname, '../../')})
})

module.exports = staticRouter
