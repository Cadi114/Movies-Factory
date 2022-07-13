import express from 'express'
import { getImg } from '../controller/getimg.js'
import { getVideo } from '../controller/getvideo.js'

const router = new express.Router()

router.get('/img/*', getImg)
router.get('/video/*', getVideo)

export default router
