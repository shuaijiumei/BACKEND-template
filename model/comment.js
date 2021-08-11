/**
 * Author: TBY on 2021-08-11
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const { Schema } = mongoose

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  ...baseModel,
})

module.exports = commentSchema
