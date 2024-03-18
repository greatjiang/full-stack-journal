const express = require('express')
const router = express.Router()

const { register } = require('../../controller/admin/register')

const { ResultModel } = require('../../model/resultModel')

// router.post('/register', (req, res, next) => {
//   const { username, password } = req.body

//   const result = register(username, password)

//   return result.then(resData => {
//     if (resData.err) {
//       if (resData.err.code === 'ER_DUP_ENTRY') {
//         res.json(
//           new ResultModel(
//             {
//               message: '该用户已注册',
//               errno: -2,
//             }
//           )
//         )
//       } else {
//         res.json(
//           new ResultModel(
//             {
//               message: resData.err,
//               errno: -3,
//             }
//           )
//         )
//       }
//       return
//     }

//     res.json(
//       new SuccessModel(resData)
//     )
//   }).catch(err => {
//     new ResultModel(err)
//   })
// })

module.exports = router