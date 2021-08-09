/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const util = require('util')

module.exports = () => (err, req, res, next) => {
  res.status(500).json({
    error: util.format(err),
  })
}
