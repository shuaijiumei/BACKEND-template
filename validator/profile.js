/**
 * Author: TBY on 2021-08-12
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { User } = require('../model')
// 是否存在该用户
const checkUser = async (req, res, next) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username })
    if (user) {
      req.follower = user
      return next()
    }
    res.status(404).json({
      error: '未找到用户',
    })
  } catch (e) {
    next(e)
  }
}
// 是否关注该用户
const checkStar = async (req, res, next) => {
  const { follower } = req
  const { user } = req
  if (follower.fans.some((item) => item.toString() === user._id.toString())) {
    return next()
  }
  return res.status(400).json({
    error: '您没有关注该用户',
  })
}

// 获取用户信息 访问用户首页展示
exports.getUser = checkUser
// 关注用户
exports.followUser = [
  checkUser,
  // 是否已经关注过该用户
  async (req, res, next) => {
    try {
      const { follower } = req
      const { user } = req
      if (follower._id.toString() === user._id.toString()) {
        return res.status(400).json({
          error: '您不能关注自己',
        })
      }
      if (follower.fans.some((item) => item.toString() === user._id.toString())) {
        return res.status(400).json({
          error: '您已经关注过该用户',
        })
      }
      next()
    } catch (e) {
      next(e)
    }
  },
]
// 取消关注用户
exports.unFollowUser = [
  checkUser,
  checkStar,
]
