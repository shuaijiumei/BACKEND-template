/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const express = require('express')
const profileControl = require('../controller/profile')
const auth = require('../middleware/auth')

const router = express.Router()

// 获取用户资料
router.get('/:username', auth, profileControl.getUserInfo)
// 关注用户
router.post('/:username/follow', profileControl.followUser)
// 取消关注用户
router.delete('/:username/follow', profileControl.unfollowUser)

module.exports = router
