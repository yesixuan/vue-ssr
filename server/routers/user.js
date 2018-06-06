const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })

userRouter
  .post('/login', async(ctx) => {
    const user = ctx.request.body
    if (user.username === 'vic' && user.password === '111') {
      ctx.session.user = {
        username: 'vic'
      }
      ctx.body = {
        success: true,
        data: {
          username: 'vic'
        }
      }
    } else {
      ctx.status = 400
      ctx.body = {
        success: false,
        data: {
          username: 'username or password err!!!'
        }
      }
    }
  })

module.exports = userRouter
