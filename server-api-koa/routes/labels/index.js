const router = require('koa-router')()

const { getList } = require('../../controller/labels')
const { resultModel } = require('../../model/resModel')

router.get('/labelslist', async (ctx, next) => {
  const result = await getList()
  // console.log(result)

  ctx.body = new resultModel(
    {
      data: result,
      code: 1
    }
  )
})

module.exports = router