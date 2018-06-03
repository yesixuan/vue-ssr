const path = require('path')
const Koa = require('koa')
const send = require('koa-send')
const proxy = require('koa-better-http-proxy')

const staticRouter = require('./routers/static')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

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

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter

if (isDev) {
  /*app.use(proxy('127.0.0.1:3333/public', {
    proxyReqPathResolver: function(ctx) {
      return `127.0.0.1:8100/${ctx.path}`
    }
  }))*/
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
