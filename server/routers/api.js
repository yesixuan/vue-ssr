const Router = require('koa-router')

// 相当于是一个小的 app 实例
const apiRouter = new Router({ prefix: '/api' })

const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 400
    ctx.body = 'need login'
  } else {
    await next()
  }
}

const successResponse = data => {
  return {
    success: true,
    data: data
  }
}

// 加一层验证层（这样是全部需要验证， 需要单独配置时可以在 async 前面加上去）
apiRouter.use(validateUser)

apiRouter
  .get('/todos', async (ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async(ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', async(ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async(ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', async(ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
