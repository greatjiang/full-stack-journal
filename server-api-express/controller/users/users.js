const { exec, escape } = require('../../db/mysql')

const getList = (name, currentPage, pageSize) => {
  let sql = `select id, username,created_at, updated_at from users where 1=1 `
  let totalSql = `select count(*) as total from users where 1=1 `

  // console.log(name)

  if (name) {
    sql += ` and username like '%${name}%'`
    totalSql += ` and username like '%${name}%'`
  }

  sql += ` LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`
  totalSql += ` LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`
  // return exec(sql)
  return exec(sql).then(listData => {
    return exec(totalSql).then(totalNum => {
      const total = JSON.parse(JSON.stringify(totalNum))[0].total

      return {
        list: JSON.parse(JSON.stringify(listData)),
        total
      }
    })
  })
}

const createUser = (userData = {}) => {
  // console.log(userData)
  const name = userData.name
  const password = '000000'
  const email = userData.email
  const phone = userData.phone
  const role = userData.role
  const status = userData.status

  const formatDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const created_at = formatDateTime
  const updated_at = formatDateTime

  const sql = `
    insert into users (name,password,email,phone,role,status,created_at,updated_at)
    values ('${name}','${password}','${email}','${phone}','${role}','${status}','${created_at}','${updated_at}')
  `

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

module.exports = {
  getList,
  createUser,
}