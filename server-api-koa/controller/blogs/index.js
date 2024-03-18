const xss = require('xss')
const { exec } = require('../../db/mysql')

// 文章展示
// 分页
// 搜索
const getList = async (label, title, currentPage, pageSize) => {
  // console.log('title' + title)
  let sql = `select id,title,content,summary,visitnum,label_id,level,updated_at from article where 1=1 and status=1 and id NOT IN (8) `
  let totalSql = `select count(*) as total from article where 1=1 and status=1 and id NOT IN (8) `
  if (title) {
    sql += ` and title like '%${title}%' `
    totalSql += ` and title like '%${title}%' `
  }

  if (label) {
    sql += ` and label_id like '%${label}%' `
    totalSql += ` and label_id like '%${label}%' `
  }

  sql += ` order by level desc,created_at desc LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)} `
  // totalSql += ` LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`

  const list = await exec(sql)
  const total = await exec(totalSql)
  // console.log(total)
  return {
    list,
    total: total[0].total
  }
}

// 文章详情
const getDetail = async (id) => {
  let sql = `select id,title,label_id,content,visitnum,summary from article where 1=1 and status=1 and id=${id}`

  const detail = await exec(sql)

  const _visitnum = JSON.parse(JSON.stringify(detail))[0].visitnum + 1
  // visitnum+1
  // let sql2 = `UPDATE article SET level=${_visitnum} WHERE id=${id}`
  // await exec(sql2)
  await updateVisitNum(id, _visitnum)

  return {
    detail,
  }
}

// 文章详情
const updateVisitNum = async (id, _visitnum) => {
  _visitnum + 1
  // visitnum+1
  let sql2 = `UPDATE article SET visitnum=${_visitnum} WHERE id=${id}`
  await exec(sql2)
}
// 关于我的
module.exports = {
  getList,
  getDetail
}