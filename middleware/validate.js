/**
 * Author: TBY on 2021-08-06
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const { validationResult, buildCheckFunction } = require('express-validator')
const { isValidObjectId } = require('mongoose')
// parallel processing
// eslint-disable-next-line no-multi-assign
exports = module.exports = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  res.status(400).json({ errors: errors.array() })
}

exports.isValidObjectId = (location, fields) =>
  buildCheckFunction(location)(fields).custom(async (value) => {
    if (!isValidObjectId(value)) {
      return Promise.reject('ID 无效！！！')
    }
  })
