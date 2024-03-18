const express = require('express')
const router = express.Router()

const { getList, createLabels, deleteLabels } = require('../../controller/labels/index')

const { ResultModel } = require('../../model/resultModel')

router.get('/list', (req, res, next) => {
  let name = req.query.name || ''
  let currentPage = req.query.currentPage || 1
  let pageSize = req.query.pageSize || 10

  if (!req.session.username || req.session.username === '') {
    res.json(
      new ResultModel(
        {
          message: '还未登录',
          code: -97
        }
      )
    )
  } else {
    const result = getList(name)

    return result.then(listData => {
      res.json(
        new ResultModel({
          data: listData,
          code: 1
        })
      )
    })
  }
})

router.post('/createLabels', (req, res, next) => {
  // console.log(req.body)
  const result = createLabels(req.body)

  return result.then(listData => {
    console.log(listData)
    res.json(
      new ResultModel({
        data: listData,
        message: '创建成功',
        code: 1
      })
    )
  }).catch(err => {
    console.log('err:' + err)
    res.json(
      new ResultModel({
        data: {},
        message: err,
        code: -1
      })
    )
  })
})

router.post('/deleteLabels', (req, res, next) => {
  const result = deleteLabels(req.body)

  return result.then(editResult => {
    console.log(JSON.stringify(editResult))
    // if (editResult.id != 0) {
    res.json(
      new ResultModel({
        data: editResult,
        message: '操作成功',
        code: 1
      })
    )
  }).catch(err => {
    new ResultModel({
      data: {},
      message: err,
      code: -1
    })
  })
})


module.exports = router