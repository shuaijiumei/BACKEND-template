/**
 * Author: TBY on 2021-08-06
 * note 笔记
 * tips 特别注意
 * example 例子
 */

const { body } = require('express-validator')
const { User } = require('../model')
const mdS = require('../util/mdS')
const validate = require('../middleware/validate')

// 注册
exports.register = validate([
  // 1. 配置验证规则
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async (username) => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject('用户名已存在')
      }
    }),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail() // 验证失败就over
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        return Promise.reject('邮箱已经存在')
      }
    }),
])

// 登录
// 配置多个validate
exports.login = [
  // 判断是否输入
  validate([
    body('user.email').notEmpty().withMessage('邮箱不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空'),
  ]),
  // 判断是否存在用户
  validate([
    body('user.email').custom(async (email, { req }) => {
      // 需要拿到的数据
      const user = await User.findOne({ email }).select(['password', 'username', 'bio', 'image', 'email'])
      if (!user) {
        return Promise.reject('用户不存在')
      }
      // 中间件共享一个 req 所以 如果查到了用户，就将用户保存在req对象里，便于校正密码
      req.user = user
    }),
  ]),
  // 判断密码是否正确
  validate([
    body('user.password').custom(async (password, { req }) => {
      if (mdS(password) !== req.user.password) {
        return Promise.reject('密码错误')
      }
    }),
  ]),
]
