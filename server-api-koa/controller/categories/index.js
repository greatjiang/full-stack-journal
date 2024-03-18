const xss = require('xss')
const { exec } = require('../../db/mysql')

// 文章展示
// 分页
// 搜索
const getList = async () => {
  let sql = `select id,cover,name from categories where 1=1 and status=1 order by level desc`

  const list = await exec(sql)
  return {
    list,
  }
}

const getCategoryBlog = async (id) => {
  console.log(id)
  let sql = `select id,title,visitnum,label_id,level,updated_at 
  from article where 1=1 and status=1 and id NOT IN (8) and category_id=${id}
  order by level desc`

  const list = await exec(sql)
  return {
    list,
  }
}

// 关于我的
module.exports = {
  getList,
  getCategoryBlog
}