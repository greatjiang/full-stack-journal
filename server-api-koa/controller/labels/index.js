const xss = require('xss')
const { exec } = require('../../db/mysql')

// 文章展示
// 分页
// 搜索
const getList = async () => {
  let sql = `select id,name from labels where 1=1 and status=0`

  const list = await exec(sql)
  // console.log(total)
  return {
    list,
  }
}

// 关于我的
module.exports = {
  getList
}