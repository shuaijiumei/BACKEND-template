/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const {
  Article, User, Tag, Comment,
} = require('../model')

const { deleteVal } = require('../util/arrDelete')

// 获取文章 + 筛选文章 根据tag、作者、数量
exports.getArticles = async (req, res, next) => {
  try {
    const {
      limit = 20,
      offset = 0,
      tag,
      author,
    } = req.query
    const filter = {}

    if (tag) {
      filter.tagList = tag
    }
    if (author) {
      const user = await User.findOne({ username: author })
      filter.author = user ? user._id : null
    }
    // 给 find 方法传递筛选参数
    const articles = await Article.find(filter)
      .skip(Number.parseInt(offset, 10)) // 跳过多少条
      .limit(Number.parseInt(limit, 10)) // 取多少条
      .sort({
        // -1 倒序， 1 正序
        createdAt: -1,
      })

    // 实现级联查询 这里其实是一个异步操作，但是由于下一步的 await所以不需要 await
    articles.forEach((item) => {
      item.populate('tagList').execPopulate()
      item.populate('author').execPopulate()
    })

    // 获取所有的数量
    const articlesCount = await Article.countDocuments()
    res.status(200).json({
      articles,
      articlesCount,
    })
  } catch (e) {
    next(e)
  }
}
// 获取指定文章 query articleId
exports.getOneArticles = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).populate('author').populate('tagList')
    if (!article) {
      return res.status(404).end()
    }
    res.status(200).json({
      article,
    })
  } catch (e) {
    next(e)
  }
}
// 新建文章
exports.addArticles = async (req, res, next) => {
  try {
    const article = new Article(req.body.article)
    article.author = req.user._id
    // 根据id 映射到 User表 实现级联查询
    await article.populate('author').execPopulate()
    // 给文章打标签 支持多个标签
    if (req.body.article.tagList?.length) {
      const { tagList } = req.body.article
      article.tagList = []
      // eslint-disable-next-line no-restricted-syntax
      for (const item of tagList) {
        const tag = await Tag.findOne({ tagName: item })
        article.tagList.push(tag)
      }
      await article.populate('tagList').execPopulate()
    }

    await article.save()
    res.status(201).json({
      article,
    })
  } catch (e) {
    next(e)
  }
}
// 更新文章
exports.updateArticles = async (req, res, next) => {
  try {
    const { article } = req
    const bodyArticle = req.body.article
    article.title = bodyArticle.title || article.title
    article.description = bodyArticle.description || article.description
    article.body = bodyArticle.body || article.body
    article.tagList = bodyArticle.tagList || article.tagList
    await article.save()

    res.status(201).json({
      article,
    })
  } catch (e) {
    next(e)
  }
}
// 删除文章
exports.deleteArticles = async (req, res, next) => {
  try {
    const { article } = req
    await article.remove()
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
// 添加评论
exports.addComments = async (req, res, next) => {
  try {
    const comment = new Comment(req.body.comment)
    comment.author = req.user._id
    await comment.populate('author').execPopulate()
    comment.article = req.article._id

    await comment.save()
    res.status(201).json({
      comment,
    })
  } catch (e) {
    next(e)
  }
}
// 获得评论
exports.getComments = async (req, res, next) => {
  try {
    const id = req.article._id
    const comments = await Comment.find({ article: id }).populate('author')

    res.status(200).json({
      comments,
    })
  } catch (e) {
    next(e)
  }
}
// 删除评论
exports.deleteComments = async (req, res, next) => {
  try {
    const { comment } = req
    await comment.remove()
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
// 点赞文章
exports.likeArticles = async (req, res, next) => {
  try {
    const { article } = req
    // 点赞数 + 1 前端做防抖
    article.favoritesCount += 1

    await article.save()
    res.status(201).json({
      article,
    })
  } catch (e) {
    next(e)
  }
}
// 收藏文章
exports.favoriteArticles = async (req, res, next) => {
  try {
    const { user } = req
    const { article } = req
    user.favorite.push(article._id)

    await user.populate('article').execPopulate()

    await user.save()

    res.status(201).json({
      msg: '收藏成功！',
    })
  } catch (e) {
    next(e)
  }
}
// 取消收藏文章
exports.unFavoriteArticles = async (req, res, next) => {
  try {
    const { user } = req
    const { article } = req

    user.favorite = deleteVal(user.favorite, article._id)

    await user.save()

    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
