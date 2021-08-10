/**
 * Author: TBY on 2021-08-10
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { Tag } = require('../model')

// 新建标签 验证 标签名是否为空，标签是否对当前用户已经存在
exports.createTag = [
  validate([
    body('tag.tagName').notEmpty().withMessage('标签名字不为空'),
  ]),
  // 校验标签是否已经存在 根据用户查询
  async (req, res, next) => {
    try {
    // 拿到用户id
      const id = req.user._id
      // 根据用户id在Tag表中查找
      const tagList = await Tag.find({ author: id })
      if (tagList.some((item) => item.tagName.toString() === req.body.tag.tagName.toString())) {
        return res.status(401).json({ error: '已经存在同名标签' })
      }
      next()
    } catch (e) {
      next(e)
    }
  },
]

// 更新标签
exports.updateTag = [
// id 是否有效
  validate([
    // 自定义验证方法
    validate.isValidObjectId(['params'], 'articleId'),
  ]),
  // 校验标签是否存在
  async (req, res, next) => {
    const { tagId } = req.params
    const userId = req.user._id
    const tagList = await Tag.find({ author: userId })
    if (tagList.some((item) => item._id.toString() === tagId.toString())) {
      const tag = await Tag.findById(tagId)
      req.tag = tag
      next()
    }
    return res.status(401).json({
      error: '标签id错误！请检查',
    })
  },
]

// 删除标签
exports.deleteTag = exports.updateTag
