import express from 'express'
import cors from 'cors'
import bodyPaser from 'body-parser'

import userRouter from './router/user_router.js'
import videoinfoRouter from './router/video-router.js'
import loginRouter from './router/login-router.js'
import regUserRouter from './router/regUser-router.js'
import screenRouter from './router/screen-router.js'
import addimgRouter from './router/addimg-router.js'
import classRouter from './router/class-router.js'
import commentRouter from './router/comment-router.js'
import releaseRouter from './router/release-router.js'
import getUserinfoRouter from './router/getUserinfo-router.js'

const app = express()

// 配置cors 解决跨域问题
app.use(cors())

//配置解析表单数据的中间件
app.use(bodyPaser.json({ limit: '10mb' }))
app.use(bodyPaser.urlencoded())

app.use('/api', userRouter)

// 视频信息
app.use('/api', videoinfoRouter)

app.use('/api', loginRouter)

app.use('/api', regUserRouter)

app.use('/api', screenRouter)

app.use('/api', addimgRouter)

app.use('/api', classRouter)

app.use('/api', commentRouter)

app.use('/api', releaseRouter)

app.use('/api', getUserinfoRouter)

app.listen(8080, () => {
  console.log('serve running at http://127.0.0.1')
})
