/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { Article, User, Tag } = require('../model')

// 新建标签
exports.createTag = async (req, res, next) => {
  try {
    const tag = new Tag(req.body.tag)
    tag.author = req.user._id
    await tag.populate('author').execPopulate()
    await tag.save()
    res.status(201).json({
      tag,
    })
  } catch (e) {
    next(e)
  }
}

// 更新标签
exports.updateTag = async (req, res, next) => {
  try {
    const { tag } = req
    const bodyTag = req.body.tag
    tag.tagName = bodyTag.tagName || tag.tagName

    res.status(201).json({
      tag,
    })
  } catch (e) {
    next(e)
  }
}

// 删除标签
exports.deleteTag = async (req, res, next) => {
  try {
    const { tag } = req
    await tag.remove()
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
