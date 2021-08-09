/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const { Schema } = mongoose

const articleSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tagList: {
    type: [String],
    default: null,
  },
  favoritesCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = articleSchema
