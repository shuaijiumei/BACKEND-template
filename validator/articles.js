/**
 * Author: TBY on 2021-08-06
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { Article, Comment } = require('../model')

// 校验文章是否存在
const articleExist = async (req, res, next) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) {
    return res.status(404).end()
  }
  req.article = article
  next()
}

// 新建文章
exports.createArticles = [
  validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.description').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空'),
  ]),
  // 需要验证该用户是否已经有过相同标题的文章
  async (req, res, next) => {
    try {
      const { title } = req.body.article
      const id = req.user._id
      const articles = await Article.find({ author: id })
      if (articles.some((item) => item.title.toString() === title.toString())) {
        return res.status(401).json({ error: '已经存在同名文章，请修改' })
      }
      next()
    } catch (e) {
      next(e)
    }
  },
]
// 获取指定文章
exports.getOneArticle = validate([
  validate.isValidObjectId(['params'], 'articleId'),
])
// 更新文章
exports.updateArticle = [
  // id 是否有效
  validate([
    // 自定义验证方法
    validate.isValidObjectId(['params'], 'articleId'),
  ]),
  // 校验文章是否存在
  articleExist,
  // 修改文章的是否是作者
  async (req, res, next) => {
    // 数据库里拿出来的是一个 Object 对象，所以需要转成一种类型比较
    if (req.article.author.toString() !== req.user._id.toString()) {
      return res.status(403).end()
    }
    next()
  },
]
// 删除文章
exports.deleteArticle = exports.updateArticle
// 点赞文章
exports.favoriteArticle = [
  // id 是否有效
  validate([
    // 自定义验证方法
    validate.isValidObjectId(['params'], 'articleId'),
  ]),
  // 校验文章是否存在
  articleExist,
]
// 添加评论
exports.addComments = [
  // id 是否有效
  validate([
    // 自定义验证方法
    validate.isValidObjectId(['params'], 'articleId'),
    body('comment.commentText').notEmpty().withMessage('评论内容不能为空'),
  ]),
  // 校验文章是否存在
  articleExist,
]

// 获取评论
exports.getComments = exports.favoriteArticle
// 删除评论
exports.deleteComments = [
  // id 是否有效
  validate([
    // 自定义验证方法
    validate.isValidObjectId(['params'], 'articleId'),
  ]),
  // 校验文章是否存在
  articleExist,
  // 检验评论是否存在 并且是否为本人或者作者修改
  async (req, res, next) => {
    try {
      const { id } = req.params
      const comment = await Comment.findById(id)
      if (comment) {
        if (comment.author.toString() !== req.user._id.toString()
            && req.user._id.toString() !== req.article.author.toString()) {
          return res.status(401).json({
            error: '无权限删除该评论',
          })
        }
        req.comment = comment
        next()
      } else {
        return res.status(404).json({
          error: '评论不存在',
        })
      }
    } catch (e) {
      next(e)
    }
  },
]
