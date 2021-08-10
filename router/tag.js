/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const express = require('express')
const tagControl = require('../controller/tag')
const tagValidator = require('../validator/tag')
const auth = require('../middleware/auth')

const router = express.Router()
// 获取标签 done 转移到获取当前用户信息中一并获取
// router.get('/tags', auth, tagControl.getTags)
// 新建标签 done
router.post('/', auth, tagValidator.createTag, tagControl.createTag)
// 更新标签
router.put('/:tagId', auth, tagValidator.updateTag, tagControl.updateTag)
// 删除标签
router.delete('/:tagId', auth, tagValidator.deleteTag, tagControl.deleteTag)
module.exports = router
