const { exec, escape } = require('../../db/mysql')
const moment = require('moment')

const getList = (name) => {
  let sql = `select id, name,cover,status,level,created_at, updated_at from categories where 1=1 and status NOT IN (2) `
  let totalSql = `select count(*) as total from categories where 1=1 NOT IN (2) `

  if (name) {
    sql += ` and name like '%${name}%'`
    totalSql += ` and name like '%${name}%'`
  }

  sql += ` order by level desc `
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

const createCategory = (userData = {}) => {
  console.log(userData)
  const name = userData.name
  const cover = userData.cover
  const level = userData.level || 0

  // console.log('formatDateTime' + formatDateTime)
  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')

  const created_at = formatDateTime
  const updated_at = formatDateTime



  const sql = `insert into categories (name,cover,level,created_at,updated_at)
  values ('${name}','${cover}',${level},'${created_at}','${updated_at}')
  `

  return exec(sql).then(insertData => {
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  }).catch(err => {
    console.log(err)
    throw '1062'
  })
}

const updateCategory = (userData = {}) => {
  console.log(userData)
  const name = userData.name
  const cover = userData.cover
  const level = Math.floor(userData.level) || 0
  const id = Math.floor(userData.id)

  // console.log('formatDateTime' + formatDateTime)
  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')

  const created_at = formatDateTime
  const updated_at = formatDateTime



  const sql = `update categories set name='${name}',cover='${cover}',level=${level}, updated_at='${updated_at}' where id=${id}`

  return exec(sql).then(insertData => {
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  }).catch(err => {
    console.log(err)
    throw '1062'
  })
}

const deleteCategory = (data) => {
  const id = parseInt(data.id)

  let formatDateTime = new Date()
  formatDateTime = moment(formatDateTime).format('YYYY/MM/DD HH:mm:ss')
  const updated_at = formatDateTime

  const sql = `update categories set status=2, updated_at='${updated_at}' where id=${id}`

  return exec(sql).then(insertData => {
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

  const sql = `update categories set status='${status}', updated_at='${updated_at}' where id=${id}`

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
  createCategory,
  deleteCategory,
  editStatus,
  updateCategory
}