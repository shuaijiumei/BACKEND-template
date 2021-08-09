/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

exports.getTags = async (req, res, next) => {
  try {
    res.send('get /tags')
  } catch (e) {
    next(e)
  }
}
