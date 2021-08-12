/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const express = require('express')
const profileControl = require('../controller/profile')
const auth = require('../middleware/auth')
const profileValidator = require('../validator/profile')

const router = express.Router()

// 获取用户资料 done
router.get('/:username', profileValidator.getUser, profileControl.getUserInfo)
// 关注用户 done
router.post('/:username/follow', auth, profileValidator.followUser, profileControl.followUser)
// 取消关注用户 done
router.delete('/:username/follow', auth, profileValidator.unFollowUser, profileControl.unfollowUser)

module.exports = router
