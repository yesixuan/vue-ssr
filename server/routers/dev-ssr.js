/**
 * 开发时的服务器端处理逻辑
 **/
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

// 这个 serverCompiler 可以通过 nodejs run 或者直接 watch 来生成打包文件
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()

// 打包文件输出到内存而不是硬盘中
serverCompiler.outputFileSystem = mfs

let bundle

/* 监听项目文件，生成新的打包文件 */
serverCompiler.watch({}, (err, stats) => {
  // 捕获 webpack 编译错误
  if (err) throw err
  stats = stats.toJson()
  // 捕获其他错误信息，如 eslint 报错
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  // vue-ssr-server-bundle.json 文件是 vue-server-renderer 默认生成的文件名
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  // 此处便将服务器端 webpack 打包好的文件转成 JSON 拿到了
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new server bundle')
})

const handleSSR = async (ctx) => {
  // 第一次打包的时候会不存在bundle
  if (!bundle) {
    ctx.body = '你等一会儿...'
    return
  }
  // 这个文件是由客户端的 vue-server-renderer 插件生成的
  const clientManifestResp = await axios.get('http://127.0.0.1:8100/public/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  /**
   * 这里，我们拿到客户端静态资源的清单与服务器端打包好的文件（用于生成HTML片段）
   * 此时，renderer 现在具有了服务器和客户端的构建信息
   */
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest // 适用客户端的打包文件
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
