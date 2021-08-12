/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const mdS = require('../util/mdS')

const { Schema } = mongoose

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (value) => mdS(value),
    select: false,
  },
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  fans: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: null,
  },
  stars: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: null,
  },
  favorite: {
    type: [Schema.Types.ObjectId],
    ref: 'Article',
    default: null,
  },
  ...baseModel,
})

module.exports = userSchema
