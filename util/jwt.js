/**
 * Author: TBY on 2021-08-06
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.sign = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)

exports.decode = promisify(jwt.decode)

// 生成 jwt  jwt.sign(payload, sign)
// const token = jwt.sign()
// 异步生成
// jwt.sign({}, 'kajsdjsadwio', (err, token) => {
//
// })
