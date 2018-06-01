const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()

serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  // 捕获 webpack 编译错误
  if (err) throw err
  stats = stats.toJson()
  // 捕获其他错误信息，如 eslint 报错
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  // vue-ssr-server-bundle.json 文件是 vue-server-renderer 默认生成的文件名
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new server bundle')
})

const handleSSR = async (ctx) => {
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

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
