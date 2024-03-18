const express = require('express')
const router = express.Router()

const { getList, createUser, login } = require('../../controller/users/users')

const { ResultModel } = require('../../model/resultModel')

router.get('/list', (req, res, next) => {
  let name = req.query.name || ''
  let currentPage = req.query.currentPage || 1
  let pageSize = req.query.pageSize || 10

  // console.log(req.cookies)
  // console.log('req.session:' + JSON.stringify(req.session))

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
    const result = getList(name, currentPage, pageSize)

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

router.post('/create', (req, res, next) => {
  // console.log(req.body)
  const result = createUser(req.body)

  return result.then(listData => {
    res.json(
      new ResultModel(listData)
    )
  }).catch(err => {
    new ResultModel(err)
  })
})

module.exports = router