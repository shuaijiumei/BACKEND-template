/**
 * Author: TBY on 2021-08-06
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { Article } = require('../model')

exports.createArticles = validate([
  body('article.title').notEmpty().withMessage('文章标题不能为空'),
  body('article.description').notEmpty().withMessage('文章摘要不能为空'),
  body('article.body').notEmpty().withMessage('文章内容不能为空'),
])

exports.getOneArticle = validate([
  validate.isValidObjectId(['params'], 'articleId'),
])

exports.updateArticle = [
  // id 是否有效
  validate([
    // 自定义验证方法
    validate.isValidObjectId(['params'], 'articleId'),

  ]),
  // 校验文章是否存在
  async (req, res, next) => {
    const { articleId } = req.params
    const article = await Article.findById(articleId)
    if (!article) {
      return res.status(404).end()
    }
    req.article = article
    next()
  },
  // 修改文章的是否是作者
  async (req, res, next) => {
    // 数据库里拿出来的是一个 Object 对象，所以需要转成一种类型比较
    if (req.article.author.toString() !== req.user._id.toString()) {
      return res.status(403).end()
    }
    next()
  },
]

exports.deleteArticle = exports.updateArticle