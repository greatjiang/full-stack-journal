const express = require('express')
const router = express.Router()

const { getList, createBlog, editArticle, getArticle, editStatus, deleteArticle, getDeleteList, recoverArticle, editBlog } = require('../../controller/blogs/index')

const { ResultModel } = require('../../model/resultModel')

router.get('/list', (req, res, next) => {
  let title = req.query.title || ''
  let currentPage = req.query.currentPage || 1
  let pageSize = req.query.pageSize || 10
  let category = req.query.category || ''

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
    const result = getList(title, category, currentPage, pageSize)

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

// 创建博客(基础内容)
router.post('/createBlog', (req, res, next) => {
  // console.log(req.body)
  const result = createBlog(req.body)

  return result.then(listData => {
    res.json(
      new ResultModel({
        data: listData,
        message: '创建成功',
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

//读取博客内容
router.get('/getArticle', (req, res, next) => {
  console.log(req.query.id)
  const id = req.query.id

  const result = getArticle(id)

  return result.then(listData => {
    res.json(
      new ResultModel({
        data: listData,
        code: 1
      })
    )
  })
})

// 编辑博客内容
router.post('/editArticle', (req, res, next) => {
  // console.log(req.body)
  const result = editArticle(req.body)

  return result.then(editResult => {
    // console.log(JSON.stringify(editResult))
    // if (editResult.id != 0) {
    res.json(
      new ResultModel({
        data: editResult,
        message: '编辑成功',
        code: 1
      })
    )
    // } else {
    //   res.json(
    //     new ResultModel({
    //       data: {},
    //       message: '编辑失败',
    //       code: -1
    //     })
    //   )
    // }

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

// 删除博客
router.post('/deleteArticle', (req, res, next) => {
  const result = deleteArticle(req.body)

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

// 已删除的博客
router.get('/getDeleteList', (req, res, next) => {
  let title = req.query.title || ''
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
    const result = getDeleteList(title, currentPage, pageSize)

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

router.post('/recoverArticle', (req, res, next) => {
  const result = recoverArticle(req.body)

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

// 修改博客
router.post('/editBlog', (req, res, next) => {
  // console.log(req.body)
  const result = editBlog(req.body)

  return result.then(listData => {
    console.log(listData)
    res.json(
      new ResultModel({
        data: listData,
        message: '修改成功',
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