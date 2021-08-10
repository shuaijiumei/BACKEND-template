/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const express = require('express')
const articlesControl = require('../controller/articles')

const articleValidator = require('../validator/articles')
const auth = require('../middleware/auth')

const router = express.Router()

// 文章相关路由

// 获取文章 done
router.get('/', articlesControl.getArticles)

// 赞赏文章
router.get('/feed', articlesControl.feedArticles)

// 获取指定文章 done
router.get('/:articleId', articleValidator.getOneArticle, articlesControl.getOneArticles)

// 新建文章 done
router.post('/', auth, articleValidator.createArticles, articlesControl.addArticles)

// 更新文章 done
router.put('/:articleId', auth, articleValidator.updateArticle, articlesControl.updateArticles)

// 删除文章
router.delete('/:articleId', auth, articleValidator.deleteArticle, articlesControl.deleteArticles)

// 添加评论
router.post('/:articleId/comments', articlesControl.addComments)
// 获取评论
router.get('/:articleId/comments', articlesControl.getComments)
// 删除评论
router.delete('/:articleId/comments/:id', articlesControl.deleteComments)

// 收藏文章
router.post('/:articleId/favorite', articlesControl.favoriteArticles)

// 取消收藏
router.delete('/:articleId/favorite', articlesControl.cancelFavoriteArticles)

module.exports = router
