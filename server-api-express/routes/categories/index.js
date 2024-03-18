const express = require('express')
const router = express.Router()

const { getList, createCategory, deleteCategory, editStatus, updateCategory } = require('../../controller/categories/index')

const { ResultModel } = require('../../model/resultModel')

router.get('/categorylist', (req, res, next) => {
  let name = req.query.name || ''

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

router.post('/createCategory', (req, res, next) => {
  // console.log(req.body)
  const result = createCategory(req.body)

  return result.then(listData => {
    // console.log(listData)
    res.json(
      new ResultModel({
        data: listData,
        message: '创建成功',
        code: 1
      })
    )
  }).catch(err => {
    // console.log('err:' + err)
    res.json(
      new ResultModel({
        data: {},
        message: err,
        code: -1
      })
    )
  })
})

router.post('/deleteCategory', (req, res, next) => {
  const result = deleteCategory(req.body)

  return result.then(editResult => {
    // console.log(JSON.stringify(editResult))
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

// 修改博客状态 上线 下线
router.post('/editStatus', (req, res, next) => {
  const result = editStatus(req.body)

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

router.post('/updateCategory', (req, res, next) => {
  console.log('updateCategory')
  const result = updateCategory(req.body)

  return result.then(listData => {
    res.json(
      new ResultModel({
        data: listData,
        message: '修改成功',
        code: 1
      })
    )
  }).catch(err => {
    // console.log('err:' + err)
    res.json(
      new ResultModel({
        data: {},
        message: err,
        code: -1
      })
    )
  })
})

module.exports = router