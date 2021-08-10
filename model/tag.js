/**
 * Author: TBY on 2021-08-10
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const { Schema } = mongoose

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ...baseModel,
})

module.exports = tagSchema
