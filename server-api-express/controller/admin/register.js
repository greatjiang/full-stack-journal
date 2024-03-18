const { exec, escape } = require('../../db/mysql')

const register = (username, password) => {
  const formatDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const created_at = formatDateTime
  const updated_at = formatDateTime

  const sql = `
    insert into users (username,password,created_at,updated_at)
    values ('${username}','${password}','${created_at}','${updated_at}')
  `

  return exec(sql)
    .then(insertData => {
      // console.log('insertData:' + insertData)

      return {
        id: insertData.insertId
      }
    }, err => {
      // console.log('err' + err)
      return {
        err
      }
    })
}

module.exports = {
  register
}