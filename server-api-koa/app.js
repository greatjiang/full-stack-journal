const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('log4js')
log4js.configure({
  appenders: {
    files: {
      type: 'dateFile',
      filename: 'logs/app.log',
      pattern: '-yyyy-MM-dd',
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
    console: { type: 'console' }
  },
  categories: { default: { appenders: ['files', 'console'], level: 'info' } }
});

// 业务路由
const index = require('./routes/index')
const users = require('./routes/users')
const blogs = require('./routes/blogs/index')
const labels = require('./routes/labels/index')
const categories = require('./routes/categories/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  console.log(ctx.ip)
  const logger = log4js.getLogger();
  logger.level = 'info';
  logger.info(JSON.stringify(ctx) + '- ip=' + ctx.ip);
  await next()
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blogs.routes(), blogs.allowedMethods())
app.use(labels.routes(), labels.allowedMethods())
app.use(categories.routes(), labels.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
