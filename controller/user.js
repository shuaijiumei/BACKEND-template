/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { User, Tag } = require('../model')
const { jwtSecret } = require('../config/config.default')
const jwt = require('../util/jwt')

// 用户登录
exports.login = async (req, res, next) => {
  try {
    // 1. 数据验证
    // 2. 生成token
    const user = req.user.toJSON()
    // 删除返回对象中用户的密码
    delete user.password
    // 第三个参数设置过期时间
    const token = await jwt.sign({
      userId: user._id,
    }, jwtSecret, {
      expiresIn: '2 days', // 设置过期事件 单位 s
    })

    res.status(200).json({
      ...user,
      token,
    })
    // 3. 发送成功响应， 包含token数据
  } catch (err) {
    next(err)
  }
}
// 用户注册
exports.register = async (req, res, next) => {
  try {
    // 1. 获取请求体数据
    // 2. 数据验证
    // 2.1 基本数据验证（符合邮箱格式）
    // 2.2 业务数据验证（不重复）
    // 3. 验证通过则将数据保存到数据库
    let user = new User(req.body.user)
    // 保存到数据库
    await user.save()

    // 转换成普通的JSON对象，删除返回的password
    user = user.toJSON()
    delete user.password
    // 4. 发送成功响应
    res.status(201).json({
      user,
    })
  } catch (err) {
    next(err)
  }
}
// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    // 根据用户id获取用户创建的标签
    const id = req.user._id
    const tagList = await Tag.find({ author: id })
    res.status(200).json({
      user: {
        userInfo: req.user,
        tagList,
      },
    })
  } catch (err) {
    next(err)
  }
}

// 更新用户
exports.updateUser = async (req, res, next) => {
  try {
    const { user: bodyUser } = req.body
    const { user } = req
    user.bio = bodyUser.bio || user.bio
    user.image = bodyUser.image || user.image
    user.username = bodyUser.username || user.username

    if (bodyUser.email) {
      return res.status(403).end()
    }
    await user.save()
    res.status(201).json({
      user,
    })
  } catch (err) {
    next(err)
  }
}
