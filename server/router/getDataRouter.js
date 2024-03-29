import express from 'express'
import { getImg } from '../controller/getimg.js'
import { getVideo } from '../controller/getvideo.js'

const router = new express.Router()

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.get('/img/*', getImg)
router.get('/video/*', getVideo)

export default router
