const express = require('express')
const router = express.Router()

const { login } = require('../../controller/admin/login')

const { ResultModel } = require('../../model/resultModel')

router.post('/login', (req, res, next) => {

  const { username, password } = req.body

  const result = login(username, password)

  return result.then(data => {
    // console.log(JSON.stringify(data))

    if (data.username) {
      req.session.username = username

      res.cookie('ADMINSYSTEM', req.sessionID)
      res.cookie('NICKNAME', data.nickname)

      res.json(new ResultModel({
        message: '登陆成功',
        code: 1
      }))

      return false
    }
    res.json(new ResultModel({
      message: '登陆失败',
      code: -97
    }))
  })
})

module.exports = router