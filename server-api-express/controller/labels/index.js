const { exec, escape } = require('../../db/mysql')
const moment = require('moment')

const getList = (name) => {
  let sql = `select id, name,created_at, updated_at from labels where 1=1 and status NOT IN (2) `
  let totalSql = `select count(*) as total from labels where 1=1 NOT IN (2) `

  if (name) {
    sql += ` and name like '%${name}%'`
    totalSql += ` and name like '%${name}%'`
  }

  // sql += ` LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`
  return exec(sql).then(listData => {
    return exec(totalSql).then(totalNum => {
      // console.log(totalNum)
      const total = JSON.parse(JSON.stringify(totalNum))[0].total

      return {
        list: JSON.parse(JSON.stringify(listData)),
        total
      }
    })
  })
}

const createLabels = (userData = {}) => {
  // console.log(userData)
  const name = userData.name

  let formatDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  // console.log('formatDateTime' + formatDateTime)

  const created_at = formatDateTime
  const updated_at = formatDateTime

  const sql = `insert into labels (name,created_at,updated_at)
  values ('${name}','${created_at}','${updated_at}')
  `

  return exec(sql).then(insertData => {
    // console.log(insertData)
    return {
      id: insertData.insertId
    }
  }).catch(err => {
    // console.log(err.errno)
    throw '1062'
  })
}

const deleteLabels = (data) => {
  const id = parseInt(data.id)

  const formatDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const updated_at = formatDateTime

  const sql = `update labels set status=2, updated_at='${updated_at}' where id=${id}`

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
  createLabels,
  deleteLabels
}