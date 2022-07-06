import express from 'express'
import { getImg } from '../controller/getimg.js'

const router = new express.Router()

router.get('/img/*', getImg)

export default router
