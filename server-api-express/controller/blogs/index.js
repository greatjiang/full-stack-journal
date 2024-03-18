const { exec, escape } = require('../../db/mysql')
const moment = require('moment')

const getList = (title, category, currentPage, pageSize) => {
  console.log(title, currentPage, pageSize)
  let sql = `select id, title,label_id,summary,category_id,likenum,status,visitnum,level,created_at, updated_at from article where 1=1 and status NOT IN (2) `
  let totalSql = `select count(*) as total from article where 1=1 and status NOT IN (2) `
  // console.log(name)

  if (category) {
    sql += ` and category_id=${category} `
    totalSql += ` and category_id=${category} `
  }

  if (title) {
    sql += ` and title like '%${title}%'`
    totalSql += ` and title like '%${title}%'`
  }

  sql += ` order by created_at desc LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`
  // totalSql += ` LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`
  // return exec(sql)
  return exec(sql).then(listData => {
    return exec(totalSql).then(totalNum => {
      console.log(totalNum)
      const total = JSON.parse(JSON.stringify(totalNum))[0].total

      return {
        list: JSON.parse(JSON.stringify(listData)),
        total
      }
    })
  })
}

const createBlog = (userData = {}) => {
  console.log(userData.level)
  const title = userData.title
  const summary = userData.summary
  const label = userData.label
  const level = Math.floor(userData.level) || 0
  const category = userData.category || 0

  // let formatDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  // console.log('formatDateTime' + formatDateTime)
  const created_at = formatDateTime
  const updated_at = formatDateTime

  const sql = `insert into article (title,summary,label_id,level,category_id,created_at,updated_at)
  values ('${title}','${summary}','${label}','${level}','${category}','${created_at}','${updated_at}')
  `

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  }).catch((error) => {
    console.log(error)
  })

}

// 修改文章
const editArticle = (article = {}) => {
  // console.log(article)
  const content = article.content
  const id = parseInt(article.id)

  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  const updated_at = formatDateTime

  const sql = `update article set content="${content}", updated_at="${updated_at}" where id=${id}`

  return exec(sql).then(insertData => {
    console.log('article' + JSON.stringify(insertData))
    return {
      id: insertData.insertId
    }
  }).catch(error => {
    console.log('error' + error)
  })
}

// 修改博客
const editBlog = (article = {}) => {
  // console.log(article)
  const title = article.title
  const summary = article.summary
  const labels = article.label
  const id = article.id
  const level = article.level || 0
  const category = article.category || 0

  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  const updated_at = formatDateTime

  const sql = `update article set title='${title}', summary='${summary}', label_id='${labels}',level='${level}',category_id=${category}, updated_at='${updated_at}' where id=${id}`

  return exec(sql).then(insertData => {
    console.log('article' + JSON.stringify(insertData))
    return {
      id: insertData.insertId
    }
  }).catch(error => {
    console.log('error' + error)
  })
}

const editStatus = (data) => {
  const status = data.status
  const id = parseInt(data.id)

  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  const updated_at = formatDateTime

  const sql = `update article set status='${status}', updated_at='${updated_at}' where id=${id}`

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  }).catch(error => {
    console.log('error' + error)
  })

}

const deleteArticle = (data) => {
  const id = parseInt(data.id)

  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  const updated_at = formatDateTime

  const sql = `update article set status=2, updated_at='${updated_at}' where id=${id}`

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  }).catch(error => {
    console.log('error' + error)
  })

}

const getArticle = (id) => {
  console.log(id)
  let sql = `select content from article where id=${id}`

  return exec(sql).then(content => {
    // console.log(JSON.parse(JSON.stringify(content))[0].content)
    return {
      content: JSON.parse(JSON.stringify(content))[0].content
    }
  })
}

// 已删除的博客
const getDeleteList = (title, currentPage, pageSize) => {
  let sql = `select id, title,summary,likenum,status,visitnum,created_at, updated_at from article where 1=1 and status IN (2) `
  let totalSql = `select count(*) as total from article where 1=1 and status IN (2) `

  // console.log(name)

  if (title) {
    sql += ` and title like '%${title}%'`
    totalSql += ` and title like '%${title}%'`
  }

  sql += ` LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`
  // totalSql += ` LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`
  // return exec(sql)
  return exec(sql).then(listData => {
    return exec(totalSql).then(totalNum => {
      console.log(totalNum)
      const total = JSON.parse(JSON.stringify(totalNum))[0].total

      return {
        list: JSON.parse(JSON.stringify(listData)),
        total
      }
    })
  })
}

// 恢复文章
const recoverArticle = (data) => {
  const id = parseInt(data.id)

  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  const updated_at = formatDateTime


  const sql = `update article set status=0, updated_at='${updated_at}' where id=${id}`

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  }).catch(error => {
    console.log('error' + error)
  })

}

module.exports = {
  getList,
  createBlog,
  editArticle,
  getArticle,
  editStatus,
  deleteArticle,
  getDeleteList,
  recoverArticle,
  editBlog
}