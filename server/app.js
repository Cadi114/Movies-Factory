import express from 'express'
import cors from 'cors'
import bodyPaser from 'body-parser'

import loginRouter from './router/login-router.js'
import getDataRouter from './router/getDataRouter.js'
import postRouter from './router/postRouter.js'
import getRouter from './router/getRouter.js'

const app = express()

// 配置cors 解决跨域问题
app.use(cors())

//配置解析表单数据的中间件
app.use(bodyPaser.json({ limit: '10mb' }))
app.use(bodyPaser.urlencoded())

app.use('/api', loginRouter)
app.use('/api', getDataRouter)
app.use('/api', getRouter)
app.use('/api', postRouter)

app.listen(8080, () => {
  console.log('serve running at http://127.0.0.1')
})
