/**
 * Author: TBY on 2021-08-05
 * note 笔记
 * tips 特别注意
 * example 例子
 */
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router/index')
const errorHandler = require('./middleware/error-handler')
require('./model/index')

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 8088

// 挂载路由
app.use('/api', router)

// 统一处理服务端错误
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
