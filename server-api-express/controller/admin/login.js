const { exec, escape } = require('../../db/mysql')
// const bcrypt = require('bcryptjs')

const login = (username, password) => {
  // console.log(password)
  username = escape(username)
  password = escape(password)

  const sql = `select username,nickname from users where 1=1 and username=${username} and password=${password}`

  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}