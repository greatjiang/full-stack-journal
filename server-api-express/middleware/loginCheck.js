const ResultModel = require('../model/resultModel')

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    res.json(
      new ResultModel({
        data: {},
        message: '未登录',
        code: -97
      })
    )
  }
}