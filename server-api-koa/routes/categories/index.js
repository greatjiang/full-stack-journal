const router = require('koa-router')()

const { getList, getCategoryBlog } = require('../../controller/categories')
const { resultModel } = require('../../model/resModel')

router.get('/categorieslist', async (ctx, next) => {
  const result = await getList()

  ctx.body = new resultModel(
    {
      data: result,
      code: 1
    }
  )
})

router.get('/getCategoryBlog', async (ctx, next) => {
  const id = ctx.query.id
  const result = await getCategoryBlog(id)

  ctx.body = new resultModel(
    {
      data: result,
      code: 1
    }
  )
})

module.exports = router