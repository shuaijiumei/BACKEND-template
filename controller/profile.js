/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const { deleteVal } = require('../util/arrDelete')

exports.getUserInfo = async (req, res, next) => {
  try {
    const { follower } = req
    res.status(200).json({
      follower,
    })
  } catch (err) {
    next(err)
  }
}

exports.followUser = async (req, res, next) => {
  try {
    const { follower } = req
    const { user } = req
    follower.fans.push(user._id)
    user.stars.push(follower._id)

    await follower.populate('fans').execPopulate()
    await user.populate('starts').execPopulate()

    await follower.save()
    await user.save()

    res.status(201).json({
      msg: '关注成功',
    })
  } catch (err) {
    next(err)
  }
}

exports.unfollowUser = async (req, res, next) => {
  try {
    const { follower } = req
    const { user } = req
    follower.fans = deleteVal(follower.fans, user._id)
    user.stars = deleteVal(user.stars, follower._id)

    await follower.save()
    await user.save()

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
