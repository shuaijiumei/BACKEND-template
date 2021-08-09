/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const express = require('express')
const tagControl = require('../controller/tag')

const router = express.Router()

router.get('/tags', tagControl.getTags)

module.exports = router
