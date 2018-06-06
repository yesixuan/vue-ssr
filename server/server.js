const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const send = require('koa-send')
const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

/**
 * 所有请求都会先被打印出请求路径，然后当所有其他中间件处理完毕后，统一处理错误
 **/
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.request.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async(ctx, next) => {
  ctx.db = db
  await next()
})

app.use(koaBody())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter

if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3333'

app.listen(PORT, HOST, () => {
  console.log(`server is listening ${HOST}:${PORT}`)
})
