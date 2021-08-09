/**
 * Author: TBY on 2021-08-06
 * note 笔记
 * tips 特别注意
 * example 例子
 */
// 给密码加密
const crypto = require('crypto')

module.exports = (str) => crypto.createHash('md5')
  .update(`tby${str}`) // 加密政策
  .digest('hex')
