/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const mongoose = require('mongoose')
const { dbUrl } = require('../config/config.default')

// 链接 MongoDB
mongoose.connect(dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 当链接失败
db.on('error', console.error.bind(console, 'connection error:'))
// 链接成功
db.once('open', () => {
  console.log('MongoDB 链接成功！')
})

// 组织导出模型类
module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./articles')),
  Tag: mongoose.model('Tag', require('./tag')),
}
