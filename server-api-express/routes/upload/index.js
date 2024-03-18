const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { ResultModel } = require('../../model/resultModel')

// const uploadDir = path.join('/Users', 'greatjiang', 'Desktop', 'uploads')
let uploadDir = ''
const env = process.env.NODE_ENV
console.log('env:' + env)

if (env === 'dev') {
  uploadDir = '/Users/greatjiang/Desktop/uploads/images'
}

if (env === 'production') {
  uploadDir = '/usr/local/web/uploads/images'
}


// 设置文件存储路径和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// 创建multer对象，设置文件大小限制和存储路径
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 文件大小限制为5MB
  },
});

// 处理文件上传请求的路由
router.post('/upload', upload.single('file'), (req, res, next) => {
  // console.log(JSON.stringify(req.file.filename)); // 打印上传的文件信息
  res.json(
    new ResultModel({
      data: 'http://www.greatjiang.com/images/' + req.file.filename,
      message: '上传成功',
      code: 1
    })
  )
});

module.exports = router;
