/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const express = require('express')
const userValidator = require('../validator/user')

const userControl = require('../controller/user')
const auth = require('../middleware/auth')

const router = express.Router()

// 用户相关路由

// 用户登录
router.post('/users/login', userValidator.login, userControl.login)

// 用户注册
router.post('/users', userValidator.register, userControl.register) // 验证通过执行具体的控制器处理

// 获取当前登录用户
router.get('/user', auth, userControl.getCurrentUser)

// 更新用户
router.put('/user', auth, userControl.updateUser)

module.exports = router
