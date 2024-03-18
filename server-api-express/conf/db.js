const env = process.env.NODE_ENV

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
  MYSQL_CONF
}