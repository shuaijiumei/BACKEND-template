/**
 * Author: TBY on 2021-08-06
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')

module.exports = async (req, res, next) => {
  // 从请求头获取token
  let token = req.headers.authorization
  token = token ? token.split('Bearer ')[1] : null

  if (!token) {
    return res.status(401).end()
  }

  try {
    const decodedToken = await verify(token, jwtSecret)
    req.user = await User.findById(decodedToken.userId)
    next()
  } catch (e) {
    return res.status(401).end()
  }

  // 验证是否有效
  // 无效 -> 响应 401
  // 有效 -> 用户信息挂载到 req 请求对象上
}
