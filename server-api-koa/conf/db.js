// const mysql = require('mysql2/promise')

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'good-system',
//   waitForConnections: true, // 当连接池没有连接或超出最大限制时，设置为true且会把连接放入队列，设置为false时，会返回error
//   connectionLimit: 10, // 连接池的最大连接数
//   queueLimit: 0 // 没有限制
// })

const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF

// if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'good-system'
  }
// }

// if (env === 'production') {
//   MYSQL_CONF = {
//     host: 'rm-2zeu7058wjz3oo0u4.mysql.rds.aliyuncs.com',
//     user: 'greatjiang',
//     password: 'Sqljiang!@',
//     port: '3306',
//     database: 'good-system'
//   }
// }

module.exports = {
  MYSQL_CONF,
}