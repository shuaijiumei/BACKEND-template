/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const express = require('express')

const router = express.Router()

// 用户相关路由
router.use(require('./user'))
// 用户资料相关路由
router.use('/profiles', require('./profile'))
// 文章相关路由
router.use('/articles', require('./article'))
// tag相关路由
router.use(require('./tag'))

module.exports = router
