/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
exports.getUserInfo = async (req, res, next) => {
  try {
    res.send('get /profiles/:username')
  } catch (err) {
    next(err)
  }
}

exports.followUser = async (req, res, next) => {
  try {
    res.send('post /profiles/:username/follow')
  } catch (err) {
    next(err)
  }
}

exports.unfollowUser = async (req, res, next) => {
  try {
    res.send('delete /profiles/:username/follow')
  } catch (err) {
    next(err)
  }
}
