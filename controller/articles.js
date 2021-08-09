/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const { Article, User } = require('../model')
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
      const user = User.findOne({ username: author })
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
    // 获取所有的数量
    const articlesCount = await Article.countDocuments()
    res.status(200).json({
      articles,
      articlesCount,
    })
    res.send('get /articles')
  } catch (e) {
    next(e)
  }
}
// 赞赏文章
exports.feedArticles = async (req, res, next) => {
  try {
    res.send('get /articles/feed')
  } catch (e) {
    next(e)
  }
}
// 获取指定文章 query articleId
exports.getOneArticles = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).populate('author')
    if (!article) {
      res.status(404).end()
    }
    res.status(200).json({
      article,
    })
    res.send(`get /articles/:${req.params.slug}`)
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

exports.addComments = async (req, res, next) => {
  try {
    res.send(`post /articles/:${req.params.slug}/comments`)
  } catch (e) {
    next(e)
  }
}

exports.getComments = async (req, res, next) => {
  try {
    res.send(`get /articles/:${req.params.slug}/comments`)
  } catch (e) {
    next(e)
  }
}

exports.deleteComments = async (req, res, next) => {
  try {
    res.send(`delete /articles/:${req.params.slug}/comments/:${req.params.id}`)
  } catch (e) {
    next(e)
  }
}

exports.favoriteArticles = async (req, res, next) => {
  try {
    res.send(`post /articles/:${req.params.slug}/favorite`)
  } catch (e) {
    next(e)
  }
}

exports.cancelFavoriteArticles = async (req, res, next) => {
  try {
    res.send(`delete /articles/:${req.params.slug}/favorite`)
  } catch (e) {
    next(e)
  }
}
