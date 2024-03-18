const router = require('koa-router')()

const { getList, getDetail } = require('../../controller/blogs')
const { resultModel } = require('../../model/resModel')

router.get('/list', async (ctx, next) => {
  // console.log(ctx.query.title)
  const title = ctx.query.title || ''
  const label = ctx.query.label || ''
  const currentPage = ctx.query.currentPage || 1
  const pageSize = ctx.query.pageSize || 10

  const result = await getList(label, title, currentPage, pageSize)
  // console.log(result)

  ctx.body = new resultModel(
    {
      data: result,
      code: 1
    }
  )
})

// 文章详情
router.get('/detail', async (ctx, next) => {
  const id = ctx.query.id

  const result = await getDetail(id)

  ctx.body = new resultModel(
    {
      data: result.detail[0],
      code: 1
    }
  )
})
// 关于我的
router.get('/me', async (ctx, next) => {
  const id = ctx.query.id

  const result = await getDetail(8)
  // console.log(result.detail[0])

  ctx.body = new resultModel(
    {
      data: result.detail[0],
      code: 1
    }
  )
})
module.exports = router