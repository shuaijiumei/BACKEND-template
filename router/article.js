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

// 获取文章 done 有些问题，线上调试再处理
router.get('/', articlesControl.getArticles)

// 获取指定文章 done
router.get('/:articleId', articleValidator.getOneArticle, articlesControl.getOneArticles)

// 新建文章 done
router.post('/', auth, articleValidator.createArticles, articlesControl.addArticles)

// 更新文章 done
router.put('/:articleId', auth, articleValidator.updateArticle, articlesControl.updateArticles)

// 删除文章 done
router.delete('/:articleId', auth, articleValidator.deleteArticle, articlesControl.deleteArticles)

// 添加评论 done
router.post('/:articleId/comments', auth, articleValidator.addComments, articlesControl.addComments)
// 获取评论 done
router.get('/:articleId/comments', articleValidator.getComments, articlesControl.getComments)
// 删除评论 done
router.delete('/:articleId/comments/:id', auth, articleValidator.deleteComments, articlesControl.deleteComments)

// 点赞文章 done
router.post('/:articleId/favorite', articleValidator.favoriteArticle, articlesControl.favoriteArticles)

module.exports = router
